'use client';
import type React from 'react';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LuArrowRight } from 'react-icons/lu';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { postJob } from '@/lib/action';
import { Category, Tag } from '@/types';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { successKeyMessage } from '@/lib/message-keys';
import { useRouter } from 'next/navigation';
import MultiSelectSearchInput from '@/components/custom-ui/selected-tags';
import { DialogAddTag } from '@/components/custom-ui/dialog-add-tag';
import { CategoryService } from '@/services/categories.service';
import { AddressService } from '@/services/address.service';
import MultiSelectCategoriesChildSearchInput from '@/components/custom-ui/select-categories-child';
import { handleErrorToast } from '@/lib/utils';
import { queryKey } from '@/lib/react-query/keys';
import { toast } from '@/lib/toast';
import { EducationJobLevelEnum, JobTypeEnum } from '@/lib/common-enum';
import { DollarSign, FileText, Gift, ListChecks } from 'lucide-react';

export default function PostJobForm() {
    const router = useRouter();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [state, onSubmit] = useActionState(postJob, {
        title: '',
        tags: [] as Tag[],
        minSalary: '',
        maxSalary: '',
        description: '',
        responsibilities: '',
        categories: '',
        address: '',
        benefit: '',
        jobSpecialization: [] as Category[],
        requirements: '',
    });
    const [description, setDescription] = useState(state.description);
    const [responsibilities, setResponsibility] = useState(state.responsibilities);
    const [benefit, setBenefit] = useState(state.benefit);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [jobSpecializations, setJobSpecializations] = useState<string[]>([]);
    const [requirements, setRequirements] = useState(state.requirements);

    const { data: resultQuery, refetch } = useQuery({
        queryKey: [queryKey.listCategory],
        queryFn: async () => {
            try {
                const payload = await CategoryService.getPrimaryCategories({});
                const temp = await AddressService.getAllAddressByEnterprise();
                return { payload, temp };
            } catch (error: any) {
                console.log(error);
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });

    useEffect(() => {
        if (state.success) {
            toast.success(successKeyMessage.POST_JOB_SUCCESSFUL);
            router.push('/');
        }
    }, [state.success, state.errors]);

    const handleDescription = (content: string) => {
        setDescription(content);
    };

    const handleResponsibility = (content: string) => {
        setResponsibility(content);
    };

    const handleBenefit = (content: string) => {
        setBenefit(content);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleRequirements = (value: string) => {
        setRequirements(value);
    };
    return (
        <div className="container mx-auto">
            <div className="border-b">
                <h1 className="text-2xl font-bold mb-3 ">Post a job</h1>
            </div>
            <form
                action={(formData) => {
                    formData.set('description', description);
                    formData.set('responsibilities', responsibilities);
                    formData.set('benefit', benefit);
                    formData.set('requirements', requirements);
                    selectedTags.forEach((tagId) => {
                        formData.append('tags[]', tagId);
                    });
                    jobSpecializations.forEach((specializations) => {
                        formData.append('specializations[]', specializations);
                    });
                    return onSubmit(formData);
                }}
                className="space-y-4 bg-white pt-3"
            >
                <div className="flex flex-col gap-y-2">
                    <div className="text-base font-medium">
                        <h1>
                            Job Title <span className="text-red-500">*</span>
                        </h1>
                    </div>
                    <Input
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.title
                                ? 'border-2 border-danger ring-danger'
                                : ' focus-visible:border-primary focus-visible:ring-primary'
                        )}
                        defaultValue={state.title}
                        name="title"
                    />
                    <p className=" text-red-500 text-[12px] font-medium ">
                        {state.errors?.title && state.errors.title[0]}
                    </p>
                </div>

                <div className="flex flex-col gap-y-2">
                    <h1 className="text-base font-medium">Tag</h1>
                    <div className="flex flex-grow gap-x-2">
                        <MultiSelectSearchInput
                            onChange={(newTagIds: string[]) => setSelectedTags(newTagIds)}
                            error={state.errors?.tags}
                        />

                        <div className="flex-grow basis-1/3 max-w-[30%]">
                            <DialogAddTag refetch={refetch} />
                        </div>
                    </div>
                    <p className=" text-red-500 text-[12px] font-medium ">
                        {state.errors?.tags && state.errors.tags[0]}
                    </p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-base font-medium">
                        Address <span className="text-red-500">*</span>
                    </h1>
                    <Select name="address">
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                state.errors?.address
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select an address..." />
                        </SelectTrigger>
                        <SelectContent>
                            {resultQuery?.temp?.length === 0 ? (
                                <SelectItem value="no-address" disabled>
                                    No addresses available
                                </SelectItem>
                            ) : (
                                resultQuery?.temp?.map((temp) => (
                                    <SelectItem key={temp.addressId} value={temp.addressId}>
                                        {temp.country} - {temp.city}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>

                    <p className=" text-red-500 text-[12px] font-medium ">
                        {state.errors?.address && state.errors.address[0]}
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
                        Salary
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Min Salary</h1>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>

                                <Input
                                    className={clsx(
                                        'h-12 rounded-sm pl-10',
                                        state.errors?.minSalary
                                            ? 'border-2 border-danger ring-danger'
                                            : 'focus-visible:border-primary focus-visible:ring-primary'
                                    )}
                                    type="number"
                                    defaultValue={state.minSalary}
                                    name="minSalary"
                                />
                            </div>

                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.minSalary && state.errors.minSalary[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Max Salary</h1>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>

                                <Input
                                    className={clsx(
                                        'h-12 rounded-sm pl-10',
                                        state.errors?.maxSalary
                                            ? 'border-2 border-danger ring-danger'
                                            : 'focus-visible:border-primary focus-visible:ring-primary'
                                    )}
                                    type="number"
                                    defaultValue={state.maxSalary}
                                    name="maxSalary"
                                />
                            </div>

                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.maxSalary && state.errors.maxSalary[0]}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-gray-500" />
                        Advanced Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Education</h1>
                            <Select name="education">
                                <SelectTrigger
                                    className={clsx(
                                        'h-12 text-base rounded-sm',
                                        state.errors?.education
                                            ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                            : 'focus:border-primary focus:ring-primary'
                                    )}
                                >
                                    <SelectValue placeholder="Select..." className="text-[#767F8C]" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(EducationJobLevelEnum).map((educationType) => (
                                        <SelectItem key={educationType} value={educationType}>
                                            {educationType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.education && state.errors.education[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Experience (Year)</h1>
                            <Input
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.experience
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                                type="number"
                                defaultValue={state.experience}
                                name="experience"
                            />
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.experience && state.errors.experience[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Job Type</h1>
                            <Select name="jobType">
                                <SelectTrigger
                                    className={clsx(
                                        'h-12 text-base rounded-sm',
                                        state.errors?.jobType
                                            ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                            : 'focus:border-primary focus:ring-primary'
                                    )}
                                >
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(JobTypeEnum).map((jobType) => (
                                        <SelectItem key={jobType} value={jobType}>
                                            {jobType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.jobType && state.errors.jobType[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Expiration Date</h1>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className={clsx(
                                        'h-12 rounded-sm',
                                        state.errors?.expirationDate
                                            ? 'border-2 border-danger ring-danger'
                                            : 'focus-visible:border-primary focus-visible:ring-primary'
                                    )}
                                    name="expirationDate"
                                    defaultValue={state.expirationDate}
                                />
                            </div>
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.expirationDate && state.errors.expirationDate[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Job Category</h1>
                            <Select name="category" onValueChange={handleCategoryChange}>
                                <SelectTrigger
                                    className={clsx(
                                        'h-12 text-base rounded-sm',
                                        state.errors?.category
                                            ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                            : 'focus:border-primary focus:ring-primary'
                                    )}
                                >
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {resultQuery?.payload?.data.map((categories) => (
                                        <SelectItem key={categories.categoryId} value={categories.categoryId}>
                                            {categories?.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.category && state.errors.category[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Job Specialization</h1>
                            <MultiSelectCategoriesChildSearchInput
                                categoryId={selectedCategory}
                                onChange={(newTagIds: string[]) => setJobSpecializations(newTagIds)}
                                error={state.errors?.specializations}
                            />
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.specializations && state.errors.specializations[0]}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-gray-500" />
                        Description & Responsibility
                    </h2>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Description</h1>
                            <div className="focus-visible:border-primary focus-visible:ring-primary">
                                <RichTextEditor
                                    onChange={handleDescription}
                                    initialContent={description}
                                    hasError={!!state.errors?.description}
                                />
                                <p className=" text-red-500 text-[12px] font-medium ">
                                    {state.errors?.description && state.errors.description[0]}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-base font-medium">Responsibilities</h1>
                            <div className="focus-visible:border-primary focus-visible:ring-primary">
                                <RichTextEditor
                                    onChange={handleResponsibility}
                                    initialContent={responsibilities}
                                    hasError={!!state.errors?.responsibilities}
                                />
                            </div>
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.responsibilities && state.errors.responsibilities[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-lg font-semibold flex items-center">
                                <Gift className="mr-2 h-5 w-5 text-gray-500" />
                                Benefits
                            </h1>
                            <div className="focus-visible:border-primary focus-visible:ring-primary">
                                <RichTextEditor
                                    onChange={handleBenefit}
                                    initialContent={benefit}
                                    hasError={!!state.errors?.benefit}
                                />
                            </div>
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.benefit && state.errors.benefit[0]}
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-lg font-semibold flex items-center">
                                <ListChecks className="mr-2 h-5 w-5 text-gray-500" />
                                Requirements
                            </h1>
                            <div className="focus-visible:border-primary focus-visible:ring-primary">
                                <RichTextEditor
                                    onChange={handleRequirements}
                                    initialContent={requirements}
                                    hasError={!!state.errors?.requirements}
                                />
                            </div>
                            <p className=" text-red-500 text-[12px] font-medium ">
                                {state.errors?.requirements && state.errors.requirements[0]}
                            </p>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="group w-full md:w-auto">
                    Post Job <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
                </Button>
            </form>
        </div>
    );
}
