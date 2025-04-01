'use client';

import { CirclePlus } from 'lucide-react';
import { CardResume } from './card-resume';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FormUploadResume } from './form-upload-resume';
import { createContext, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { CVService } from '@/services/cv.service';
import { toast } from '@/lib/toast';

type ResumeContextType = {
    refetch: () => any;
    isLoading: boolean;
    deleteMutation: any;
};

export const ResumePartContext = createContext<ResumeContextType>({
    refetch: () => {},
    isLoading: false,
    deleteMutation: () => new Promise(() => {}),
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

    const deleteMutation = useMutation({
        mutationFn: async (cvId: string) => {
            const toastId = toast.loading('Deleting your resume...');
            const data = await CVService.deleteCV({ cvId });
            return { toastId, data };
        },
        onSuccess: ({ data, toastId }) => {
            toast.dismiss(toastId);
            if (data?.affected && data.affected > 0) {
                toast.success('Your resume has been deleted');
            } else {
                toast.error('Failed to delete your resume');
            }
            refetch();
        },
        onError: (error) => {
            toast.dismiss();
            handleErrorToast(error);
        },
    });

    return (
        <ResumePartContext.Provider value={{ refetch, isLoading, deleteMutation }}>
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
                        <FormUploadResume
                            isEditing={false}
                            initValue={null}
                            onClose={() => setShowDialog(false)}
                            refetchResume={refetch}
                        />
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
