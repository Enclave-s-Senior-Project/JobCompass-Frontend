'use client';

import { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { EnterpriseService } from '@/services/enterprises.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { DetailedRequest } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { EnterpriseRegistrationItem } from './item-enterprise-registration';
import { toast } from '@/lib/toast';
import { EnterpriseStatus } from '@/lib/common-enum';
import { AdminDashboardPagination } from '@/components/custom-ui/global/pagination-admin-dashboard';

type Props = { params: DetailedRequest.Pagination };

const ListEnterpriseRegistration = memo(({ params }: Props) => {
    const [searchParams, setSearchParams] = useState<DetailedRequest.Pagination>(params);
    const searchDebounced = useDebounce(searchParams.options, 700);

    const { data, isPending, isFetching, refetch, isRefetching } = useQuery({
        queryKey: [queryKey.pendingStatusEnterprises, { ...searchParams, options: searchDebounced }],
        queryFn: async ({ queryKey }) => {
            try {
                return await EnterpriseService.fetchPendingStatusEnterprise(queryKey[1] as DetailedRequest.Pagination);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 2,
    });

    const updateEnterpriseStatusMutation = useMutation({
        mutationFn: async (params: {
            enterpriseId: string;
            status: EnterpriseStatus.ACTIVE | EnterpriseStatus.REJECTED;
            reason?: string;
        }) => {
            const defaultRejectMessage = `We regret to inform you that your enterprise registration was not approved at this time. Thank you for your interest in ${process.env.NEXT_PUBLIC_WEBSITE_NAME}.`;
            const reason =
                params.status === EnterpriseStatus.REJECTED ? params.reason || defaultRejectMessage : undefined;

            await EnterpriseService.updateEnterpriseStatus({
                enterpriseId: params.enterpriseId,
                status: params.status,
                reason,
            });
        },
        onSuccess: () => {
            toast.success('Updated enterprise status!');
            refetch();
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const handleApprove = (enterpriseId: string) => {
        updateEnterpriseStatusMutation.mutate({ enterpriseId, status: EnterpriseStatus.ACTIVE });
    };

    const handleReject = (enterpriseId: string, reason: string) => {
        updateEnterpriseStatusMutation.mutate({ enterpriseId, status: EnterpriseStatus.REJECTED, reason });
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Pending Enterprises</h1>
                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search enterprises..."
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
                    </div>
                </div>

                <Card className="rounded-md shadow-sm">
                    <CardHeader className="px-6 py-4">
                        <CardTitle className="text-base font-medium">Pending Enterprise Registrations</CardTitle>
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
                                            <TableHead>Enterprise</TableHead>
                                            <TableHead>Org. Type</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Industries / Fields</TableHead>
                                            <TableHead>Team size</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Founded in</TableHead>
                                            <TableHead>Submitted</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data?.data && data?.data.length > 0 ? (
                                            data?.data.map((enterprise) => (
                                                <EnterpriseRegistrationItem
                                                    key={enterprise.enterpriseId}
                                                    enterprise={enterprise}
                                                    handleApprove={handleApprove}
                                                    handleReject={handleReject}
                                                />
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={9} className="h-24 text-center">
                                                    No pending enterprises found.
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

ListEnterpriseRegistration.displayName = 'ListEnterpriseRegistration';

export { ListEnterpriseRegistration };
