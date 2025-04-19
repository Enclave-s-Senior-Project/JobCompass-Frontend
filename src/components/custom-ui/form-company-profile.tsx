'use client';

import React, { useEffect, useState, useContext, FormEvent, ChangeEvent } from 'react';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import { settingAddressEmployer, settingEmployerProfile } from '@/lib/action';
import { EnterpriseContext } from '@/contexts';
import { toast } from '@/lib/toast';
import { Edit, XCircle } from 'lucide-react';
import { handleErrorToast } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { languagesData } from '@/lib/data/languages.data';

type CompanyProfileType = {
    logoFile: File | null;
    backgroundFile: File | null;
    logoUrl: string;
    backgroundImageUrl: string;
    name: string;
    phone: string;
    description: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
};

type FormErrors = {
    logoFile: (string | null)[];
    backgroundFile: (string | null)[];
    name: (string | null)[];
    phone: (string | null)[];
    description: (string | null)[];
    country: (string | null)[];
    city: (string | null)[];
    street: (string | null)[];
    zipCode: (string | null)[];
};

const localCountries = Object.entries(languagesData).map(([key]) => key);

export function FormCompanyProfile() {
    const { enterpriseInfo, refetchEnterpriseInfo } = useContext(EnterpriseContext);
    const [editable, setEditable] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({
        logoFile: [],
        backgroundFile: [],
        name: [],
        phone: [],
        description: [],
        country: [],
        city: [],
        street: [],
        zipCode: [],
    });
    const [formValue, setFormValue] = useState<CompanyProfileType>({
        logoFile: null,
        backgroundFile: null,
        logoUrl: enterpriseInfo?.logoUrl ?? '',
        backgroundImageUrl: enterpriseInfo?.backgroundImageUrl ?? '',
        name: enterpriseInfo?.name ?? '',
        phone: enterpriseInfo?.phone ?? '',
        description: enterpriseInfo?.description ?? '',
        country: enterpriseInfo?.addresses?.[0]?.country ?? '',
        city: enterpriseInfo?.addresses?.[0]?.city ?? '',
        street: enterpriseInfo?.addresses?.[0]?.street ?? '',
        zipCode: enterpriseInfo?.addresses?.[0]?.zipCode?.toString() ?? '',
    });
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        async function fetchData() {
            refetchEnterpriseInfo();
            setFormValue({
                logoFile: null,
                backgroundFile: null,
                logoUrl: enterpriseInfo?.logoUrl ?? '',
                backgroundImageUrl: enterpriseInfo?.backgroundImageUrl ?? '',
                name: enterpriseInfo?.name ?? '',
                phone: enterpriseInfo?.phone ?? '',
                description: enterpriseInfo?.description ?? '',
                country: enterpriseInfo?.addresses?.[0]?.country ?? '',
                city: enterpriseInfo?.addresses?.[0]?.city ?? '',
                street: enterpriseInfo?.addresses?.[0]?.street ?? '',
                zipCode: enterpriseInfo?.addresses?.[0]?.zipCode?.toString() ?? '',
            });
        }
        fetchData();
    }, [enterpriseInfo]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setCanSubmit(
                JSON.stringify(formValue) !==
                    JSON.stringify({
                        logoFile: null,
                        backgroundFile: null,
                        logoUrl: enterpriseInfo?.logoUrl ?? '',
                        backgroundImageUrl: enterpriseInfo?.backgroundImageUrl ?? '',
                        name: enterpriseInfo?.name ?? '',
                        phone: enterpriseInfo?.phone ?? '',
                        description: enterpriseInfo?.description ?? '',
                    })
            );
        }, 300);

        return () => clearTimeout(handler);
    }, [formValue, enterpriseInfo]);

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        let newValue: string | File | null = value;

        if (type === 'file') {
            newValue = files?.[0] || null;
        }

        setFormValue((prev) => ({ ...prev, [name]: newValue }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            if (name === 'name' && !newValue) {
                newErrors.name = ['Company name is required'];
            } else if (name === 'phone') {
                if (!newValue) {
                    newErrors.phone = ['Phone number is required'];
                } else if (typeof newValue === 'string' && !/^\+?\d{7,15}$/.test(newValue)) {
                    newErrors.phone = ['Invalid phone number format'];
                } else {
                    newErrors.phone = [];
                }
            } else if (name === 'description' && !newValue) {
                newErrors.description = ['Description is required'];
            } else {
                newErrors[name as keyof FormErrors] = [];
            }

            return newErrors;
        });
    };

    const handleChangeRichEditor = (value: string, nameInput?: string) => {
        if (nameInput) setFormValue((prev) => ({ ...prev, [nameInput]: value }));
    };

    const handleToggleEditable = () => {
        setEditable((prev) => !prev);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        const apiCalls = [];

        if (formValue.city || formValue.country || formValue.street || formValue.zipCode) {
            apiCalls.push(
                settingAddressEmployer({
                    city: formValue.city,
                    country: formValue.country,
                    street: formValue.street,
                    zipCode: formValue.zipCode.toString(),
                })
            );
        }

        const formData = new FormData();
        formData.append('name', formValue.name);
        formData.append('description', formValue.description);
        formData.append('phone', formValue.phone);
        formData.append('enterpriseId', enterpriseInfo?.enterpriseId || '');
        if (formValue.logoFile instanceof File) {
            formData.append('logoFile', formValue.logoFile);
        } else {
            formData.append('logoUrl', formValue.logoUrl);
        }
        if (formValue.backgroundFile instanceof File) {
            formData.append('backgroundFile', formValue.backgroundFile);
        } else {
            formData.append('backgroundImageUrl', formValue.backgroundImageUrl);
        }

        apiCalls.push(settingEmployerProfile(formData));

        try {
            const [addressResponse, profileResponse] = await Promise.all(apiCalls);

            if ((addressResponse && !addressResponse.success) || (profileResponse && !profileResponse.success)) {
                const errorMsg =
                    (addressResponse &&
                        addressResponse.errors &&
                        Object.values(addressResponse.errors).flat().join('. ')) ||
                    (profileResponse &&
                        profileResponse.errors &&
                        Object.values(profileResponse.errors).flat().join('. ')) ||
                    'Unknown error';

                toast.error(errorMsg);
                setCanSubmit(false);
                return;
            }
            refetchEnterpriseInfo();
            toast.success('Profile updated successfully');
            setCanSubmit(false);
            setEditable(false);
        } catch (error) {
            handleErrorToast(error);
        } finally {
            setIsPending(false);
        }
    };

    const handleCountryChange = (value: string) => {
        setFormValue((prev) => ({ ...prev, country: value, city: '', street: '', zipCode: '' }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (!value) {
                newErrors.country = ['Country is required'];
            } else {
                newErrors.country = [];
            }
            return newErrors;
        });
    };

    const handleChangeCity = (value: string) => {
        setFormValue((prev) => ({ ...prev, city: value, street: '', zipCode: '' }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (!value) {
                newErrors.city = ['City is required'];
            } else {
                newErrors.city = [];
            }
            return newErrors;
        });
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium text-gray-900">Logo & Banner Image</h5>
                <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className={clsx('text-sm', editable ? 'border-red-100 text-red-500 hover:border-red-500' : '')}
                    onClick={handleToggleEditable}
                >
                    {editable ? <XCircle /> : <Edit />}
                    {editable ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <div className="space-y-4">
                <div className="flex select-none items-center gap-4">
                    <div className="w-24 md:w-40 lg:w-60">
                        <label className="cursor-default text-sm text-gray-900">Profile Picture</label>
                        <ImageInput
                            disabled={!editable}
                            name="logoFile"
                            value={formValue.logoUrl}
                            isAvatar={true}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="cursor-default text-sm text-gray-900">Background Picture</label>
                        <ImageInput
                            disabled={!editable}
                            name="backgroundFile"
                            value={formValue.backgroundImageUrl}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                </div>
                <div className="grid select-none grid-cols-4 gap-4">
                    <div className="relative col-span-2 lg:col-span-2">
                        <label className="cursor-default text-sm text-gray-900">Company Name</label>
                        <Input
                            disabled={!editable}
                            name="name"
                            placeholder="Company Name"
                            type="text"
                            value={formValue.name}
                            onChange={handleChangeInputValue}
                            className={clsx(
                                'h-12 rounded-sm',
                                errors?.name?.length > 0
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {errors?.name?.length > 0 && errors.name[0]}
                        </p>
                    </div>
                    <div className="relative col-span-2 lg:col-span-2">
                        <label className="cursor-default text-sm text-gray-900">Phone</label>
                        <Input
                            disabled={!editable}
                            name="phone"
                            placeholder="+1233456789"
                            type="text"
                            value={formValue.phone}
                            onChange={handleChangeInputValue}
                            className={clsx(
                                'h-12 rounded-sm',
                                errors?.phone?.length > 0
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {errors?.phone?.length > 0 && errors.phone[0]}
                        </p>
                    </div>
                    <div className="col-span-4">
                        <label className="cursor-default text-sm text-gray-900">Address</label>
                        <div className="mt-2 grid grid-cols-4 gap-4">
                            <div>
                                <Select
                                    name="country"
                                    disabled={!editable}
                                    value={formValue.country}
                                    onValueChange={handleCountryChange}
                                >
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
                                    {errors?.country?.length > 0 && errors.country[0]}
                                </p>
                            </div>
                            <div>
                                <Select
                                    name="city"
                                    value={formValue.city}
                                    onValueChange={handleChangeCity}
                                    disabled={!editable}
                                >
                                    <SelectTrigger className="h-12 rounded-sm border border-primary-100 text-base focus:border-primary focus:ring-1 focus:ring-primary">
                                        <SelectValue placeholder="Select a city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languagesData[formValue.country] &&
                                            Object.entries(languagesData[formValue.country].cities).map(
                                                ([index, city]) => (
                                                    <SelectItem key={index} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                )
                                            )}
                                    </SelectContent>
                                </Select>
                                <p className="min-h-5 text-xs text-red-500">
                                    {errors?.city?.length > 0 && errors.city[0]}
                                </p>
                            </div>
                            <div>
                                <Input
                                    disabled={!editable}
                                    name="street"
                                    placeholder="Street"
                                    type="text"
                                    value={formValue.street}
                                    onChange={handleChangeInputValue}
                                    className={clsx(
                                        'h-12 rounded-sm',
                                        errors?.street?.length > 0
                                            ? 'border-2 border-danger ring-danger'
                                            : 'focus-visible:border-primary focus-visible:ring-primary'
                                    )}
                                />
                                <p className="min-h-5 text-xs text-red-500">
                                    {errors?.street?.length > 0 && errors.street[0]}
                                </p>
                            </div>
                            <div>
                                <Input
                                    disabled={!editable}
                                    name="zipCode"
                                    placeholder="Zip Code"
                                    type="text"
                                    value={formValue.zipCode}
                                    onChange={handleChangeInputValue}
                                    className={clsx(
                                        'h-12 rounded-sm',
                                        errors?.zipCode?.length > 0
                                            ? 'border-2 border-danger ring-danger'
                                            : 'focus-visible:border-primary focus-visible:ring-primary'
                                    )}
                                />
                                <p className="min-h-5 text-xs text-red-500">
                                    {errors?.zipCode?.length > 0 && errors.zipCode[0]}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <label className="cursor-default text-sm text-gray-900">About Us</label>
                        <RichTextEditor
                            disabled={!editable}
                            name="description"
                            value={formValue.description}
                            onChange={handleChangeRichEditor}
                            placement="inside-bottom"
                            className="rounded-sm px-3 shadow-sm"
                        />
                    </div>
                </div>
            </div>
            {editable && (
                <div>
                    <Button size="xl" isPending={isPending} disabled={!canSubmit}>
                        Save Changes
                    </Button>
                </div>
            )}
        </form>
    );
}
