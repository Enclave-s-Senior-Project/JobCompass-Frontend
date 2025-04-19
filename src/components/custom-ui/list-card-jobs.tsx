'use client';

import { Meta } from '@/types';
import { JobCardTwoType } from './card-job-two-type';
import { FileX } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { PrimaryPagination } from '../ui/pagination';
import { JobsList } from './job-list';
import { JobQuickView } from './global/job-quick-view';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { JobService } from '@/services';
import { handleErrorToast } from '@/lib/utils';
import { UserContext } from '@/contexts';

export default function ListCardJobs(props: {
    viewType: 'list' | 'grid';
    perPage: number;
    option: string;
    data?: any[];
    isOwn?: boolean;
    isPending: boolean;
    meta?: Meta;
    totalPages: number;
    refetch: () => void;
}) {
    const { userInfo } = useContext(UserContext);
    const ITEM_PER_PAGE = props.perPage;
    const { viewType, data, isPending, meta, totalPages } = props;

    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    useEffect(() => {
        console.log(selectedJobId);
    }, [selectedJobId]);

    const { data: jobDetails, refetch: refetchDetailJob } = useQuery({
        queryKey: [queryKey.detailJob, selectedJobId],
        queryFn: async () => {
            try {
                if (selectedJobId)
                    return await JobService.detailJob(selectedJobId, { userId: userInfo?.profileId || '' });
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        enabled: !!selectedJobId,
        staleTime: 1000 * 60 * 1,
    });

    useEffect(() => {
        if (props.data && props.data?.length > 0) {
            setSelectedJobId(props.data[0].jobId);
        }
    }, [props.data]);

    const refetch = async () => {
        await props.refetch();
    };

    return (
        <div className={viewType === 'grid' ? 'flex items-center justify-center' : ''}>
            <div className={viewType === 'grid' ? 'container mx-auto max-w-screen-xl' : ''}>
                {isPending ? (
                    viewType === 'grid' ? (
                        <div className="grid grid-cols-1 place-items-center gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array(ITEM_PER_PAGE)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-[204px] w-[414px] rounded-md sm:h-[180px] sm:w-[350px] md:h-[200px] md:w-[400px] lg:h-[204px] lg:w-[414px]"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col place-items-center gap-y-1">
                            {[...Array(ITEM_PER_PAGE)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex w-full max-w-2xl items-center space-x-2 rounded-md border p-4"
                                >
                                    <Skeleton className="h-14 w-14 rounded-sm" />
                                    <div className="flex flex-1 flex-col space-y-2">
                                        <Skeleton className="h-6 w-2/3" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : !data?.length ? (
                    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
                        <FileX className="mb-4 h-16 w-16 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-semibold text-foreground">No jobs found</h3>
                        <p className="max-w-[500px] text-muted-foreground">
                            Currently, there are no jobs posted. Please check back later or try searching with different
                            criteria.
                        </p>
                    </div>
                ) : (
                    <div className={viewType === 'list' ? 'flex flex-col place-items-center gap-y-1' : ''}>
                        {viewType === 'list' ? (
                            data.map((job, index) => (
                                <JobCardTwoType job={job} viewType={viewType} key={index} refetch={refetch} />
                            ))
                        ) : (
                            <div className="grid grid-cols-5 gap-2">
                                <div className="col-span-2">
                                    <JobsList
                                        jobs={data}
                                        refetchJob={refetch}
                                        refetchDetailJob={refetchDetailJob}
                                        onSelectItem={setSelectedJobId}
                                        temp={false}
                                    />
                                </div>
                                <div className="sticky left-0 top-0 col-span-3 h-[calc(100vh-50px)]">
                                    {jobDetails && <JobQuickView job={jobDetails} />}
                                </div>
                            </div>
                        )}
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
