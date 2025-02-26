'use client';
import type React from 'react';
import { useActionState, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LuArrowRight } from 'react-icons/lu';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { postJob } from '@/lib/action';
import { Tag } from '@/types';
import MultiSelectSearchInput from '@/components/custom-ui/selected-tags';
import { DialogApplyJob } from '@/components/custom-ui/dialog-apply-job';
import { DialogAddTag } from '@/components/custom-ui/dialog-add-tag';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { CategoryService } from '@/services/categories.service';

export default function PostJobForm() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [state, onSubmit, isPending] = useActionState(postJob, {
        title: '',
        tags: [] as Tag[],
        minSalary: '',
        maxSalary: '',
        description: '',
        responsibilities: '',
    });
    const [description, setDescription] = useState(state.description);
    const [responsibilities, setResponsibility] = useState(state.responsibilities);
    const [categories, setCategories] = useState(state.categories);
    const {
        refetch,
        data: resultQuery,
        isLoading,
    } = useQuery({
        queryKey: [queryKey.listCategory],
        queryFn: async () => {
            try {
                const payload = await CategoryService.getAllCategories();
                return payload;
            } catch (error: any) {
                console.log(error);
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });
    const handleDescription = (content: string) => {
        setDescription(content);
    };
    const handleResponsibility = (content: string) => {
        setResponsibility(content);
    };

    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-2xl font-bold mb-6">Post a job</h1>
            <form
                action={(formData) => {
                    formData.set('description', description);
                    formData.set('responsibilities', responsibilities);
                    selectedTags.forEach((tagId) => {
                        console.log('Tag ID:', tagId);
                        formData.append('tags[]', tagId);
                    });
                    return onSubmit(formData);
                }}
                className="space-y-4 bg-white"
            >
                <div className="flex flex-col gap-y-2">
                    <h1>Job Title</h1>
                    <Input
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                        placeholder="Add job title, role, vacancies etc"
                        defaultValue={state.title}
                        name="title"
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <h1>Tag</h1>
                    <div className="flex flex-grow gap-x-2">
                        <MultiSelectSearchInput onChange={(newTagIds: string[]) => setSelectedTags(newTagIds)} />
                        <div className="flex-grow basis-1/3 max-w-[30%]">
                            <DialogAddTag nameJob="Senior UX Designer" />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold mt-8 mb-4">Salary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <h1>Min Salary</h1>
                            <Input
                                className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                                type="number"
                                placeholder="Minimum salary..."
                                defaultValue={state.minSalary}
                                name="minSalary"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Max Salary</h1>
                            <Input
                                className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                                type="number"
                                placeholder="Maximum salary..."
                                defaultValue={state.maxSalary}
                                name="maxSalary"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold mt-8 mb-4">Advance Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <h1>Education</h1>
                            <Select name="education">
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." className="text-[#767F8C]" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                                    <SelectItem value="master">Master's Degree</SelectItem>
                                    <SelectItem value="phd">Ph.D.</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Experience</h1>
                            <Input
                                className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                                type="number"
                                placeholder="Maximum salary..."
                                defaultValue={state.experience}
                                name="experience"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Job Type</h1>
                            <Select name="jobType">
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fulltime">Full Time</SelectItem>
                                    <SelectItem value="parttime">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Expiration Date</h1>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="pl-10 h-12 focus-visible:border-primary focus-visible:ring-primary"
                                    name="expirationDate"
                                    defaultValue={state.expirationDate}
                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Job Level</h1>
                            <Select name="jobLevel">
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="junior">Junior</SelectItem>
                                    <SelectItem value="mid">Mid-Level</SelectItem>
                                    <SelectItem value="senior">Senior</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Category</h1>
                            <Select
                                value={categories}
                                onValueChange={(value) => {
                                    setCategories(value);
                                    state.categories = value;
                                }}
                                name="category"
                            >
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {resultQuery?.map((categories) => (
                                        <SelectItem key={categories.categoryId} value={categories.categoryId}>
                                            {categories.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold mt-8 mb-4">Description & Responsibility</h2>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-y-2">
                            <h1>Description</h1>
                            <div className="focus-visible:border-primary focus-visible:ring-primary">
                                <RichTextEditor onChange={handleDescription} initialContent={description} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1>Responsibilities</h1>
                            <div className=" rounded-md">
                                <RichTextEditor onChange={handleResponsibility} initialContent={description} />
                            </div>
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
