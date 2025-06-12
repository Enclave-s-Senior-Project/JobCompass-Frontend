import { Resume } from '@/types';
import { Download, Ellipsis, FileText, PencilLine, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import clsx from 'clsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import dynamic from 'next/dynamic';
import { Suspense, useContext, useState } from 'react';
import { downloadFileViaURL } from '@/lib/utils';
import { ResumePartContext } from './resume-part';
import { FormUploadResume } from './form-upload-resume';
const PDFPreview = dynamic(() => import('@/components/custom-ui/pdf-preview'), {
    ssr: false,
    loading: () => <span className="text-center">Loading...</span>,
});

export function CardResume({ resume }: { resume: Resume }) {
    const isPublished = resume.isPublished ? 'Publish' : 'Private';

    const { isLoading, deleteMutation, refetch } = useContext(ResumePartContext);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showPDFPreviewDialog, setShowPDFPreviewDialog] = useState(false);
    const [showDropdownDialog, setShowDropdownDialog] = useState(false);

    const handleDeleteResume = (event: any) => {
        event.stopPropagation();
        deleteMutation?.mutate(resume.cvId);
    };

    const handleDownloadFile = (event: any) => {
        event.stopPropagation();
        downloadFileViaURL(resume.cvUrl);
    };

    return (
        <>
            <div
                className="flex w-full items-center justify-center gap-3 rounded-md bg-gray-50 p-5"
                onClick={() => {
                    setShowPDFPreviewDialog(true);
                }}
            >
                <FileText className="size-8 text-primary-500" />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 hover:underline">{resume.cvName}</p>
                    <p className="text-sm font-normal text-gray-600">
                        {resume.size.toFixed(1)}&nbsp;MB -{' '}
                        <i className={clsx(resume.isPublished ? 'text-primary-400' : 'text-danger-400')}>
                            {isPublished}
                        </i>
                    </p>
                </div>
                <DropdownMenu open={showDropdownDialog} onOpenChange={setShowDropdownDialog}>
                    <DropdownMenuTrigger className="ml-auto">
                        <div className="flex items-center justify-center p-2">
                            <Ellipsis />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="px-0 py-3">
                        <DropdownMenuItem disabled={isLoading} className="p-0" onClick={handleDownloadFile}>
                            <div className="flex w-full items-center px-4 py-2 text-primary hover:bg-primary-50 hover:text-primary-600">
                                <Download className="mr-2 size-5" /> Download
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={isLoading}
                            className="p-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowEditDialog(true);
                                setShowDropdownDialog(false);
                            }}
                        >
                            <div className="flex w-full items-center px-4 py-2 text-primary hover:bg-primary-50 hover:text-primary-600">
                                <PencilLine className="mr-2 size-5" /> Edit Resume
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={isLoading} className="p-0" onClick={handleDeleteResume}>
                            <div className="flex w-full items-center px-4 py-2 text-danger hover:bg-danger-50 hover:text-danger-600">
                                <Trash2 className="mr-2 size-5" /> Delete
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Dialog open={showPDFPreviewDialog} onOpenChange={setShowPDFPreviewDialog}>
                <DialogContent className="flex h-dvh w-full max-w-2xl flex-col p-2">
                    <DialogHeader>
                        <DialogTitle>CV/Resume Preview</DialogTitle>
                    </DialogHeader>
                    <Suspense fallback={<span>Loading...</span>}>
                        <PDFPreview linkUrl={resume?.cvUrl} />
                    </Suspense>
                </DialogContent>
            </Dialog>
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>CV/Resume Edit</DialogTitle>
                    </DialogHeader>
                    <FormUploadResume
                        isEditing={true}
                        initValue={{
                            cvName: resume.cvName,
                            isPublished: resume.isPublished,
                            cvFile: null as File | null,
                            cvId: resume.cvId,
                        }}
                        onClose={() => {
                            setShowEditDialog(false);
                        }}
                        refetchResume={refetch}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
