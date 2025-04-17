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
            className={`flex-shrink-0 w-full min-h-40 max-w-xs bg-background rounded-md border ${
                isOver ? 'border-primary border-2' : 'border-border'
            }`}
        >
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">{column.title}</h3>
                    <span className="text-muted-foreground">({column.count})</span>
                </div>
                {!isCreateColumn && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-muted rounded-md">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Grid2X2 className="h-4 w-4" />
                                Edit Column
                            </DropdownMenuItem>
                            <Separator className="my-1" />
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
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
                <div className="space-y-3 p-2 min-h-[100px]">
                    {column.applicants.map((applicant: ShorthandApplication) => (
                        <ApplicationCard key={applicant.appliedJobId.toString()} applicant={applicant} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
