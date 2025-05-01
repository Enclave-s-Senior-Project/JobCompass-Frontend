'use client';

import { AdminDashboardPagination } from '@/components/custom-ui/global/pagination-admin-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { DetailedRequest } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { memo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { JobService } from '@/services';
import { JobFilter } from './job-filter';
import { CiFilter } from 'react-icons/ci';
import { JobItem } from './job-item';

type Props = {
    params: DetailedRequest.GetListJob;
};

export const JobList = memo(({ params }: Props) => {
    const [searchParams, setSearchParams] = useState<DetailedRequest.GetListJob>(params);

    const searchDebounced = useDebounce(searchParams.name, 700);

    const { data, isPending, refetch } = useQuery({
        queryKey: [queryKey.getJobManagement, { ...searchParams, name: searchDebounced }],
        queryFn: async ({ queryKey }) => {
            try {
                return await JobService.findJobs(queryKey[1] as DetailedRequest.GetListJob);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 1,
    });

    const handleFilter = (params: DetailedRequest.GetListJob) => {
        setSearchParams((prev) => ({ ...prev, ...params }));
    };
    const handleResetFilter = () => {
        setSearchParams(params);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Jobs Management</h1>
                </div>

                <Card className="rounded-md shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
                        <CardTitle className="text-base font-medium">Job List</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search jobs name..."
                                    className="h-8 w-full rounded-sm pl-8 text-sm placeholder:text-sm focus-within:border-gray-500 focus-visible:ring-0"
                                    value={searchParams.name}
                                    onChange={(e) =>
                                        setSearchParams((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <Select
                                defaultValue={searchParams.take?.toString()}
                                onValueChange={(value) =>
                                    setSearchParams((prev) => ({ ...prev, take: Number(value) || 5 }))
                                }
                            >
                                <SelectTrigger className="h-8 w-[80px] rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                </SelectContent>
                            </Select>
                            <JobFilter
                                filter={searchParams}
                                nodeTrigger={
                                    <button className="max-h-9 rounded-sm bg-muted/50 p-1 hover:bg-muted [&_svg]:size-6">
                                        <CiFilter />
                                    </button>
                                }
                                onFilter={handleFilter}
                                onReset={handleResetFilter}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* isFetching ignores placeholder data */}
                        {isPending ? (
                            <div className="flex h-96 items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Job</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Industry</TableHead>
                                            <TableHead>Specializations</TableHead>
                                            <TableHead>Education</TableHead>
                                            <TableHead>EXP.</TableHead>
                                            <TableHead>Salary</TableHead>
                                            <TableHead>Tags</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>Deadline</TableHead>
                                            <TableHead>Created at</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data?.data && data?.data.length > 0 ? (
                                            data?.data.map((job) => (
                                                <JobItem refetchList={refetch} key={job.jobId} job={job} />
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={13} className="h-24 text-center">
                                                    No jobs found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </>
                        )}
                    </CardContent>
                </Card>

                <AdminDashboardPagination
                    meta={data?.meta}
                    page={searchParams.page || 1}
                    setPage={(page: number) => setSearchParams((prev) => ({ ...prev, page: page }))}
                />
            </div>
        </div>
    );
});

JobList.displayName = 'JobList';
