'use client';

import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import { settingEmployerProfile } from '@/lib/action';
import { EnterpriseContext } from '@/contexts';
import { toast } from 'sonner';
import { CompanyProfileForm, companyProfileSchema } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export function FormCompanyProfile() {
    const { enterpriseInfo, refetchEnterpriseInfo } = useContext(EnterpriseContext);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<CompanyProfileForm>({
        resolver: zodResolver(companyProfileSchema),
        defaultValues: {
            logoUrl: '',
            logoFile: null,
            backgroundFile: null,
            backgroundImageUrl: '',
            name: '',
            description: '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        async function fetchData() {
            await refetchEnterpriseInfo();
            if (enterpriseInfo) {
                setValue('logoUrl', enterpriseInfo.logoUrl || '');
                setValue('backgroundImageUrl', enterpriseInfo.backgroundImageUrl || '');
                setValue('name', enterpriseInfo.name || '');
                setValue('description', enterpriseInfo.description || '');
            }
            setLoading(false);
        }
        fetchData();
    }, [refetchEnterpriseInfo, setValue, enterpriseInfo]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('enterpriseId', enterpriseInfo?.enterpriseId || '');

        if (data.logoFile instanceof File) {
            formData.append('logoFile', data.logoFile);
        } else {
            formData.append('logoUrl', data.logoUrl);
        }

        if (data.backgroundFile instanceof File) {
            console.log('backgroundFile:', data.backgroundFile);
            formData.append('backgroundFile', data.backgroundFile);
        } else {
            formData.append('backgroundImageUrl', data.backgroundImageUrl);
        }

        console.log('Form Data:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            await settingEmployerProfile(formData);
            refetchEnterpriseInfo();
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to save profile:', error);
            toast.error('Failed to save profile');
        }
    };

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;

        if (e.target.type === 'file') {
            const file = e.target.files?.[0] || null;
            if (file) {
                setValue(name as keyof CompanyProfileForm, file, { shouldDirty: true, shouldValidate: true });
            } else {
                // If file is removed, reset corresponding URL and validation state
                setValue(name as keyof CompanyProfileForm, null, { shouldDirty: true, shouldValidate: true });
                setValue(name.replace('File', 'Url') as keyof CompanyProfileForm, '', { shouldDirty: true });
            }
        } else {
            setValue(name as keyof CompanyProfileForm, e.target.value, { shouldDirty: true, shouldValidate: true });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-4 select-none">
                    <div className="w-24 md:w-40 lg:w-60">
                        <label className="text-sm text-gray-900 cursor-default">Profile Picture</label>
                        <Controller
                            name="logoUrl"
                            control={control}
                            render={({ field }) => (
                                <ImageInput
                                    name="logoFile"
                                    initImage={field.value || ''}
                                    onChange={handleChangeInputValue}
                                />
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-900 cursor-default">Background Picture</label>
                        <Controller
                            name="backgroundImageUrl"
                            control={control}
                            render={({ field }) => (
                                <ImageInput
                                    name="backgroundFile"
                                    initImage={field.value || ''}
                                    onChange={handleChangeInputValue}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 select-none">
                    <div className="relative col-span-2 lg:col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Company Name</label>
                        <Input
                            type="text"
                            {...register('name', { required: 'Company name is required' })}
                            className={clsx(
                                'h-12 rounded-sm',
                                errors.name
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        {errors.name && (
                            <p className="absolute top-full text-red-500 text-[12px] font-medium mb-1 min-h-5">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">About Us</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <RichTextEditor
                                    name="description"
                                    initialContent={field.value}
                                    placement="inside-bottom"
                                    className="px-3 rounded-sm shadow-sm"
                                    onChange={(content) => field.onChange(content)}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button size="xl" disabled={isSubmitting || !isDirty || !isValid} type="submit">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
}
