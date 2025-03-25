'use client';

import { CirclePlus } from 'lucide-react';
import { CardResume } from './card-resume';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FormUploadResume } from './form-upload-resume';
import { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { CVService } from '@/services/cv.service';

export const ResumePartContext = createContext<{ refetch: () => any; isLoading: boolean }>({
    refetch: () => {},
    isLoading: false,
});

export function ResumePart() {
    const [showDialog, setShowDialog] = useState(false);

    const {
        data: resumes = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: [queryKey.ownResumes],
        queryFn: async () => {
            try {
                return await CVService.getOwnCV();
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: true,
    });

    return (
        <ResumePartContext.Provider value={{ refetch, isLoading }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                        <div className="col-span-1 cursor-pointer">
                            <div className="py-5 pl-5 pr-2 w-full flex items-center gap-3 justify-center bg-white border-2 border-input border-dashed rounded-md hover:bg-gray-50 hover:border-transparent transition-all">
                                <CirclePlus className="size-8 text-primary-500" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-gray-900">Add CV/Resume</p>
                                    <p className="text-sm text-gray-600">Browser file (pdf)</p>
                                </div>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="font-normal">Add CV/Resume</DialogTitle>
                        </DialogHeader>
                        <FormUploadResume onClose={() => setShowDialog(false)} refetchResume={refetch} />
                    </DialogContent>
                </Dialog>

                {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-[90px] w-full" />)
                    : resumes?.map((resume) => (
                          <div className="col-span-1" key={resume.cvId}>
                              <CardResume resume={resume} />
                          </div>
                      ))}
            </div>
        </ResumePartContext.Provider>
    );
}
