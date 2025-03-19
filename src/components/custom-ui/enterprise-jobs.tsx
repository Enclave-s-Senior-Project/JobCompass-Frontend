'use client';

import { queryKey } from '@/lib/react-query/keys';
import { EnterpriseService } from '@/services/enterprises.service';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';
import CardJobHorizontal from './card-job-horizontal';
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination';
import { Button } from '../ui/button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Skeleton } from '../ui/skeleton';

interface Props {
    enterpriseId: string;
    limit?: number;
}

export function EnterpriseJobs({ enterpriseId, limit = 10 }: Props) {
    const [page, setPage] = useState(1);

    const { data: dataQuery, isLoading } = useQuery({
        queryKey: [queryKey.enterpriseJob, enterpriseId, page],
        queryFn: async ({ queryKey }) => {
            try {
                const id = queryKey[1] as string;
                const page = queryKey[2] as number;
                return await EnterpriseService.getEnterpriseJob({ enterpriseId: id, take: limit, page });
            } catch {
                toast.error('Oops! Something went wrong');
            }
        },
        staleTime: 1000 * 60 * 30,
    });

    const handleNextPage = () => {
        if (page < (dataQuery?.meta?.pageCount ?? 0)) setPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage((prev) => prev - 1);
    };

    return (
        <div className="my-8">
            <div className="space-y-4 min-h-96">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                          <Skeleton key={index} className="w-full h-28 rounded-md" />
                      ))
                    : dataQuery?.data.map((job) => <CardJobHorizontal key={job.jobId} job={job} />)}
            </div>
            <Pagination className="mt-4">
                <PaginationContent className="space-x-2">
                    <PaginationItem>
                        <Button
                            variant="third"
                            size="icon-md"
                            disabled={!dataQuery?.meta.hasPreviousPage || isLoading}
                            onClick={handlePreviousPage}
                        >
                            <IoIosArrowBack />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="third"
                            size="icon-md"
                            disabled={!dataQuery?.meta.hasNextPage || isLoading}
                            onClick={handleNextPage}
                        >
                            <IoIosArrowForward />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
