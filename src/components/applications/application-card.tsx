'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Applicant } from './kanban-board';
import { Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toFormattedDate } from '@/lib/utils';

interface ApplicationCardProps {
    applicant: Applicant;
}

export default function ApplicationCard({ applicant }: ApplicationCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: applicant.id,
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
            className="bg-card border rounded-lg p-4 cursor-grab active:cursor-grabbing touch-manipulation"
        >
            <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={applicant.avatar} alt={applicant.name} />
                    <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-medium">{applicant.name}</h4>
                    <p className="text-sm text-muted-foreground">{applicant.position}</p>
                </div>
            </div>

            <ul className="space-y-1 text-sm mb-3">
                <li className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>
                        {' '}
                        Gender:{' '}
                        {applicant.gender === 'MALE'
                            ? 'Male'
                            : applicant.gender === 'FEMALE'
                              ? 'Female'
                              : applicant.gender}
                    </span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Nationality: {applicant.nationality} </span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Applied: {toFormattedDate(applicant.applied)}</span>
                </li>
            </ul>

            <button className="flex items-center gap-2 text-sm text-primary" onClick={(e) => e.stopPropagation()}>
                <Download className="h-4 w-4" />
                <span>Download CV</span>
            </button>
        </div>
    );
}
