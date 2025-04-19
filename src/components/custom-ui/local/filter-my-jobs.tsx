'use client';

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { JobStatusEnum, JobTypeEnum } from '@/lib/common-enum';
import { capitalize } from 'lodash';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { AddressService } from '@/services';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export type FilterValues = {
    jobType: string;
    jobStatus: string;
    jobLocation: string;
    jobExperience: string;
    jobBoost: string;
};

type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    filters: FilterValues;
    onApplyFilters: (filters: FilterValues) => void;
};

const filterConfig = {
    jobType: {
        label: 'Job type',
        name: 'jobType',
        defaultValue: 'all',
        options: [
            { label: 'All types', value: 'all' },
            ...Object.values(JobTypeEnum).map((jobType) => ({
                label: jobType,
                value: jobType,
            })),
        ],
    },
    jobStatus: {
        label: 'Job status',
        name: 'jobStatus',
        defaultValue: 'all',
        options: [
            { label: 'All statuses', value: 'all' },
            ...Object.values(JobStatusEnum).map((jobStatus) => ({
                label: capitalize(jobStatus),
                value: jobStatus,
            })),
        ],
    },
    jobExperience: {
        label: 'Job experience',
        name: 'jobExperience',
        defaultValue: 'all',
        options: [
            { label: 'All experience levels', value: 'all' },
            { label: 'Less than 1 year', value: '0-1' },
            { label: '1-2 years', value: '1-2' },
            { label: '3-5 years', value: '3-5' },
            { label: '6-10 years', value: '6-10' },
            { label: 'More than 10 years', value: '10-100' },
        ],
    },
    jobBoost: {
        label: 'Job boost',
        name: 'jobBoost',
        defaultValue: 'all',
        options: [
            { label: 'All jobs', value: 'all' },
            { label: 'Boosted', value: 'true' },
            { label: 'Not Boosted', value: 'false' },
        ],
    },
};

export const defaultFilters: FilterValues = {
    jobType: 'all',
    jobStatus: 'all',
    jobLocation: 'all',
    jobExperience: 'all',
    jobBoost: 'all',
};

export function FilterMyJobs({ onOpenChange, open, filters, onApplyFilters }: Props) {
    const [tempFilters, setTempFilters] = useState<FilterValues>(filters);

    const resetFilters = () => {
        setTempFilters({ ...defaultFilters });
    };

    const handleFilterChange = (name: keyof FilterValues, value: string) => {
        setTempFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        onApplyFilters(tempFilters);
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    // Update temp filters when props change
    useEffect(() => {
        setTempFilters(filters);
    }, [filters]);

    const { data: addressData, isLoading } = useQuery({
        queryKey: [queryKey.enterpriseAddresses],
        queryFn: async () => {
            try {
                return await AddressService.getAllAddressByEnterprise();
            } catch (error) {
                handleErrorToast(error);
                return [];
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const getSelectedLocationName = () => {
        if (tempFilters.jobLocation === 'all') return 'All locations';

        const selectedAddress = addressData?.find((address) => address.addressId === tempFilters.jobLocation);
        if (selectedAddress) {
            return `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.country}`;
        }

        return isLoading ? 'Loading locations...' : 'Select location';
    };

    return (
        <Sheet onOpenChange={onOpenChange} open={open}>
            <SheetContent>
                <SheetHeader className="mb-6">
                    <SheetTitle>My Jobs Filter</SheetTitle>
                    <SheetDescription>
                        Filter your job listings by status, date, and other criteria. Apply filters to see matching
                        results.
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                    <FilterSelect
                        config={filterConfig.jobType}
                        value={tempFilters.jobType}
                        onChange={(value) => handleFilterChange('jobType', value)}
                    />
                    <FilterSelect
                        config={filterConfig.jobStatus}
                        value={tempFilters.jobStatus}
                        onChange={(value) => handleFilterChange('jobStatus', value)}
                    />

                    <div>
                        <label className="text-sm font-light">Job location</label>
                        <Select
                            name="jobLocation"
                            value={tempFilters.jobLocation}
                            onValueChange={(value) => handleFilterChange('jobLocation', value)}
                        >
                            <SelectTrigger className="h-12 rounded-sm border border-primary-100 focus:border-primary focus:ring-1 focus:ring-primary">
                                <SelectValue className="text-sm">{getSelectedLocationName()}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All locations</SelectItem>
                                {addressData?.map((address) => (
                                    <SelectItem key={address.addressId} value={address.addressId || ''}>
                                        {address.street}, {address.city}, {address.country}
                                    </SelectItem>
                                ))}
                                {isLoading && (
                                    <SelectItem value="loading" disabled>
                                        Loading addresses...
                                    </SelectItem>
                                )}
                                {!isLoading && addressData?.length === 0 && (
                                    <SelectItem value="none" disabled>
                                        No addresses found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <FilterSelect
                        config={filterConfig.jobExperience}
                        value={tempFilters.jobExperience}
                        onChange={(value) => handleFilterChange('jobExperience', value)}
                    />
                    <FilterSelect
                        config={filterConfig.jobBoost}
                        value={tempFilters.jobBoost}
                        onChange={(value) => handleFilterChange('jobBoost', value)}
                    />
                </div>
                <SheetFooter className="mt-6 flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto">
                        Reset Filters
                    </Button>
                    <Button size="lg" onClick={applyFilters} disabled={isLoading} className="w-full sm:w-auto">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading
                            </>
                        ) : (
                            'Apply Filters'
                        )}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export const FilterSelect = ({
    config,
    value,
    onChange,
}: {
    config: typeof filterConfig.jobType;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div>
        <label className="text-sm font-light">{config.label}</label>
        <Select name={config.name} value={value} onValueChange={onChange}>
            <SelectTrigger className="h-12 rounded-sm border border-primary-100 focus:border-primary focus:ring-1 focus:ring-primary">
                <SelectValue className="text-sm" />
            </SelectTrigger>
            <SelectContent>
                {config.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);
