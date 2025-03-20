'use client';

import { Meta } from '@/types';
import { JobCardTwoType } from './card-job-two-type';
import { FileX } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { PrimaryPagination } from '../ui/pagination';

export default function ListCardJobs(props: {
    viewType: 'list' | 'grid';
    perPage: number;
    option: string;
    data?: any[];
    isPending: boolean;
    meta?: Meta;
    totalPages: number;
    refetch: () => void;
}) {
    const ITEM_PER_PAGE = props.perPage;
    const { viewType, data, isPending, meta, totalPages } = props;

    const refetch = async () => {
        await props.refetch();
    };

    return (
        <div className={viewType === 'grid' ? 'flex items-center justify-center' : ''}>
            <div className={viewType === 'grid' ? 'container mx-auto max-w-screen-xl' : ''}>
                {isPending ? (
                    [...Array(ITEM_PER_PAGE)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-56 w-56 lg:h-28 lg:w-30 rounded-sm" />
                            <div className="space-y-2 h-56 lg:h-28 flex-1 flex flex-col">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="flex-1 w-full" />
                            </div>
                        </div>
                    ))
                ) : !data?.length ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                        <FileX className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                        <p className="text-muted-foreground max-w-[500px]">
                            Currently, there are no jobs posted. Please check back later or try searching with different
                            criteria.
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            viewType === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 place-items-center'
                                : 'flex flex-col place-items-center gap-y-1'
                        }
                    >
                        {data.map((job, index) => (
                            <JobCardTwoType job={job} viewType={viewType} key={index} refetch={refetch} />
                        ))}
                    </div>
                )}
                {/* Pagination */}
                {Number(totalPages) > 1 && (
                    <div className="pt-5">
                        <PrimaryPagination
                            meta={meta as Meta}
                            pagination={{
                                page: meta?.page || 1,
                                order: props.option as 'ASC' | 'DESC',
                            }}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
