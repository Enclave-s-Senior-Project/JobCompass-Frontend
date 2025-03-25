import { Resume } from '@/types';
import { Download, Ellipsis, FileText, PencilLine, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import clsx from 'clsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import dynamic from 'next/dynamic';
import { Suspense, useContext } from 'react';
import { downloadFileViaURL } from '@/lib/utils';
import { ResumePartContext } from './resume-part';
const PDFPreview = dynamic(() => import('@/components/custom-ui/pdf-preview'), {
    ssr: false,
    loading: () => <span className="text-center">Loading...</span>,
});

export function CardResume({ resume }: { resume: Resume }) {
    const isPublished = resume.isPublished ? 'Publish' : 'Private';

    const { isLoading, deleteMutation } = useContext(ResumePartContext);

    const handleDeleteResume = (event: any) => {
        event.stopPropagation();
        deleteMutation?.mutate(resume.cvId);
    };

    const handleDownloadFile = (event: any) => {
        event.stopPropagation();
        downloadFileViaURL(resume.cvUrl);
    };

    const handleUpdateResume = (event: any) => {
        event.stopPropagation();
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
                            <div className="p-2 flex items-center justify-center">
                                <Ellipsis />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="px-0 py-3">
                            <DropdownMenuItem disabled={isLoading} className="p-0" onClick={handleDownloadFile}>
                                <div className="py-2 px-4 flex items-center w-full text-primary hover:text-primary-600 hover:bg-primary-50">
                                    <Download className="size-5 mr-2" /> Download
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={isLoading} className="p-0" onClick={handleUpdateResume}>
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
