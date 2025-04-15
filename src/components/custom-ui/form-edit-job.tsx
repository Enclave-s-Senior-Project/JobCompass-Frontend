'use client';

import clsx from 'clsx';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DialogAddTag } from './dialog-add-tag';
import MultiSelectSearchInput from './selected-tags';
import RichTextEditor from './rich-text-editor';
import { Button } from '../ui/button';
import { LuArrowRight } from 'react-icons/lu';
import { useActionState, useContext, useEffect, useState } from 'react';
import { updateJob } from '@/lib/action';
import { Categories, Category, Job, Tag } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { CategoryService } from '@/services/categories.service';
import { AddressService } from '@/services/address.service';
import { handleErrorToast } from '@/lib/utils';
import { successKeyMessage } from '@/lib/message-keys';
import MultiSelectCategoriesChildSearchInput from './select-categories-child';
import { JobService } from '@/services/job.service';
import { UserContext } from '@/contexts';
import { toast } from '@/lib/toast';

export function EditJob(props: {
    id: string;
    onSuccess?: () => void;
    refetchJob: () => void;
    refetchDetailJob: () => void;
    onCloseDialog: () => void;
}) {
    const { id, onSuccess, refetchJob, refetchDetailJob, onCloseDialog } = props;
    const [job, setJob] = useState<Job | null>(null);
    const { userInfo } = useContext(UserContext);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [state, onSubmit] = useActionState(updateJob, {
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
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibility] = useState('');
    const [benefit, setBenefit] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [requirements, setRequirements] = useState('');
    const [jobSpecializations, setJobSpecializations] = useState<string[]>([]);

    const {
        data: resultQuery,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: [queryKey.listCategory, id],
        queryFn: async () => {
            try {
                const job = await JobService.detailJob(id, { userId: userInfo?.profileId ?? '' });
                const payload = await CategoryService.getPrimaryCategories({});
                const temp = await AddressService.getAllAddressByEnterprise();
                return { job, payload, temp };
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
        if (resultQuery?.job) {
            const fetchedJob = resultQuery.job;
            setJob(fetchedJob);
            setDescription(fetchedJob.description || '');
            setResponsibility(fetchedJob.responsibility || '');
            setBenefit(fetchedJob.enterpriseBenefits || '');
            setSelectedTags(fetchedJob.tags?.map((tag: Tag) => tag.tagId) || []);
            setRequirements(fetchedJob.requirements);
        }
    }, [resultQuery]);

    useEffect(() => {
        if (state.success) {
            toast.success(successKeyMessage.POST_JOB_SUCCESSFUL);
            onCloseDialog();
            refetchJob();
            refetchDetailJob();
        }
    }, [state.success, onSuccess]);
    const handleDescription = (content: string) => setDescription(content);
    const handleResponsibility = (content: string) => setResponsibility(content);
    const handleBenefit = (content: string) => setBenefit(content);
    const handleCategoryChange = (value: string) => setSelectedCategory(value);
    const handleRequirements = (content: string) => setRequirements(content);

    if (isLoading || !job) {
        return <div>Loading job data...</div>;
    }

    return (
        <form
            action={(formData) => {
                formData.set('description', description);
                formData.set('responsibilities', responsibilities);
                formData.set('benefit', benefit);
                selectedTags.forEach((tagId) => formData.append('tags[]', tagId));
                jobSpecializations.forEach((specialization) => formData.append('specializations[]', specialization));
                formData.set('jobId', id);
                formData.set('requirements', requirements);
                return onSubmit(formData);
            }}
            className="space-y-4 bg-white"
        >
            <div className="flex flex-col gap-y-2">
                <h1>Job Title</h1>
                <Input
                    className={clsx(
                        'h-12 rounded-sm',
                        state.errors?.title
                            ? 'border-2 border-danger ring-danger'
                            : 'focus-visible:border-primary focus-visible:ring-primary'
                    )}
                    defaultValue={job.name}
                    name="title"
                />
                <p className="text-red-500 text-[12px] font-medium">{state.errors?.title?.[0]}</p>
            </div>

            <div className="flex flex-col gap-y-2">
                <h1>Tag</h1>
                <div className="flex flex-grow gap-x-2">
                    <MultiSelectSearchInput
                        onChange={(newTagIds: string[]) => setSelectedTags(newTagIds)}
                        error={state.errors?.tags}
                        defaultValue={job.tags as Tag[]}
                    />
                    <div className="flex-grow basis-1/3 max-w-[30%]">
                        <DialogAddTag refetch={refetch} />
                    </div>
                </div>
                <p className="text-red-500 text-[12px] font-medium">{state.errors?.tags?.[0]}</p>
            </div>

            <div className="flex flex-col gap-y-2">
                <h1>Address</h1>
                <Select name="address" defaultValue={job.addresses?.[0]?.addressId}>
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
                <p className="text-red-500 text-[12px] font-medium">{state.errors?.address?.[0]}</p>
            </div>

            <div>
                <h2 className="text-lg font-bold mt-8 mb-4">Salary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-2">
                        <h1>Min Salary</h1>
                        <Input
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.minSalary
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                            type="number"
                            defaultValue={job.lowestWage}
                            name="minSalary"
                        />
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.minSalary?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Max Salary</h1>
                        <Input
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.maxSalary
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                            type="number"
                            defaultValue={job.highestWage}
                            name="maxSalary"
                        />
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.maxSalary?.[0]}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold mt-8 mb-4">Advance Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-y-2">
                        <h1>Education</h1>
                        <Select name="education" defaultValue={job.education}>
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
                                <SelectItem value="bachelor">Bachelors Degree</SelectItem>
                                <SelectItem value="master">Masters Degree</SelectItem>
                                <SelectItem value="phd">Ph.D.</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.education?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Experience (Year)</h1>
                        <Input
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.experience
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                            type="number"
                            defaultValue={job.experience} // Giả sử job có trường experience
                            name="experience"
                        />
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.experience?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Job Type</h1>
                        <Select name="jobType" defaultValue={job.type}>
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
                                <SelectItem value="Full Time">Full Time</SelectItem>
                                <SelectItem value="Part Time">Part Time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.jobType?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Expiration Date</h1>
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
                                defaultValue={job.deadline}
                            />
                        </div>
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.expirationDate?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Job Category</h1>
                        <Select
                            name="category"
                            onValueChange={handleCategoryChange}
                            defaultValue={job?.categories?.[0]?.categoryId}
                        >
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
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.category?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Job Specialization</h1>
                        <MultiSelectCategoriesChildSearchInput
                            categoryId={selectedCategory}
                            onChange={(newTagIds: string[]) => setJobSpecializations(newTagIds)}
                            error={state.errors?.specializations}
                            defaultValue={job?.specializations as Categories[]}
                        />
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.specializations?.[0]}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold mt-8 mb-4">Description & Responsibility</h2>
                <div className="space-y-6">
                    <div className="flex flex-col gap-y-2">
                        <h1>Description</h1>
                        <div className="focus-visible:border-primary focus-visible:ring-primary">
                            <RichTextEditor
                                onChange={handleDescription}
                                initialContent={description}
                                hasError={!!state.errors?.description}
                            />
                            <p className="text-red-500 text-[12px] font-medium">{state.errors?.description?.[0]}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <h1>Responsibilities</h1>
                        <div className="focus-visible:border-primary focus-visible:ring-primary">
                            <RichTextEditor
                                onChange={handleResponsibility}
                                initialContent={responsibilities}
                                hasError={!!state.errors?.responsibilities}
                            />
                        </div>
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.responsibilities?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Benefit</h1>
                        <div className="focus-visible:border-primary focus-visible:ring-primary">
                            <RichTextEditor
                                onChange={handleBenefit}
                                initialContent={benefit}
                                hasError={!!state.errors?.benefit}
                            />
                        </div>
                        <p className="text-red-500 text-[12px] font-medium">{state.errors?.benefit?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1>Requirements</h1>
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
            <div className="flex flex-row justify-between">
                <Button
                    type="button"
                    className="group w-full md:w-auto"
                    onClick={() => {
                        onCloseDialog();
                    }}
                >
                    Cancel
                </Button>
                <Button type="submit" className="group w-full md:w-auto">
                    Update Job <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
                </Button>
            </div>
        </form>
    );
}
