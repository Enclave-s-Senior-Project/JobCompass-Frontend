'use client';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragEndEvent,
    type DragOverEvent,
    type UniqueIdentifier,
    TouchSensor,
    MouseSensor,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ColumnComponent from './column';
import ApplicationCard from './application-card';
import { ShorthandApplication } from '@/types';
import { ApplyJobStatus } from '@/lib/common-enum';
// Types
export type Education = 'Master Degree' | 'Bachelor Degree' | 'Intermediate Degree' | 'High School Degree';

export interface ColumnType {
    id: UniqueIdentifier;
    title: ApplyJobStatus;
    count: number;
    applicants: ShorthandApplication[];
}

interface KanbanBoardProps {
    columns: ColumnType[];
    setColumns: Dispatch<SetStateAction<ColumnType[]>>;
}

export const KanbanBoard = memo(({ columns, setColumns }: KanbanBoardProps) => {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [, setActiveColumn] = useState<ColumnType | null>(null);
    const [activeApplicant, setActiveApplicant] = useState<ShorthandApplication | null>(null);

    // Configure sensors for drag detection
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // Press delay of 250ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Find the active item (column or applicant)
    const findActiveItem = (id: UniqueIdentifier) => {
        // Check if it's a column
        const column = columns.find((col) => col.id === id);
        if (column) {
            setActiveColumn(column);
            return;
        }

        // Check if it's an applicant
        for (const column of columns) {
            const applicant = column.applicants.find((app) => app.appliedJobId === id);
            if (applicant) {
                setActiveApplicant(applicant);
                return;
            }
        }
    };

    // Find the column containing an applicant
    const findColumnForApplicant = (id: UniqueIdentifier) => {
        return columns.find((column) => column.applicants.some((applicant) => applicant.appliedJobId === id));
    };

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
        findActiveItem(active.id);
    };

    // Handle drag over
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeColumnId = findColumnForApplicant(active.id)?.id;

        // If we're not dragging an applicant or there's no over element, return
        if (!activeColumnId) return;

        const overColumnId = over.data?.current?.type === 'column' ? over.id : findColumnForApplicant(over.id)?.id;

        // If not dragging over a column or dragging within the same column, return
        if (!overColumnId || activeColumnId === overColumnId) return;

        setColumns((prevColumns) => {
            // Find the source and destination columns
            const activeColumn = prevColumns.find((col) => col.id === activeColumnId);
            const overColumn = prevColumns.find((col) => col.id === overColumnId);

            if (!activeColumn || !overColumn) return prevColumns;

            // Find the applicant
            const applicantIndex = activeColumn.applicants.findIndex((app) => app.appliedJobId === active.id);
            if (applicantIndex < 0) return prevColumns;

            // Create new columns array with the applicant moved
            return prevColumns.map((col) => {
                // Remove from source column
                if (col.id === activeColumnId) {
                    return {
                        ...col,
                        applicants: col.applicants.filter((app) => app.appliedJobId !== active.id),
                        count: col.count - 1,
                    };
                }

                // Add to destination column
                if (col.id === overColumnId) {
                    return {
                        ...col,
                        applicants: [
                            ...col.applicants,
                            { ...activeColumn.applicants[applicantIndex], status: col.title },
                        ],
                        count: col.count + 1,
                    };
                }

                return col;
            });
        });
    };

    // Handle drag end
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);
        setActiveColumn(null);
        setActiveApplicant(null);

        if (!over) return;

        // If the item was dropped in a different position
        if (active.id !== over.id) {
            const activeColumnId = findColumnForApplicant(active.id)?.id;
            const overColumnId = findColumnForApplicant(over.id)?.id;

            // If both items are in the same column, reorder the items
            if (activeColumnId && overColumnId && activeColumnId === overColumnId) {
                setColumns((prevColumns) => {
                    const columnIndex = prevColumns.findIndex((col) => col.id === activeColumnId);

                    const activeIndex = prevColumns[columnIndex].applicants.findIndex(
                        (app) => app.appliedJobId === active.id
                    );
                    const overIndex = prevColumns[columnIndex].applicants.findIndex(
                        (app) => app.appliedJobId === over.id
                    );

                    // Create a new column with reordered applicants
                    const newColumn = {
                        ...prevColumns[columnIndex],
                        applicants: arrayMove(prevColumns[columnIndex].applicants, activeIndex, overIndex),
                    };

                    // Return the updated columns
                    return prevColumns.map((col, index) => (index === columnIndex ? newColumn : col));
                });
            }
        }
    };

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex max-h-[calc(100vh-200px)] min-h-[60vh] justify-between gap-2 overflow-x-auto pb-4">
                {Array.isArray(columns) && columns.length > 0 ? (
                    columns.map((column) => (
                        <ColumnComponent
                            key={column.id.toString()}
                            column={column}
                            isCreateColumn={column.id === 'create'}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No applications available.</p>
                )}
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeId && activeApplicant ? <ApplicationCard applicant={activeApplicant} /> : null}
            </DragOverlay>
        </DndContext>
    );
});

KanbanBoard.displayName = 'KanbanBoard';
