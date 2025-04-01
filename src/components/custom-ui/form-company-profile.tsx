'use client';

import React, { useEffect, useState, useContext, FormEvent, ChangeEvent } from 'react';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import { settingEmployerProfile } from '@/lib/action';
import { EnterpriseContext } from '@/contexts';
import { toast } from '@/lib/toast';

type CompanyProfileType = {
    logoFile: File | null;
    backgroundFile: File | null;
    logoUrl: string;
    backgroundImageUrl: string;
    name: string;
    phone: string;
    description: string;
};

type FormErrors = {
    logoFile: (string | null)[];
    backgroundFile: (string | null)[];
    name: (string | null)[];
    phone: (string | null)[];
    description: (string | null)[];
};

export function FormCompanyProfile() {
    const { enterpriseInfo, refetchEnterpriseInfo } = useContext(EnterpriseContext);
    const [canSubmit, setCanSubmit] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({
        logoFile: [],
        backgroundFile: [],
        name: [],
        phone: [],
        description: [],
    });
    const [formValue, setFormValue] = useState<CompanyProfileType>({
        logoFile: null,
        backgroundFile: null,
        logoUrl: enterpriseInfo?.logoUrl ?? '',
        backgroundImageUrl: enterpriseInfo?.backgroundImageUrl ?? '',
        name: enterpriseInfo?.name ?? '',
        phone: enterpriseInfo?.phone ?? '',
        description: enterpriseInfo?.description ?? '',
    });
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await refetchEnterpriseInfo();
            setFormValue({
                logoFile: null,
                backgroundFile: null,
                logoUrl: enterpriseInfo?.logoUrl ?? '',
                backgroundImageUrl: enterpriseInfo?.backgroundImageUrl ?? '',
                name: enterpriseInfo?.name ?? '',
                phone: enterpriseInfo?.phone ?? '',
                description: enterpriseInfo?.description ?? '',
            });
        }
        fetchData();
    }, [refetchEnterpriseInfo, enterpriseInfo]);

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsPending(true);

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

        try {
            await settingEmployerProfile(formData);
            refetchEnterpriseInfo();
            toast.success('Profile updated successfully');
            setCanSubmit(false);
        } catch (error) {
            console.error('Failed to save profile:', error);
            toast.error('Oops! Something went wrong');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="flex items-center gap-4 select-none">
                    <div className="w-24 md:w-40 lg:w-60">
                        <label className="text-sm text-gray-900 cursor-default">Profile Picture</label>
                        <ImageInput
                            name="logoFile"
                            value={formValue.logoUrl}
                            isAvatar={true}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-900 cursor-default">Background Picture</label>
                        <ImageInput
                            name="backgroundFile"
                            value={formValue.backgroundImageUrl}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 select-none">
                    <div className="relative col-span-2 lg:col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Company Name</label>
                        <Input
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
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {errors?.name?.length > 0 && errors.name[0]}
                        </p>
                    </div>
                    <div className="relative col-span-2 lg:col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Phone</label>
                        <Input
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
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {errors?.phone?.length > 0 && errors.phone[0]}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm text-gray-900 cursor-default">About Us</label>
                        <RichTextEditor
                            name="description"
                            value={formValue.description}
                            onChange={handleChangeRichEditor}
                            placement="inside-bottom"
                            className="px-3 rounded-sm shadow-sm"
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button size="xl" isPending={isPending} disabled={!canSubmit}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
