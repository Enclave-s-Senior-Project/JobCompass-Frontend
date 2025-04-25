'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryKey } from '@/lib/react-query/keys';
import { handleErrorToast } from '@/lib/utils';
import { DetailedRequest } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, memo } from 'react';
import { EnterpriseStatus, OrganizationType } from '@/lib/common-enum';
import { capitalize } from 'lodash';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CategoryService } from '@/services';

type FilterEnterpriseListProps = {
    params: DetailedRequest.GetListEnterprise;
    onFilter: (params: DetailedRequest.GetListEnterprise) => void;
    onReset: () => void;
    nodeTrigger: React.ReactNode;
};

export const FilterEnterpriseList = memo(({ params, nodeTrigger, onFilter, onReset }: FilterEnterpriseListProps) => {
    const [localFilter, setLocalFilter] = React.useState<DetailedRequest.GetListEnterprise>(params);

    const { data } = useQuery({
        queryKey: [queryKey.categoriesPrimary],
        queryFn: async () => {
            try {
                return await CategoryService.getPrimaryCategories({ take: 50 });
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 1,
    });

    const handleChangeEnterpriseStatus = (status: EnterpriseStatus | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            status: status === 'all' ? undefined : status,
        }));
    };

    const handleChangeOrganizationType = (organizationType: OrganizationType | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            organizationType: organizationType === 'all' ? undefined : organizationType,
        }));
    };

    const handleChangeCategory = (categoryId: string | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            categoryId: categoryId === 'all' ? undefined : categoryId,
        }));
    };

    const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalFilter((prev) => ({
            ...prev,
            address: e.target.value,
        }));
    };

    const handleSubmitFilter = () => {
        onFilter(localFilter);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{nodeTrigger}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Advanced Filter</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                    <div>
                        <Label className="font-normal">Enterprise Status</Label>
                        <Select defaultValue={localFilter.status} onValueChange={handleChangeEnterpriseStatus}>
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(EnterpriseStatus).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {capitalize(value)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="font-normal">Org. Type</Label>
                        <Select
                            defaultValue={localFilter.organizationType}
                            onValueChange={handleChangeOrganizationType}
                        >
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(OrganizationType).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {capitalize(value)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="font-normal">Industry / Field</Label>
                        <Select defaultValue={localFilter.categoryId} onValueChange={handleChangeCategory}>
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {data?.data.map((category) => (
                                    <SelectItem key={category.categoryId} value={category.categoryId}>
                                        {capitalize(category.categoryName)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="font-normal">Address</Label>
                        <Input
                            type="search"
                            placeholder="Input address..."
                            value={localFilter.address}
                            onChange={handleChangeAddress}
                            className="h-12 w-full rounded-sm text-sm placeholder:text-sm focus-within:border-gray-500 focus-visible:ring-0"
                        />
                    </div>
                </div>
                <SheetFooter className="mt-12">
                    <SheetClose>
                        <Button type="reset" variant="ghost" onClick={onReset}>
                            Reset
                        </Button>
                    </SheetClose>
                    <SheetClose>
                        <Button type="submit" onClick={handleSubmitFilter}>
                            Apply
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
});

FilterEnterpriseList.displayName = 'FilterEnterpriseList';
