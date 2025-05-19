'use client';
import { CardHeaderDashboard } from '@/components/custom-ui/local/admin-dashboard/dashboard/card-header';
import { RecentApplications } from '@/components/custom-ui/local/admin-dashboard/dashboard/recent-applications';
import { RevenueChart } from '@/components/custom-ui/local/admin-dashboard/dashboard/revenue-chart';
import { TopJobs } from '@/components/custom-ui/local/admin-dashboard/dashboard/top-jobs';
import { UserStats } from '@/components/custom-ui/local/admin-dashboard/dashboard/user-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { DashboardService } from '@/services/dashboard.service';
import { useQueries } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function AdminDashboardPage() {
    const [company, setCompany] = useState<string | undefined>(undefined);
    const dashboardQueries = useQueries({
        queries: [
            {
                queryKey: [queryKey.getTotal],
                queryFn: async () => {
                    try {
                        const payload = await DashboardService.getTotal();
                        return payload;
                    } catch (error: any) {
                        handleErrorToast(error);
                    }
                },
                retry: 2,
                enabled: true,
            },
            {
                queryKey: [queryKey.getListCandidateApply, company],
                queryFn: async () => {
                    try {
                        const payload = await DashboardService.getListCandidateApply(company);
                        return payload || null;
                    } catch (error: any) {
                        handleErrorToast(error);
                    }
                },
                retry: 2,
                enabled: true,
            },
            {
                queryKey: [queryKey.getListTopApplyJob],
                queryFn: async () => {
                    try {
                        const payload = await DashboardService.getListTopApplyJob();
                        return payload || null;
                    } catch (error: any) {
                        handleErrorToast(error);
                    }
                },
                retry: 2,
                enabled: true,
            },
            {
                queryKey: [queryKey.getDataRevenue],
                queryFn: async () => {
                    try {
                        const payload = await DashboardService.getDataRevenue();
                        return payload || null;
                    } catch (error: any) {
                        handleErrorToast(error);
                    }
                },
                retry: 2,
                enabled: true,
            },
        ],
    });
    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardHeaderDashboard
                    totalCandidate={dashboardQueries[0]?.data?.totalCandidate}
                    totalEnterprise={dashboardQueries[0]?.data?.totalEnterprise}
                    totalUser={dashboardQueries[0]?.data?.totalUser}
                    totalJob={dashboardQueries[0]?.data?.totalJob}
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>revenue</CardTitle>
                        <CardDescription>Monthly revenue this year</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <RevenueChart temp={dashboardQueries[3].data || []} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Website Statistics</CardTitle>
                        <CardDescription>User Allocation By Type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UserStats
                            totalCandidate={dashboardQueries[0]?.data?.totalCandidate}
                            totalEnterprise={dashboardQueries[0]?.data?.totalEnterprise}
                            totalJob={dashboardQueries[0]?.data?.totalJob}
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent job applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {dashboardQueries[1].isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <RecentApplications
                                appliedJobs={dashboardQueries[1]?.data?.applyJobs || []}
                                enterprises={dashboardQueries[1].data?.enterprises || []}
                                setCompany={setCompany}
                                company={company}
                            />
                        )}
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Most applied jobs</CardTitle>
                        <CardDescription>Top 5 jobs with the most applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {dashboardQueries[2].isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <TopJobs temp={dashboardQueries[2]?.data || []} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
