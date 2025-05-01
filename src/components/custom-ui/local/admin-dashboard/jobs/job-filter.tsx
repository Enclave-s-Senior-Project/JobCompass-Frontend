'use client';

import { memo, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
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
import { DetailedRequest } from '@/types';
import { EXPERIENCE_OPTIONS, SALARY_OPTIONS } from '@/components/custom-ui/search-bar';
import { EducationJobLevelEnum, JobStatusEnum, JobTypeEnum } from '@/lib/common-enum';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { CategoryService } from '@/services';
import { cn, handleErrorToast } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { EnterpriseService } from '@/services/enterprises.service';
import Image from 'next/image';
import { capitalize } from 'lodash';
import { Badge } from '@/components/ui/badge';

type Props = {
    filter: DetailedRequest.GetListJob;
    nodeTrigger?: React.ReactNode;
    onFilter?: (params: any) => void;
    onReset?: () => void;
};

export const JobFilter = memo(({ filter, nodeTrigger, onFilter, onReset }: Props) => {
    const [localFilter, setLocalFilter] = useState<DetailedRequest.GetListJob>(filter);
    const [enterpriseName, setEnterpriseName] = useState<string>('');
    const enterpriseNameDebounced = useDebounce<string>(enterpriseName, 700);

    const industriesQuery = useQuery({
        queryKey: [queryKey.categoriesPrimary],
        queryFn: async () => {
            try {
                return await CategoryService.getPrimaryCategories({ take: 50 });
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: true,
        retry: 1,
    });

    const enterprisesQuery = useQuery({
        queryKey: [queryKey.enterpriseListManagement, enterpriseNameDebounced],
        queryFn: async ({ queryKey }) => {
            try {
                if (queryKey[1] === '') return null;
                return await EnterpriseService.getOverviewEnterprise(queryKey[1] as string);
            } catch (error) {
                handleErrorToast(error);
            }
        },
    });

    useEffect(() => {
        setLocalFilter(filter);
    }, [filter]);

    const handleSelectIndustry = (value: string) => {
        setLocalFilter((prev) => ({ ...prev, industryCategoryId: value, majorityCategoryId: undefined }));
    };

    const handleSelectSalary = (value: string) => {
        const [min, max] = value.split('-').map((v) => Number(v.trim()));
        setLocalFilter((prev) => ({ ...prev, minWage: min, maxWage: max }));
    };

    const handleSubmit = () => {
        if (onFilter) {
            onFilter({
                ...localFilter,
                industryCategoryId: localFilter?.majorityCategoryId ? undefined : localFilter?.industryCategoryId,
            } as DetailedRequest.GetListJob);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{nodeTrigger}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Advanced Job Filter</SheetTitle>
                    <SheetDescription>Filter jobs by various criteria.</SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-2">
                    {/* Filter inputs here */}

                    <div>
                        <Label className="text-sm font-normal text-gray-800">Location</Label>
                        <Input
                            className="text-base placeholder:text-sm focus:border-black focus:ring-0 focus-visible:ring-0"
                            name="location"
                            type="search"
                            value={localFilter?.location}
                            placeholder="Location (country, city, etc.)"
                            onChange={(e) => setLocalFilter((prev) => ({ ...prev, location: e.target.value }))}
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-normal text-gray-800">Industry / Field</Label>
                        <Select
                            name="industry"
                            value={localFilter?.industryCategoryId}
                            onValueChange={handleSelectIndustry}
                        >
                            <SelectTrigger>
                                <SelectValue className="text-base" placeholder="All industries" />
                            </SelectTrigger>
                            <SelectContent>
                                {industriesQuery.data?.data?.map((item) => (
                                    <SelectItem key={item.categoryId} value={item.categoryId}>
                                        {item.categoryName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-normal text-gray-800">Specialization</Label>
                        <Select
                            name="specialization"
                            value={localFilter?.majorityCategoryId}
                            onValueChange={(value) =>
                                setLocalFilter((prev) => ({ ...prev, majorityCategoryId: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue className="text-base" placeholder="All specializations" />
                            </SelectTrigger>
                            <SelectContent>
                                {industriesQuery.data?.data
                                    ?.find((item) => item.categoryId === localFilter?.industryCategoryId)
                                    ?.children?.map((item) => (
                                        <SelectItem key={item.categoryId} value={item.categoryId}>
                                            {item.categoryName}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label className="text-sm font-normal text-gray-800">Salary</Label>
                            <Select
                                name="salary"
                                value={
                                    localFilter?.minWage && localFilter?.minWage
                                        ? `${localFilter?.minWage}-${localFilter?.maxWage}`
                                        : undefined
                                }
                                onValueChange={handleSelectSalary}
                            >
                                <SelectTrigger>
                                    <SelectValue className="text-base" placeholder="All salary ranks" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SALARY_OPTIONS.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-sm font-normal text-gray-800">Experience</Label>
                            <Select
                                name="experience"
                                value={localFilter?.experience}
                                onValueChange={(value) => setLocalFilter((prev) => ({ ...prev, experience: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue className="text-base" placeholder="All experiences" />
                                </SelectTrigger>
                                <SelectContent>
                                    {EXPERIENCE_OPTIONS.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label className="text-sm font-normal text-gray-800">Job Type</Label>
                        <Select
                            name="jobType"
                            value={localFilter?.type?.[0]}
                            onValueChange={(value) =>
                                setLocalFilter((prev) => ({ ...prev, type: [value] as JobTypeEnum[] }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue className="text-base" placeholder="All job types" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(JobTypeEnum).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-normal text-gray-800">Education</Label>
                        <Select
                            name="education"
                            value={localFilter?.education?.[0]}
                            onValueChange={(value) =>
                                setLocalFilter((prev) => ({ ...prev, education: [value] as EducationJobLevelEnum[] }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue className="text-base" placeholder="All education levels" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(EducationJobLevelEnum).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-normal text-gray-800">Job Status</Label>
                        <Select
                            name="jobStatus"
                            value={localFilter?.status}
                            onValueChange={(value) =>
                                setLocalFilter((prev) => ({ ...prev, status: value as JobStatusEnum }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue className="text-base" placeholder="All job statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(JobStatusEnum).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-sm font-normal text-gray-800">Deadline (start - end)</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                className="text-base placeholder:text-sm"
                                type="date"
                                value={localFilter?.minDeadline}
                                onChange={(e) => setLocalFilter((prev) => ({ ...prev, minDeadline: e.target.value }))}
                            />
                            <Input
                                className="text-base placeholder:text-sm"
                                type="date"
                                value={localFilter?.maxDeadline}
                                onChange={(e) => setLocalFilter((prev) => ({ ...prev, maxDeadline: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="text-sm font-normal text-gray-800">Enterprise name</Label>
                        <Input
                            className="text-base placeholder:text-sm focus:border-black focus:ring-0 focus-visible:ring-0"
                            name="enterpriseId"
                            type="search"
                            value={enterpriseName}
                            placeholder="Enterprise name"
                            onChange={(e) => setEnterpriseName(e.target.value)}
                        />
                        <div className="mt-2 max-h-96 space-y-2 overflow-y-auto rounded-md border p-2">
                            {enterpriseNameDebounced ? (
                                enterprisesQuery.data && enterprisesQuery.data?.length > 0 ? (
                                    enterprisesQuery.data?.map((e) => (
                                        <button
                                            key={e.enterpriseId}
                                            className={cn(
                                                'flex w-full items-center gap-2 p-2 hover:bg-muted',
                                                localFilter?.enterpriseId === e.enterpriseId && 'bg-muted'
                                            )}
                                            onClick={() => {
                                                setLocalFilter((prev) => ({
                                                    ...prev,
                                                    enterpriseId: e.enterpriseId,
                                                }));
                                                setEnterpriseName(e.name);
                                            }}
                                        >
                                            <Image
                                                src={e.logoUrl}
                                                alt={e.name}
                                                height={40}
                                                width={40}
                                                className="size-10"
                                            />
                                            <div className="text-start">
                                                <span>{e.name}</span>&nbsp;
                                                <Badge variant="outline" className="text-sm text-gray-700">
                                                    {capitalize(e.status || '')}
                                                </Badge>
                                                <p className="text-[12px] font-semibold italic text-gray-700">
                                                    {e.enterpriseId}
                                                </p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <span className="flex justify-center text-sm text-gray-500">
                                        No enterprise matched
                                    </span>
                                )
                            ) : (
                                <span className="flex justify-center text-sm text-gray-500">
                                    Please enter enterprise name
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <SheetFooter className="mt-8">
                    <SheetClose asChild>
                        <Button type="reset" variant="ghost" onClick={onReset}>
                            Reset
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button onClick={handleSubmit} type="submit">
                            Filter
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
});

JobFilter.displayName = 'JobFilter';
