'use client';
import { ColumnType, KanbanBoard } from '@/components/applications/kanban-board';
import { Button } from '@/components/ui/button';
import { queryKey } from '@/lib/react-query/keys';
import { toast } from '@/lib/toast';
import { handleErrorToast } from '@/lib/utils';
import { ApplyJobService } from '@/services';
import { AppliedJob, DetailedRequest, ShorthandApplication } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ITEM_PER_PAGE = 5;

export default function Home() {
    const { id } = useParams();

    const search = useSearchParams();

    const page = Number(search.get('page') || 1);
    const order = (search.get('order')?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';

    const { data: resultQuery, refetch } = useQuery({
        queryKey: [queryKey.getApplyJobs, { jobId: id, order, page, take: ITEM_PER_PAGE }],
        queryFn: async ({ queryKey }) => {
            try {
                const payload =
                    (await ApplyJobService.listCandidatesApplyJob(queryKey[1] as DetailedRequest.GetAppliedJob)) || [];

                setColumns(payload as ColumnType[]);
                return payload; // Ensure a valid return value
            } catch (error: any) {
                handleErrorToast(error);
                return null; // Return fallback data to avoid query failure
            }
        },
        retry: 2,
        enabled: true,
    });

    const updateStatusMutation = useMutation({
        mutationFn: async (changes: Array<Pick<AppliedJob, 'appliedJobId' | 'status'>>) =>
            await ApplyJobService.updateApplicationStatus(changes),
        onSuccess: () => {
            toast.success('Status updated successfully');
        },
        onError: (error: any) => {
            handleErrorToast(error);
        },
        onSettled: () => {
            refetch();
        },
    });

    const [columns, setColumns] = useState<ColumnType[]>((resultQuery as ColumnType[]) || []);

    const handleUpdateStatus = () => {
        const oldStateApplication = ((resultQuery as ColumnType[]) || []).reduce<ShorthandApplication[]>(
            (acc, current) => acc.concat(current.applicants),
            []
        );
        const currentStateApplication = columns.reduce<ShorthandApplication[]>(
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

        if (changes.length > 0) {
            updateStatusMutation.mutate(changes);
        }
    };

    return (
        <main className="container mx-auto w-full">
            <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/employer-dashboard/my-jobs" className="hover:text-primary">
                    My Jobs
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Applications</span>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Job Applications</h1>
                <div className="flex gap-2">
                    <Button onClick={handleUpdateStatus}>Confirm</Button>
                </div>
            </div>

            <KanbanBoard columns={columns} setColumns={setColumns} />
        </main>
    );
}
