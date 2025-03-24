import { Resume } from '@/types';
import { Ellipsis, FileText, PencilLine, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import clsx from 'clsx';

export function CardResume({ resume }: { resume: Resume }) {
    const isPublished = resume.isPublished ? 'Publish' : 'Private';
    return (
        <div className="p-5 w-full flex items-center gap-3 justify-center bg-gray-50 rounded-md">
            <FileText className="size-8 text-primary-500" />
            <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">{resume.cvName}</p>
                <p className="text-sm font-normal text-gray-600">
                    {resume.size}&nbsp;MB -{' '}
                    <i className={clsx(resume.isPublished ? 'text-primary-400' : 'text-danger-400')}>{isPublished}</i>
                </p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto">
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="px-0 py-3">
                    <DropdownMenuItem className="p-0">
                        <div className="py-2 px-4 flex items-center w-full text-primary hover:text-primary-600 hover:bg-primary-50">
                            <PencilLine className="size-5 mr-2" /> Edit Resume
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                        <div className="py-2 px-4 flex items-center w-full text-danger hover:text-danger-600 hover:bg-danger-50">
                            <Trash2 className="size-5 mr-2" /> Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
