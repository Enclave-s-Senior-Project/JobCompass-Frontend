'use client';

import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { updateCandidateProfile } from '@/lib/action';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from './rich-text-editor';
import { Button } from '../ui/button';
import { languagesData } from '@/lib/data/languages.data';
import { UserContext } from '@/contexts/user-context';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { InputSelectSingle, InputSelectSingleItem } from './input-select-single';
import { queryKey } from '@/lib/react-query/keys';

type FormErrors = {
    nationality: (string | null)[];
    dateOfBirth: (string | null)[];
    gender: (string | null)[];
    maritalStatus: (string | null)[];
    introduction: (string | null)[];
};

export function FormUpdateCandidateProfile() {
    const { refreshMe, userInfo } = useContext(UserContext);

    const initialErrors: FormErrors = {
        nationality: [],
        dateOfBirth: [],
        gender: [],
        maritalStatus: [],
        introduction: [],
    };

    const [nationality, setNationality] = useState(userInfo?.nationality ?? '');
    const [gender, setGender] = useState(userInfo?.gender ?? '');
    const [introduction, setIntroduction] = useState(userInfo?.introduction ?? '');
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const [canSubmit, setCanSubmit] = useState(false);
    const [inputValueIndustry, setInputValueIndustry] = useState({ inputValue: '', selectValue: '' });

    useEffect(() => {
        console.log(inputValueIndustry);
    }, [inputValueIndustry]);

    const { mutate: submitMutation, isPending } = useMutation({
        mutationFn: () =>
            updateCandidateProfile({
                nationality,
                gender,
                introduction,
                industryId: null,
                majorityId: null,
            }),
        onSuccess: (res) => {
            const { success, errors } = res;
            setErrors(errors as FormErrors);
            if (success) {
                refreshMe();
                toast.success('Updated!');
            }
            return res;
        },
        onError: () => {
            toast.error('Oops! Something went wrong');
        },
    });

    useEffect(() => {
        refreshMe();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(checkFormChanged, 300); // Check after 100ms delay
        return () => clearTimeout(timeout);
    }, [nationality, gender, introduction, userInfo]);

    const checkFormChanged = () => {
        const hasChanges =
            nationality !== (userInfo?.nationality ?? '') ||
            gender !== (userInfo?.gender ?? '') ||
            introduction !== (userInfo?.introduction ?? '');

        setCanSubmit(hasChanges);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        submitMutation();
    };

    const categories = [
        { value: 'fruits', label: 'Fruits' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'dairy', label: 'Dairy' },
        { value: 'bakery', label: 'Bakery' },
        { value: 'meat', label: 'Meat' },
        { value: 'beverages', label: 'Beverages' },
        { value: 'snacks', label: 'Snacks' },
        { value: 'frozen', label: 'Frozen Foods' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                {/* nationality */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Nationality</label>
                    <Select name="nationality" value={nationality} onValueChange={setNationality}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.nationality?.length > 0
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.entries(languagesData).map(([abb, country]) => {
                                    return (
                                        <SelectItem key={abb} value={country.title}>
                                            {country.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.nationality?.length > 0 && errors.nationality[0]}
                    </p>
                </div>
                {/* gender */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Gender</label>
                    <Select name="gender" value={gender} onValueChange={setGender}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.gender?.length > 0
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.gender?.length > 0 && errors.gender[0]}
                    </p>
                </div>
                {/* industry */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Industry</label>
                    <InputSelectSingle
                        inputValue={inputValueIndustry.inputValue}
                        onChangeInputValue={(value) =>
                            setInputValueIndustry({ ...inputValueIndustry, inputValue: value })
                        }
                        selectValue={inputValueIndustry.selectValue}
                        onChangeSelectValue={(value) =>
                            setInputValueIndustry({ ...inputValueIndustry, selectValue: value })
                        }
                    >
                        {categories.map((category) => (
                            <InputSelectSingleItem key={category.value} value={category.value} label={category.label} />
                        ))}
                    </InputSelectSingle>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.nationality?.length > 0 && errors.nationality[0]}
                    </p>
                </div>
                {/* majority */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Nationality</label>
                    <Select name="nationality" value={nationality} onValueChange={setNationality}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.nationality?.length > 0
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.entries(languagesData).map(([abb, country]) => {
                                    return (
                                        <SelectItem key={abb} value={country.title}>
                                            {country.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.nationality?.length > 0 && errors.nationality[0]}
                    </p>
                </div>
                {/* introduction (bio) */}
                <div className="relative col-span-2">
                    <label className="text-sm text-gray-900 cursor-default">Introduction (Bio)</label>
                    <RichTextEditor
                        placement="inside-bottom"
                        name="introduction"
                        value={introduction}
                        onChange={setIntroduction}
                    />
                </div>
            </div>
            <div>
                <Button size="xl" variant="primary" type="submit" isPending={isPending} disabled={!canSubmit}>
                    Save changes
                </Button>
            </div>
        </form>
    );
}
