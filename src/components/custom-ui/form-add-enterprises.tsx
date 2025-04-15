'use client';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { addEnterprises } from '@/lib/action';
import { toast } from '@/lib/toast';
import { successKeyMessage } from '@/lib/message-keys';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import RichTextEditor from './rich-text-editor';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import MultiSelectCategoriesSearchInput from './select-categories';
import { Categories, Category } from '@/types';

export function FormAddEnterprises({ setOpen, refetch }: { setOpen: (value: boolean) => void; refetch: () => void }) {
    const [checkLogo, setCheckLogo] = useState(false);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [state, onSubmit, isPending] = useActionState(addEnterprises, {
        logo: null,
        logoUrl: null,
        name: '',
        phone: '',
        email: '',
        vision: '',
        size: '',
        foundedIn: '',
        organizationType: '',
        bio: '',
        enterpriseBenefits: '',
        description: '',
        categories: [] as Category[],
        errors: {},
        success: false,
    });
    const [enterpriseBenefits, setEnterpriseBenefits] = useState(state.enterpriseBenefits);
    const [description, setDescription] = useState(state.description);
    useEffect(() => {
        if (state.errors?.logo) {
            setCheckLogo(true);
        } else {
            setCheckLogo(false);
        }
        if (state.success) {
            toast.success(successKeyMessage.REGISTER_ENTERPRISE_SUCCESSFUL);
            setOpen(false);
            refetch();
        }
    }, [state.success, state.errors]);

    const handleEnterpriseBenefits = (content: string) => {
        setEnterpriseBenefits(content);
    };
    const handleDescription = (content: string) => {
        setDescription(content);
    };

    return (
        <form
            className="space-y-6"
            action={(formData) => {
                formData.set('description', description);
                formData.set('enterpriseBenefits', enterpriseBenefits);
                categories.forEach((categories) => {
                    formData.append('categories[]', categories.categoryId);
                });
                return onSubmit(formData);
            }}
        >
            <div className="flex flex-col md:flex-row gap-7">
                <div className="w-full md:w-24 lg:w-40 xl:w-60">
                    <label className="text-sm text-gray-900 cursor-default">Profile Picture</label>
                    <div className="w-16 h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 xl:w-60 xl:h-60">
                        <ImageInput
                            name="logo"
                            initImage={state?.logoUrl?.fileUrl}
                            isAvatar={true}
                            isError={checkLogo}
                        />
                    </div>
                    <p className="text-red-500 text-[12px] font-medium pt-5">
                        {Array.isArray(state.errors?.logo) ? state.errors.logo[0] : state.errors?.logo}
                    </p>
                </div>
                <div className="flex-1 space-y-5">
                    <div className="relative col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Enterprise name</label>
                        <Input
                            defaultValue={state.name}
                            name="name"
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.name
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="text-red-500 text-[12px] font-medium">
                            {state.errors?.name && state.errors.name[0]}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full md:w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Phone number</label>
                            <Input
                                defaultValue={state.phone}
                                name="phone"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.phone
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.phone && state.errors.phone[0]}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Email</label>
                            <Input
                                defaultValue={state.email}
                                name="email"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.email
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.email && state.errors.email[0]}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 relative col-span-1">
                        <div className="w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Company vision</label>
                            <Input
                                defaultValue={state.vision}
                                name="vision"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.vision
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.vision && state.errors.vision[0]}
                            </p>
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Team size</label>
                            <Select name="size">
                                <SelectTrigger
                                    className={clsx(
                                        'h-12 text-base rounded-sm',
                                        state.errors?.size
                                            ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                            : 'focus:border-primary focus:ring-primary'
                                    )}
                                >
                                    <SelectValue placeholder="Select..." className="text-[#767F8C]" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1-10">1-10</SelectItem>
                                        <SelectItem value="11-50">11-50</SelectItem>
                                        <SelectItem value="51-200">51-200</SelectItem>
                                        <SelectItem value="200+">200+</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.size && state.errors.size[0]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-3 relative col-span-1">
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Founded in</label>
                    <Input
                        defaultValue={state.foundedIn}
                        type="date"
                        name="foundedIn"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.foundedIn
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="text-red-500 text-[12px] font-medium">
                        {state.errors?.foundedIn && state.errors.foundedIn[0]}
                    </p>
                </div>
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Organization type</label>
                    <Select name="organizationType">
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                state.errors?.organizationType
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." className="text-[#767F8C]" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="FLAT">Flat</SelectItem>
                            <SelectItem value="PRIVATE">Private</SelectItem>
                            <SelectItem value="PUBLIC">Public</SelectItem>
                            <SelectItem value="OUTSOURCE">Out source</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-red-500 text-[12px] font-medium">
                        {state.errors?.organizationType && state.errors.organizationType[0]}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-3 relative col-span-1">
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Bio </label>
                    <Input
                        defaultValue={state.bio}
                        name="bio"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.bio
                                ? 'border-2 border-danger ring-danger '
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="text-red-500 text-[12px] font-medium">{state.errors?.bio && state.errors.bio[0]}</p>
                </div>
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Category type</label>
                    <MultiSelectCategoriesSearchInput
                        onChange={(newTagIds: Categories[]) => setCategories(newTagIds)}
                        error={state.errors?.category}
                    />
                    <p className="text-red-500 text-[12px] font-medium">
                        {state.errors?.category && state.errors.category[0]}
                    </p>
                </div>
            </div>
            <div className="relative col-span-1">
                <label className="text-sm text-gray-900 cursor-default">Benefits</label>
                <RichTextEditor
                    onChange={handleEnterpriseBenefits}
                    initialContent={enterpriseBenefits}
                    hasError={!!state.errors?.enterpriseBenefits}
                />
                <p className=" text-red-500 text-[12px] font-medium ">
                    {state.errors?.enterpriseBenefits && state.errors.enterpriseBenefits[0]}
                </p>
            </div>
            <div className="relative col-span-1">
                <label className="text-sm text-gray-900 cursor-default">Description</label>
                <RichTextEditor
                    onChange={handleDescription}
                    initialContent={description}
                    hasError={!!state.errors?.description}
                />
                <p className=" text-red-500 text-[12px] font-medium ">
                    {state.errors?.description && state.errors.description[0]}
                </p>
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    className="w-[102px] h-[48px] text-[#0A65CC] bg-[#E7F0FA]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPending={isPending}
                    className="group w-[168px] h-[48px] bg-[#0A65CC] text-[#FFFFFF]"
                >
                    Register
                    <ChevronRight className="group-hover:translate-x-2 transition-all ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
