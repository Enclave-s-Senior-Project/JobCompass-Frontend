'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Column as ColumnType } from './kanban-board';
import ApplicationCard from './application-card';
import { Grid2X2, MoreHorizontal, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ShorthandApplication } from '@/types';

interface ColumnProps {
    column: ColumnType;
    isCreateColumn?: boolean;
}

export default function Column({ column, isCreateColumn = false }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
        data: {
            type: 'column',
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-40 w-full max-w-xs flex-shrink-0 rounded-md border bg-background ${
                isOver ? 'border-2 border-primary' : 'border-border'
            }`}
        >
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">{column.title}</h3>
                    <span className="text-muted-foreground">({column.count})</span>
                </div>
                {!isCreateColumn && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-md p-1 hover:bg-muted">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                                <Grid2X2 className="h-4 w-4" />
                                Edit Column
                            </DropdownMenuItem>
                            <Separator className="my-1" />
                            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            <SortableContext
                items={column.applicants.map((app: ShorthandApplication) => app.appliedJobId)}
                strategy={verticalListSortingStrategy}
            >
                <div className="min-h-[100px] space-y-3 p-2">
                    {column.applicants.map((applicant: ShorthandApplication) => (
                        <ApplicationCard key={applicant.appliedJobId.toString()} applicant={applicant} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
