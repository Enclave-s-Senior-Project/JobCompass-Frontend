import { Resume } from '@/types';
import { Ellipsis, FileText, PencilLine, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import clsx from 'clsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import dynamic from 'next/dynamic';
import { Suspense, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CVService } from '@/services/cv.service';
import { toast } from 'sonner';
import { handleErrorToast } from '@/lib/utils';
import { ResumePartContext } from './resume-part';
const PDFPreview = dynamic(() => import('@/components/custom-ui/pdf-preview'), {
    ssr: false,
    loading: () => <span className="text-center">Loading...</span>,
});

export function CardResume({ resume }: { resume: Resume }) {
    const isPublished = resume.isPublished ? 'Publish' : 'Private';

    const { isLoading, refetch } = useContext(ResumePartContext);

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const toastId = toast.loading('Deleting your resume...');
            const data = await CVService.deleteCV({ cvId: resume.cvId });
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
            handleErrorToast(error);
        },
    });

    const handleDeleteResume = (event: any) => {
        event.stopPropagation();

        deleteMutation.mutate();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-5 w-full flex items-center gap-3 justify-center bg-gray-50 rounded-md">
                    <FileText className="size-8 text-primary-500" />
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">{resume.cvName}</p>
                        <p className="text-sm font-normal text-gray-600">
                            {resume.size.toFixed(1)}&nbsp;MB -{' '}
                            <i className={clsx(resume.isPublished ? 'text-primary-400' : 'text-danger-400')}>
                                {isPublished}
                            </i>
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-auto">
                            <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="px-0 py-3">
                            <DropdownMenuItem
                                disabled={isLoading}
                                className="p-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('RUN EDIT');
                                }}
                            >
                                <div className="py-2 px-4 flex items-center w-full text-primary hover:text-primary-600 hover:bg-primary-50">
                                    <PencilLine className="size-5 mr-2" /> Edit Resume
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={isLoading} className="p-0" onClick={handleDeleteResume}>
                                <div className="py-2 px-4 flex items-center w-full text-danger hover:text-danger-600 hover:bg-danger-50">
                                    <Trash2 className="size-5 mr-2" /> Delete
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </DialogTrigger>
            <DialogContent className="h-dvh w-full flex flex-col">
                <DialogHeader>
                    <DialogTitle>CV/Resume Preview</DialogTitle>
                </DialogHeader>
                <Suspense fallback={<span>Loading...</span>}>
                    <PDFPreview linkUrl={resume?.cvUrl} />
                </Suspense>
            </DialogContent>
        </Dialog>
    );
}
