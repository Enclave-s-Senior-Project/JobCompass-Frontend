'use client';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { updateRegisterEnterprise } from '@/lib/action';
import { toast } from '@/lib/toast';
import { successKeyMessage } from '@/lib/message-keys';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import RichTextEditor from './rich-text-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '../ui/select';
import { Categories, Enterprise } from '@/types';
import { EnterpriseService } from '@/services/enterprises.service';
import MultiSelectCategoriesSearchInput from './select-categories';
import { languagesData } from '@/lib/data/languages.data';

const localCountries = Object.entries(languagesData).map(([key]) => key);
export function FormUpdateRegisterEnterprises(props: {
    setOpen: (value: boolean) => void;
    enterprises: Enterprise | null;
}) {
    const { setOpen, enterprises } = props;
    const [enterprise, setEnterprise] = useState<Enterprise | null>(enterprises);
    const [checkLogo, setCheckLogo] = useState(false);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [state, onSubmit, isPending] = useActionState(updateRegisterEnterprise, {
        id: enterprise?.enterpriseId,
        logo: enterprise?.logoUrl || '',
        logoUrl: enterprise?.logoUrl || '',
        name: enterprise?.name,
        phone: enterprise?.phone,
        email: enterprise?.email,
        vision: enterprise?.companyVision,
        size: enterprise?.teamSize,
        foundedIn: enterprise?.foundedIn,
        organizationType: enterprise?.organizationType,
        categories: enterprise?.categories,
        bio: enterprise?.bio,
        enterpriseBenefits: enterprise?.benefit,
        description: enterprise?.description,
        errors: {},
        success: false,
    });
    const [country, setCountry] = useState(state.country);
    const [city, setCity] = useState(state.city);
    const [street, setStreet] = useState(state.street);
    const [zipCode, setZipCode] = useState(state.zipCode);
    const [enterpriseBenefits, setEnterpriseBenefits] = useState(state.enterpriseBenefits);
    const [description, setDescription] = useState(state.description);
    const fetchEnterpriseData = async () => {
        const updatedEnterprise = await EnterpriseService.checkEnterprise();
        if (updatedEnterprise?.value) {
            const fetchedCategories = updatedEnterprise.value.categories || [];
            setCategories(fetchedCategories);
            setEnterprise(updatedEnterprise.value);
            setCountry(updatedEnterprise?.value?.addresses?.[0].country);
            setCity(updatedEnterprise?.value?.addresses?.[0].city);
            setStreet(updatedEnterprise?.value?.addresses?.[0].street);
            setZipCode(updatedEnterprise?.value?.addresses?.[0].zipCode);
        }
    };

    useEffect(() => {
        fetchEnterpriseData();
    }, []);

    useEffect(() => {
        if (state.errors?.logo) {
            setCheckLogo(true);
        } else {
            setCheckLogo(false);
        }
        if (state.success) {
            fetchEnterpriseData();
            toast.success(successKeyMessage.UPDATE_REGISTER_ENTERPRISE_SUCCESSFUL);
            setOpen(false);
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
            <div className="flex flex-row gap-7">
                <div className="w-24 md:w-40 lg:w-60">
                    <label className="cursor-default text-sm text-gray-900">Profile Picture</label>
                    <ImageInput name="logo" initImage={state.logo} isAvatar={true} isError={checkLogo} />
                    <p className="text-[12px] font-medium text-red-500">
                        {Array.isArray(state.errors?.logo) ? state.errors.logo[0] : state.errors?.logo}
                    </p>
                </div>
                <div className="space-y-5">
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
                    <div className="relative col-span-1 flex flex-row gap-3">
                        <div className="w-1/2">
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
                        <div className="w-1/2">
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
                            <Select name="size" defaultValue={state.size}>
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
                        <Select name="country" value={country} disabled>
                            <SelectTrigger className="h-12 rounded-sm border text-base focus:border-primary focus:ring-1 focus:ring-primary">
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
                        <Select name="city" value={city} disabled>
                            <SelectTrigger className="h-12 rounded-sm border text-base focus:border-primary focus:ring-1 focus:ring-primary">
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
                            disabled
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
                            disabled
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
                    <Select name="organizationType" defaultValue={state.organizationType}>
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
                            <SelectGroup>
                                <SelectItem value="FLAT">Flat</SelectItem>
                                <SelectItem value="PRIVATE">Private</SelectItem>
                                <SelectItem value="PUBLIC">Public</SelectItem>
                                <SelectItem value="OUTSOURCE">Out source</SelectItem>
                            </SelectGroup>
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
                        defaultValue={categories || []}
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
                    type="reset"
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
                    Update
                    <ChevronRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-2" />
                </Button>
            </div>
        </form>
    );
}
