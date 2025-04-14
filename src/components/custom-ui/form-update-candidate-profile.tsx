'use client';

import React, { FormEvent, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { updateCandidateProfile } from '@/lib/action';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from './rich-text-editor';
import { Button } from '../ui/button';
import { languagesData } from '@/lib/data/languages.data';
import { UserContext } from '@/contexts/user-context';
import { toast } from '@/lib/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { InputSelectSingle, InputSelectSingleItem } from './input-select-single';
import { queryKey } from '@/lib/react-query/keys';
import { CategoryService } from '@/services/categories.service';
import { useDebounce } from '@/hooks/useDebounce';
import { handleErrorToast } from '@/lib/utils';
import { Edit, XCircle } from 'lucide-react';

type FormErrors = {
    nationality: (string | null)[];
    industry: (string | null)[];
    gender: (string | null)[];
    majority: (string | null)[];
    introduction: (string | null)[];
};

export function FormUpdateCandidateProfile() {
    const { refreshMe, userInfo } = useContext(UserContext);

    const initialErrors: FormErrors = {
        nationality: [],
        industry: [],
        gender: [],
        majority: [],
        introduction: [],
    };

    const [editable, setEditable] = useState(false);
    const [nationality, setNationality] = useState(userInfo?.nationality ?? '');
    const [gender, setGender] = useState(userInfo?.gender ?? '');
    const [introduction, setIntroduction] = useState(userInfo?.introduction ?? '');
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const [canSubmit, setCanSubmit] = useState(false);
    const [inputValueIndustry, setInputValueIndustry] = useState({
        inputValue: userInfo?.industry?.categoryName ?? '',
        selectValue: userInfo?.industry?.categoryId ?? '',
    });
    const [inputValueMajority, setInputValueMajority] = useState({
        inputValue: userInfo?.majority?.categoryName ?? '',
        selectValue: userInfo?.majority?.categoryId ?? '',
    });
    const debouncedIndustry = useDebounce(inputValueIndustry.inputValue, 500);
    const debouncedMajority = useDebounce(inputValueMajority.inputValue, 500);

    const { data: primaryCategoryData } = useQuery({
        queryKey: [queryKey.categoriesPrimary, debouncedIndustry],
        queryFn: async ({ queryKey }) => {
            try {
                return await CategoryService.getPrimaryCategories({ options: queryKey[1], take: 20 });
            } catch (error) {
                handleErrorToast(error);
            }
        },
    });

    const { data: childrenCategoryData } = useQuery({
        queryKey: [queryKey.categoriesChild, inputValueIndustry.selectValue, debouncedMajority],
        queryFn: async ({ queryKey }) => {
            try {
                return await CategoryService.getCategoriesChildren(queryKey[1], { options: queryKey[2], take: 20 });
            } catch (error) {
                handleErrorToast(error);
            }
        },
        enabled: !!inputValueIndustry.selectValue, // query if industry is selected
    });

    const { mutate: submitMutation, isPending } = useMutation({
        mutationFn: () =>
            updateCandidateProfile({
                nationality,
                gender,
                introduction,
                industryId: inputValueIndustry.selectValue,
                majorityId: inputValueMajority.selectValue,
            }),
        onSuccess: (res) => {
            const { success, errors } = res;
            setErrors(errors as FormErrors);
            if (success) {
                refreshMe();
                setEditable(false);
                toast.success('Updated user is successfully!');
            }
            return res;
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    useEffect(() => {
        refreshMe();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(checkFormChanged, 300); // Check after 100ms delay
        return () => clearTimeout(timeout);
    }, [nationality, gender, introduction, userInfo, inputValueIndustry.selectValue, inputValueMajority.selectValue]);

    // trigger if user unselect the industry, the majority will be removed
    useEffect(() => {
        if (!inputValueIndustry.selectValue && inputValueMajority.selectValue) {
            setInputValueMajority({
                inputValue: '',
                selectValue: '',
            });
        }
    }, [inputValueIndustry.selectValue]);

    const checkFormChanged = () => {
        const hasChanges =
            nationality !== (userInfo?.nationality ?? '') ||
            gender !== (userInfo?.gender ?? '') ||
            introduction !== (userInfo?.introduction ?? '') ||
            inputValueIndustry.selectValue !== (userInfo?.industry?.categoryId ?? '') ||
            inputValueMajority.selectValue !== (userInfo?.majority?.categoryId ?? '');
        setCanSubmit(hasChanges);
    };

    const handleToggleEditable = () => {
        setEditable((prev) => !prev);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (editable) submitMutation();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium text-gray-900">Candidate Information</h5>
                <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className={clsx('text-sm', editable ? 'text-red-500 border-red-100 hover:border-red-500' : '')}
                    onClick={handleToggleEditable}
                >
                    {editable ? <XCircle /> : <Edit />}
                    {editable ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {/* nationality */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Nationality</label>
                    <Select name="nationality" value={nationality} onValueChange={setNationality} disabled={!editable}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.nationality?.length > 0
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary',
                                nationality ? 'text-gray-900' : 'text-stone-500'
                            )}
                        >
                            <SelectValue placeholder="Select..." />
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
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.nationality?.length > 0 && errors.nationality[0]}
                    </p>
                </div>
                {/* gender */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Gender</label>
                    <Select name="gender" value={gender} onValueChange={setGender} disabled={!editable}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.gender?.length > 0
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary',
                                gender ? 'text-gray-900' : 'text-stone-500'
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
                        disabled={!editable}
                        placeholder="Select..."
                        inputValue={inputValueIndustry.inputValue}
                        onChangeInputValue={(value: string) =>
                            setInputValueIndustry((prev) => ({ ...prev, inputValue: value }))
                        }
                        selectValue={inputValueIndustry.selectValue}
                        onChangeSelectValue={(value: string) =>
                            setInputValueIndustry((prev) => ({ ...prev, selectValue: value }))
                        }
                    >
                        {primaryCategoryData?.data.map((category) => (
                            <InputSelectSingleItem
                                key={category.categoryId}
                                value={category.categoryId}
                                label={category.categoryName}
                            />
                        ))}
                    </InputSelectSingle>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.industry?.length > 0 && errors.nationality[0]}
                    </p>
                </div>
                {/* majority */}
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Majority</label>
                    <InputSelectSingle
                        disabled={!editable}
                        placeholder="Select..."
                        inputValue={inputValueMajority.inputValue}
                        onChangeInputValue={(value: string) =>
                            setInputValueMajority((prev) => ({ ...prev, inputValue: value }))
                        }
                        selectValue={inputValueMajority.selectValue}
                        onChangeSelectValue={(value: string) =>
                            setInputValueMajority((prev) => ({ ...prev, selectValue: value }))
                        }
                    >
                        {childrenCategoryData?.data.map((category) => (
                            <InputSelectSingleItem
                                key={category.categoryId}
                                value={category.categoryId}
                                label={category.categoryName}
                            />
                        ))}
                    </InputSelectSingle>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.majority?.length > 0 && errors.nationality[0]}
                    </p>
                </div>
                {/* introduction (bio) */}
                <div className="relative col-span-2">
                    <label className="text-sm text-gray-900 cursor-default">Introduction (Bio)</label>
                    <RichTextEditor
                        disabled={!editable}
                        placement="inside-bottom"
                        name="introduction"
                        value={introduction}
                        onChange={setIntroduction}
                    />
                </div>
            </div>
            {editable && (
                <div>
                    <Button size="xl" variant="primary" type="submit" isPending={isPending} disabled={!canSubmit}>
                        Save changes
                    </Button>
                </div>
            )}
        </form>
    );
}
