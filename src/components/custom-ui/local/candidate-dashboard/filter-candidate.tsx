'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DetailedRequest } from '@/types';
import React, { memo } from 'react';
import { CandidateStatus, GenderCandidate, MaritalStatusCandidate } from '@/lib/common-enum';
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
import { languagesData } from '@/lib/data/languages.data';
import { SelectGroup } from '@radix-ui/react-select';

type FilterCandidateListProps = {
    params: DetailedRequest.GetListCandidate;
    onFilter: (params: DetailedRequest.GetListCandidate) => void;
    onReset: () => void;
    nodeTrigger: React.ReactNode;
};

export const FilterCandidateList = memo(({ params, nodeTrigger, onFilter, onReset }: FilterCandidateListProps) => {
    const [localFilter, setLocalFilter] = React.useState<DetailedRequest.GetListCandidate>(params);

    const handleChangeEnterpriseStatus = (status: CandidateStatus | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            status: status === 'all' ? undefined : status,
        }));
    };

    const handleChangeGender = (gender: GenderCandidate | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            gender: gender === 'all' ? undefined : gender,
        }));
    };

    const handleChangeMaritalStatus = (maritalStatus: MaritalStatusCandidate | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            maritalStatus: maritalStatus === 'all' ? undefined : maritalStatus,
        }));
    };

    const handleChangeNationality = (nationality: string | 'all') => {
        setLocalFilter((prev) => ({
            ...prev,
            nationality: nationality === 'all' ? undefined : nationality,
        }));
    };

    const handleSubmitFilter = () => {
        onFilter(localFilter);
    };

    const handleReset = () => {
        setLocalFilter((prev) => ({
            ...prev,
            status: undefined,
            gender: undefined,
            maritalStatus: undefined,
            nationality: undefined,
        }));
        onReset();
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
                        <Label className="font-normal">Candidate Status</Label>
                        <Select defaultValue={localFilter.status} onValueChange={handleChangeEnterpriseStatus}>
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(CandidateStatus).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {capitalize(value)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="font-normal">Gender</Label>
                        <Select defaultValue={localFilter.gender} onValueChange={handleChangeGender}>
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(GenderCandidate).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {capitalize(value)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="font-normal">Marital Status</Label>
                        <Select defaultValue={localFilter.maritalStatus} onValueChange={handleChangeMaritalStatus}>
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(MaritalStatusCandidate).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {capitalize(value)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="font-normal">Nationality</Label>
                        <Select defaultValue={localFilter.nationality} onValueChange={handleChangeNationality}>
                            <SelectTrigger className="h-12 rounded-sm border ring-0 focus:border-gray-500 focus:ring-0">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.entries(languagesData).map(([abb]) => {
                                        return (
                                            <SelectItem key={abb} value={abb}>
                                                {abb}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter className="mt-12">
                    <SheetClose>
                        <Button type="reset" variant="ghost" onClick={handleReset}>
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

FilterCandidateList.displayName = 'FilterCandidateList';
