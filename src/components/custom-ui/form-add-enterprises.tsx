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
import { languagesData } from '@/lib/data/languages.data';

const localCountries = Object.entries(languagesData).map(([key]) => key);
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
        country: '',
        city: '',
        street: '',
        zipCode: '',
        categories: [] as Category[],
        errors: {},
        success: false,
    });
    const [enterpriseBenefits, setEnterpriseBenefits] = useState(state.enterpriseBenefits);
    const [description, setDescription] = useState(state.description);
    const [country, setCountry] = useState(state.country);
    const [city, setCity] = useState(state.city);
    const [street, setStreet] = useState(state.street);
    const [zipCode, setZipCode] = useState(state.zipCode);

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

    const handleCountryChange = (value: string) => {
        setCountry(value);
        setCity('');
        setStreet('');
        setZipCode('');
    };

    const handleCityChange = (values: string) => {
        setCity(values);
        setStreet('');
        setZipCode('');
    };

    return (
        <form
            className="space-y-6"
            action={(formData) => {
                formData.set('description', description);
                formData.set('enterpriseBenefits', enterpriseBenefits);
                formData.set('country', country);
                formData.set('city', city);
                formData.set('street', street);
                formData.set('zipCode', zipCode);
                categories.forEach((categories) => {
                    formData.append('categories[]', categories.categoryId);
                });
                return onSubmit(formData);
            }}
        >
            <div className="flex flex-col gap-7 md:flex-row">
                <div className="w-full md:w-24 lg:w-40 xl:w-60">
                    <label className="cursor-default text-sm text-gray-900">Profile Picture</label>
                    <div className="h-16 w-16 md:h-24 md:w-24 lg:h-40 lg:w-40 xl:h-60 xl:w-60">
                        <ImageInput
                            name="logo"
                            initImage={state?.logoUrl?.fileUrl}
                            isAvatar={true}
                            isError={checkLogo}
                        />
                    </div>
                    <p className="pt-5 text-[12px] font-medium text-red-500">
                        {Array.isArray(state.errors?.logo) ? state.errors.logo[0] : state.errors?.logo}
                    </p>
                </div>
                <div className="flex-1 space-y-5">
                    <div className="relative col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Enterprise name</label>
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
                        <p className="text-[12px] font-medium text-red-500">
                            {state.errors?.name && state.errors.name[0]}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="w-full md:w-1/2">
                            <label className="cursor-default text-sm text-gray-900">Phone number</label>
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
                            <p className="text-[12px] font-medium text-red-500">
                                {state.errors?.phone && state.errors.phone[0]}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <label className="cursor-default text-sm text-gray-900">Email</label>
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
                            <p className="text-[12px] font-medium text-red-500">
                                {state.errors?.email && state.errors.email[0]}
                            </p>
                        </div>
                    </div>
                    <div className="relative col-span-1 flex flex-row gap-3">
                        <div className="w-1/2">
                            <label className="cursor-default text-sm text-gray-900">Company vision</label>
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
                            <p className="text-[12px] font-medium text-red-500">
                                {state.errors?.vision && state.errors.vision[0]}
                            </p>
                        </div>
                        <div className="w-1/2">
                            <label className="cursor-default text-sm text-gray-900">Team size</label>
                            <Select name="size">
                                <SelectTrigger
                                    className={clsx(
                                        'h-12 rounded-sm text-base',
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
                            <p className="text-[12px] font-medium text-red-500">
                                {state.errors?.size && state.errors.size[0]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-4">
                <label className="cursor-default text-sm text-gray-900">Address</label>
                <div className="mt-2 grid grid-cols-4 gap-4">
                    <div>
                        <Select name="country" value={country} onValueChange={handleCountryChange}>
                            <SelectTrigger className="h-12 rounded-sm border border-primary-100 text-base focus:border-primary focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                {localCountries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="min-h-5 text-xs text-red-500">
                            {state.errors?.country && state.errors.country[0]}
                        </p>
                    </div>
                    <div>
                        <Select name="city" value={city} onValueChange={handleCityChange}>
                            <SelectTrigger className="h-12 rounded-sm border border-primary-100 text-base focus:border-primary focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                                {languagesData[country] &&
                                    Object.entries(languagesData[country].cities).map(([index, city]) => (
                                        <SelectItem key={index} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <p className="min-h-5 text-xs text-red-500">{state.errors?.city && state.errors.city[0]}</p>
                    </div>
                    <div>
                        <Input
                            name="street"
                            placeholder="Street"
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.street
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="min-h-5 text-xs text-red-500">{state.errors?.street && state.errors.street[0]}</p>
                    </div>
                    <div>
                        <Input
                            name="zipCode"
                            placeholder="Zip Code"
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.zipCode
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="min-h-5 text-xs text-red-500">
                            {state.errors?.zipCode && state.errors.zipCode[0]}
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative col-span-1 flex flex-row gap-3">
                <div className="w-1/2">
                    <label className="cursor-default text-sm text-gray-900">Founded in</label>
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
                    <p className="text-[12px] font-medium text-red-500">
                        {state.errors?.foundedIn && state.errors.foundedIn[0]}
                    </p>
                </div>
                <div className="w-1/2">
                    <label className="cursor-default text-sm text-gray-900">Organization type</label>
                    <Select name="organizationType">
                        <SelectTrigger
                            className={clsx(
                                'h-12 rounded-sm text-base',
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
                    <p className="text-[12px] font-medium text-red-500">
                        {state.errors?.organizationType && state.errors.organizationType[0]}
                    </p>
                </div>
            </div>
            <div className="relative col-span-1 flex flex-row gap-3">
                <div className="w-1/2">
                    <label className="cursor-default text-sm text-gray-900">Bio </label>
                    <Input
                        defaultValue={state.bio}
                        name="bio"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.bio
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="text-[12px] font-medium text-red-500">{state.errors?.bio && state.errors.bio[0]}</p>
                </div>
                <div className="w-1/2">
                    <label className="cursor-default text-sm text-gray-900">Category type</label>
                    <MultiSelectCategoriesSearchInput
                        onChange={(newTagIds: Categories[]) => setCategories(newTagIds)}
                        error={state.errors?.category}
                    />
                    <p className="text-[12px] font-medium text-red-500">
                        {state.errors?.category && state.errors.category[0]}
                    </p>
                </div>
            </div>
            <div className="relative col-span-1">
                <label className="cursor-default text-sm text-gray-900">Benefits</label>
                <RichTextEditor
                    onChange={handleEnterpriseBenefits}
                    initialContent={enterpriseBenefits}
                    hasError={!!state.errors?.enterpriseBenefits}
                />
                <p className="text-[12px] font-medium text-red-500">
                    {state.errors?.enterpriseBenefits && state.errors.enterpriseBenefits[0]}
                </p>
            </div>
            <div className="relative col-span-1">
                <label className="cursor-default text-sm text-gray-900">Description</label>
                <RichTextEditor
                    onChange={handleDescription}
                    initialContent={description}
                    hasError={!!state.errors?.description}
                />
                <p className="text-[12px] font-medium text-red-500">
                    {state.errors?.description && state.errors.description[0]}
                </p>
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    className="h-[48px] w-[102px] bg-[#E7F0FA] text-[#0A65CC]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPending={isPending}
                    className="group h-[48px] w-[168px] bg-[#0A65CC] text-[#FFFFFF]"
                >
                    Register
                    <ChevronRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-2" />
                </Button>
            </div>
        </form>
    );
}
