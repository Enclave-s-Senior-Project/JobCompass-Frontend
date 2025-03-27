import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import defaultResumeImage from '@/assets/images/avatar/default-resume-image.jpg';
import { Resume } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { downloadFileViaURL } from '@/lib/utils';

type Props = {
    resumes: Resume[];
    isPending?: boolean;
};

export function DownloadResume({ resumes = [], isPending = false }: Props) {
    return (
        <div className="p-6 rounded-md border-2 border-primary-50 space-y-4">
            <p className="text-base font-medium">Download Resume</p>
            {isPending ? (
                <div className="flex items-center gap-2">
                    <Skeleton className="w-1/4 h-14 rounded-sm" />
                    <Skeleton className="w-1/4 h-14 rounded-sm" />
                    <Skeleton className="w-2/4 h-14 rounded-sm" />
                </div>
            ) : resumes.length > 0 ? (
                resumes.map((resume) => (
                    <div key={resume?.cvId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image src={defaultResumeImage} alt="" />
                            <div className="space-y-1">
                                <p className="text-[12px] text-gray-600">{resume?.cvName}</p>
                                <p className="text-sm font-medium uppercase">PDF</p>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="[&_svg]:size-6"
                            onClick={() => {
                                downloadFileViaURL(resume?.cvUrl);
                            }}
                        >
                            <Download /> <span className="sm:hidden block lg:block">Download</span>
                        </Button>
                    </div>
                ))
            ) : (
                <span className="text-sm text-gray-500 italic">No public resume</span>
            )}
        </div>
    );
}
