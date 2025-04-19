'use client';
import { useEffect, useState } from 'react';
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
import { queryKey } from '@/lib/react-query/keys';
import { useSearchParams } from 'next/navigation';
import { AppliedJob, DetailedRequest, ShorthandApplication } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { handleErrorToast } from '@/lib/utils';
import { ApplyJobService } from '@/services';
import { useDebounce } from '@/hooks/useDebounce';
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
    jobId: string | string[] | undefined;
}

export default function KanbanBoard({ jobId }: KanbanBoardProps) {
    const ITEM_PER_PAGE = 5;
    const search = useSearchParams();

    const page = Number(search.get('page') || 1);
    const order = (search.get('order')?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';
    const { data: resultQuery } = useQuery({
        queryKey: [queryKey.getApplyJobs, { jobId, order, page, take: ITEM_PER_PAGE }],
        queryFn: async ({ queryKey }) => {
            try {
                const payload = await ApplyJobService.listCandidatesApplyJob(
                    queryKey[1] as DetailedRequest.GetAppliedJob
                );
                return payload || []; // Ensure a valid return value
            } catch (error: any) {
                handleErrorToast(error);
                return null; // Return fallback data to avoid query failure
            }
        },
        staleTime: 1000 * 60, // 1 minute
        retry: 2,
        enabled: true,
        placeholderData: (prevData) => prevData || [],
    });

    const [columns, setColumns] = useState<ColumnType[]>((resultQuery as ColumnType[]) || []);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [, setActiveColumn] = useState<ColumnType | null>(null);
    const [activeApplicant, setActiveApplicant] = useState<ShorthandApplication | null>(null);
    const [beforeStateColumn, setBeforeStateColumn] = useState<ColumnType[]>([]);

    const updateStatusMutation = useMutation({
        mutationFn: async (changes: Array<Pick<AppliedJob, 'appliedJobId' | 'status'>>) =>
            await ApplyJobService.updateApplicationStatus(changes),
        onSuccess: () => {
            setBeforeStateColumn(debouncedColumns);
        },
        onError: (error: any) => {
            handleErrorToast(error);
            setColumns(beforeStateColumn);
        },
    });

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

    // Move setTotalPages to a useEffect to avoid modifying state inside queryFn
    useEffect(() => {
        if (resultQuery) {
            setColumns((resultQuery as ColumnType[]) || []);
            setBeforeStateColumn((resultQuery as ColumnType[]) || []);
        }
    }, [resultQuery]);

    const debouncedColumns = useDebounce(columns, 2000);

    // Check for changes in the columns and update status
    useEffect(() => {
        const isChanged = compareChange(beforeStateColumn, debouncedColumns);
        if (isChanged) {
            const oldStateApplication = beforeStateColumn.reduce<ShorthandApplication[]>(
                (acc, current) => acc.concat(current.applicants),
                []
            );
            const currentStateApplication = debouncedColumns.reduce<ShorthandApplication[]>(
                (acc, current) => acc.concat(current.applicants),
                []
            );

            const changes = currentStateApplication
                .filter((current: ShorthandApplication) => {
                    return !oldStateApplication.some(
                        (old: ShorthandApplication) =>
                            old.appliedJobId === current.appliedJobId && old.status === current.status
                    );
                })
                .map((current: ShorthandApplication) => {
                    return {
                        appliedJobId: current.appliedJobId,
                        status: current.status,
                    };
                });

            updateStatusMutation.mutate(changes);
        }
    }, [debouncedColumns]);

    const compareChange = (oldState: ColumnType[], currentState: ColumnType[]) => {
        let isChanged = false;

        // Check for changes in column structure or applicant counts
        if (oldState.length !== currentState.length) {
            return true;
        }

        // Compare each column and its applicants
        for (let i = 0; i < oldState.length; i++) {
            const oldColumn = oldState[i];
            const currentColumn = currentState.find((col) => col.id === oldColumn.id);

            // If column doesn't exist anymore or has different count
            if (!currentColumn || oldColumn.count !== currentColumn.count) {
                isChanged = true;
                break;
            }

            // Check if applicants have changed in this column
            if (oldColumn.applicants.length !== currentColumn.applicants.length) {
                isChanged = true;
                break;
            }

            // Check if any applicants have been moved within or between columns
            const applicantsMoved = oldColumn.applicants.some((oldApp) => {
                const currentApp = currentColumn.applicants.find((app) => app.appliedJobId === oldApp.appliedJobId);
                return !currentApp; // If applicant not found in current column, it has moved
            });

            if (applicantsMoved) {
                isChanged = true;
                break;
            }
        }

        return isChanged;
    };

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
}

export type { ColumnType as Column };
