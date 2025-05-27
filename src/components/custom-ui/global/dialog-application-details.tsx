'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { RichTextContent } from './rich-text-content';
import { cn, downloadFileViaURL, handleErrorToast, toFormattedDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DownloadIcon, Link as LinkIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { ApplyJobService } from '@/services';
import { LoadingOnlyIcon } from '../loading';
import { capitalize } from 'lodash';
import Link from 'next/link';

type DialogApplicationDetailsProps = {
    nodeTrigger: React.ReactNode;
    applicationId?: string;
    role: 'candidate' | 'enterprise';
};

export function DialogApplicationDetails({
    nodeTrigger,
    applicationId,
    role = 'candidate',
}: DialogApplicationDetailsProps) {
    const [open, setOpen] = useState(false);

    const { data: applicationDetails, isPending } = useQuery({
        queryKey: [queryKey.applicationDetails, applicationId],
        queryFn: async ({ queryKey }) => {
            if (!queryKey[1]) return null;
            try {
                return await ApplyJobService.getApplicationDetails({ applicationId: queryKey[1], role: role });
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: !!applicationId && open,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={cn(!applicationId ? 'pointer-events-none opacity-50' : '')}>
                {nodeTrigger}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Application Details - {applicationDetails?.profile.fullName || 'Applicant'}
                        <Link
                            href={`/find-candidates/candidate-profile/${applicationDetails?.profile.profileId}`}
                            target="_blank"
                            className="text-primary-500 hover:text-primary-700 hover:underline"
                        >
                            <LinkIcon className="size-4" />
                        </Link>
                    </DialogTitle>
                    <DialogDescription>Here you can view and manage the details of your application.</DialogDescription>
                </DialogHeader>

                <div className="min-h-96">
                    {isPending ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <LoadingOnlyIcon />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-sm">
                                <div className="flex items-start justify-between gap-2">
                                    <Avatar className="size-16">
                                        <AvatarImage
                                            className="size-16"
                                            src={applicationDetails?.profile?.profileUrl}
                                        />
                                        <AvatarFallback>{applicationDetails?.profile?.fullName}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link
                                            href={`/find-candidates/candidate-profile/${applicationDetails?.profile.profileId}`}
                                            target="_blank"
                                            className="text-primary-500 hover:text-primary-700 hover:underline"
                                        >
                                            <div className="flex items-center gap-2">
                                                <strong>{applicationDetails?.profile?.fullName}</strong>
                                                <LinkIcon className="size-3" />
                                            </div>
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                            Gender: {capitalize(applicationDetails?.profile?.gender)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Applied Date:&nbsp;
                                            {toFormattedDate(applicationDetails?.createdAt || new Date(Date.now()))}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Industry: {capitalize(applicationDetails?.profile?.industry?.categoryName)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Major: {capitalize(applicationDetails?.profile?.majority?.categoryName)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Nationality: {capitalize(applicationDetails?.profile?.nationality)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                Personal Resume:&nbsp;
                                <button
                                    onClick={() => downloadFileViaURL(applicationDetails?.cv?.cvUrl || '')}
                                    className="font-semibold text-primary-500 hover:text-primary-700 hover:underline"
                                >
                                    {applicationDetails?.cv?.cvName} - {applicationDetails?.cv?.size.toFixed(2)}MB
                                </button>
                                &nbsp;&nbsp;
                                <button>
                                    <DownloadIcon
                                        className="size-5 text-primary-500 hover:text-primary-700"
                                        onClick={() => downloadFileViaURL(applicationDetails?.cv?.cvUrl || '')}
                                    />
                                </button>
                            </div>

                            <div>
                                <p className="font-semibold">Cover Letter</p>
                                <hr />
                                <RichTextContent
                                    className="max-h-96 overflow-y-auto pt-2 text-sm"
                                    content={applicationDetails?.coverLetter || ''}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
