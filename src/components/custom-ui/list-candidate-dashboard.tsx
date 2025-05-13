'use client';

import { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { DetailedRequest } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { AdminDashboardPagination } from '@/components/custom-ui/global/pagination-admin-dashboard';
import { UserService } from '@/services';
import { CandidateItem } from './candidates-items';
import { FilterCandidateList } from './local/candidate-dashboard/filter-candidate';
import { CiFilter } from 'react-icons/ci';

type Props = { params: DetailedRequest.GetListCandidate };

const ListCandidateDashboard = memo(({ params }: Props) => {
    const [searchParams, setSearchParams] = useState<DetailedRequest.GetListCandidate>(params);
    const searchDebounced = useDebounce(searchParams.options, 700);

    const { data, isPending, isFetching, refetch, isRefetching } = useQuery({
        queryKey: [queryKey.candidateDashboard, { ...searchParams, options: searchDebounced }],
        queryFn: async ({ queryKey }) => {
            try {
                return await UserService.getUserDashboard(queryKey[1] as DetailedRequest.GetListCandidate);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 2,
    });
    const handleFilter = (params: DetailedRequest.GetListCandidate) => {
        setSearchParams((prev) => ({ ...prev, ...params }));
    };
    const handleResetFilter = () => {
        setSearchParams((prev) => {
            const newParams = { ...prev };
            delete newParams.status;
            delete newParams.gender;
            delete newParams.maritalStatus;
            delete newParams.nationality;
            return newParams;
        });
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">List Candidates</h1>
                </div>

                <Card className="rounded-md shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
                        <CardTitle className="text-base font-medium">Candidates</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search candidates..."
                                    className="h-8 w-full rounded-sm pl-8 text-sm placeholder:text-sm focus-within:border-gray-500 focus-visible:ring-0"
                                    value={searchParams.options}
                                    onChange={(e) =>
                                        setSearchParams((prev) => ({
                                            ...prev,
                                            options: e.target.value,
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
                            <FilterCandidateList
                                onFilter={handleFilter}
                                onReset={handleResetFilter}
                                params={searchParams}
                                nodeTrigger={
                                    <button className="max-h-9 rounded-sm bg-muted/50 p-1 hover:bg-muted [&_svg]:size-6">
                                        <CiFilter />
                                    </button>
                                }
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* isFetching ignores placeholder data */}
                        {isPending || (isFetching && !isRefetching) ? (
                            <div className="flex h-96 items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Candidate</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>Nationality</TableHead>
                                            <TableHead>Married Status</TableHead>
                                            <TableHead>Is Premium</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Date Of Birth</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data?.data && data?.data.length > 0 ? (
                                            data?.data.map((enterprise) => (
                                                <CandidateItem
                                                    key={enterprise.profileId}
                                                    candidate={enterprise}
                                                    account={enterprise?.account}
                                                    refetch={refetch}
                                                />
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={9} className="h-24 text-center">
                                                    No pending candidate found.
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

ListCandidateDashboard.displayName = 'ListCandidateDashboard';

export { ListCandidateDashboard };
