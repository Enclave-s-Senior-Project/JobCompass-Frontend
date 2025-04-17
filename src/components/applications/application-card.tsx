'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { downloadFileViaURL, toFormattedDate } from '@/lib/utils';
import { ShorthandApplication } from '@/types';

interface ApplicationCardProps {
    applicant: ShorthandApplication;
}

export default function ApplicationCard({ applicant }: ApplicationCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: applicant.appliedJobId,
        data: {
            type: 'applicant',
            applicant,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-card border rounded-sm p-4 cursor-grab active:cursor-grabbing touch-manipulation"
        >
            <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={applicant?.profile?.profileUrl}
                        alt={applicant?.profile?.fullName}
                        className="object-cover object-center"
                        height={50}
                        width={50}
                    />
                    <AvatarFallback>{applicant?.profile?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-medium">{applicant?.profile?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">{applicant?.job?.type}</p>
                </div>
            </div>

            <ul className="space-y-1 text-sm mb-3">
                <li className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>
                        Gender:&nbsp;
                        {applicant?.profile?.gender === 'MALE'
                            ? 'Male'
                            : applicant?.profile?.gender === 'FEMALE'
                              ? 'Female'
                              : applicant?.profile?.gender}
                    </span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Nationality: {applicant?.profile?.nationality} </span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Applied: {toFormattedDate(applicant?.createdAt)}</span>
                </li>
            </ul>

            <button
                className="flex items-center gap-2 text-sm text-primary"
                onClick={() => downloadFileViaURL(applicant.cv.cvUrl)}
            >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
            </button>
        </div>
    );
}
