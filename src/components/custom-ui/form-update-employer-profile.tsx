'use client';

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import RichTextEditor from './rich-text-editor';
import { Button } from '../ui/button';
import { EnterpriseContext } from '@/contexts';
import { toast } from '@/lib/toast';
import { settingEmployerFounding } from '@/lib/action';
import { Categories, CompanyProfileFoundingType, FormErrors } from '@/types';
import { Edit, XCircle } from 'lucide-react';
import { handleErrorToast } from '@/lib/utils';
import MultiSelectCategoriesSearchInput from './select-categories';

export enum OrganizationType {
    PRIVATE = 'PRIVATE',
    FLAT = 'FLAT',
    PUBLIC = 'PUBLIC',
    OUTSOURCE = 'OUTSOURCE',
}

export function FormUpdateEmployerProfile() {
    const { enterpriseInfo, refetchEnterpriseInfo } = React.useContext(EnterpriseContext);
    const [editable, setEditable] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [errors, setErrors] = useState<FormErrors>({
        email: [],
        description: [],
        companyVision: [],
        foundedIn: [],
        organizationType: [],
        teamSize: [],
        industryType: [],
        bio: [],
    });
    const [formValue, setFormValue] = useState<CompanyProfileFoundingType>({
        email: enterpriseInfo?.email || '',
        description: enterpriseInfo?.description || 'We are a tech company focused on AI solutions.',
        companyVision: enterpriseInfo?.companyVision || 'To become the leading AI service provider in Southeast Asia.',
        foundedIn: enterpriseInfo?.foundedIn ? new Date(enterpriseInfo.foundedIn) : new Date('2020-01-15'),
        organizationType: enterpriseInfo?.organizationType || OrganizationType.PRIVATE,
        teamSize: enterpriseInfo?.teamSize || '10-50 employees',
        industryType: categories || [],
        bio: enterpriseInfo?.bio || '',
    });
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setFormValue((prev) => ({ ...prev, industryType: categories }));
    }, [categories]);

    useEffect(() => {
        async function fetchData() {
            await refetchEnterpriseInfo();
            const newCategories = enterpriseInfo?.categories || [];
            setCategories(newCategories);
            setFormValue({
                email: enterpriseInfo?.email || '',
                description: enterpriseInfo?.description || '',
                companyVision: enterpriseInfo?.companyVision || '',
                foundedIn: enterpriseInfo?.foundedIn ? new Date(enterpriseInfo.foundedIn) : new Date('2020-01-15'),
                organizationType: enterpriseInfo?.organizationType || OrganizationType.PRIVATE,
                teamSize: enterpriseInfo?.teamSize || '10-50 employees',
                industryType: newCategories,
                bio: enterpriseInfo?.bio || '',
            });
        }
        fetchData();
    }, [refetchEnterpriseInfo, enterpriseInfo]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setCanSubmit(
                JSON.stringify({
                    email: enterpriseInfo?.email || '',
                    description: enterpriseInfo?.description || '',
                    companyVision: enterpriseInfo?.companyVision || '',
                    foundedIn: enterpriseInfo?.foundedIn
                        ? new Date(enterpriseInfo.foundedIn).toISOString().split('T')[0]
                        : '',
                    organizationType: enterpriseInfo?.organizationType || '',
                    teamSize: enterpriseInfo?.teamSize || '',
                    industryType: enterpriseInfo?.categories || [],
                    bio: enterpriseInfo?.bio || '',
                }) !==
                    JSON.stringify({
                        email: formValue.email,
                        description: formValue.description,
                        companyVision: formValue.companyVision,
                        foundedIn: formValue.foundedIn.toISOString().split('T')[0],
                        organizationType: formValue.organizationType,
                        teamSize: formValue.teamSize,
                        industryType: categories,
                        bio: formValue.bio,
                    })
            );
        }, 300);

        return () => clearTimeout(handler);
    }, [formValue, enterpriseInfo, categories]);

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | Date = value;
        const today = new Date();

        if (type === 'date') {
            const selectedDate = new Date(value);
            if (selectedDate > today) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: ['Date cannot be in the future'],
                }));
                return;
            }
            newValue = selectedDate;
        }

        setFormValue((prev) => ({ ...prev, [name]: newValue }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            const fieldName = name as keyof FormErrors;

            if (!value.trim()) {
                newErrors[fieldName] = ['This field is required'];
            } else {
                newErrors[fieldName] = [];
            }

            return newErrors;
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormValue((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeRichEditor = (value: string, nameInput?: string) => {
        if (nameInput) setFormValue((prev) => ({ ...prev, [nameInput]: value }));
    };

    const handleToggleEditable = () => {
        setEditable((prev) => !prev);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate industryType
        if (!categories.length) {
            setErrors((prev) => ({
                ...prev,
                industryType: ['At least one industry type is required'],
            }));
            setIsPending(false);
            return;
        }

        setIsPending(true);

        try {
            const formData = new FormData();
            Object.entries(formValue).forEach(([key, value]) => {
                if (key === 'industryType') {
                    (value as Categories[]).forEach((category, index) => {
                        console.log(`Debug - appending industryType[${index}]:`, category.categoryId);
                        formData.append('industryType', category.categoryId);
                    });
                } else if (value instanceof Date) {
                    formData.append(key, value.toISOString().split('T')[0]);
                } else {
                    formData.append(key, value as string);
                    formData.append(key, value as string);
                }
            });
            await settingEmployerFounding(formData);
            refetchEnterpriseInfo();
            toast.success('Profile updated successfully!');
            setCanSubmit(false);
        } catch (error) {
            handleErrorToast(error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium text-gray-900">Founding Information</h5>
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
                <div className="grid select-none grid-cols-3 gap-4">
                    {/* Organization Type */}
                    <div className="relative col-span-3 lg:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Organization Type</label>
                        <Select
                            disabled={!editable}
                            value={formValue.organizationType}
                            onValueChange={(value) => handleSelectChange('organizationType', value)}
                        >
                            <SelectTrigger
                                className={clsx(
                                    'h-12 rounded-sm text-base',
                                    errors?.organizationType?.length > 0
                                        ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                        : 'focus:border-primary focus:ring-primary'
                                )}
                            >
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={OrganizationType.PRIVATE}>Private</SelectItem>
                                    <SelectItem value={OrganizationType.FLAT}>Flat</SelectItem>
                                    <SelectItem value={OrganizationType.PUBLIC}>Public</SelectItem>
                                    <SelectItem value={OrganizationType.OUTSOURCE}>Outsource</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors?.organizationType?.[0] && (
                            <p className="mt-1 text-xs font-medium text-red-500">{errors.organizationType[0]}</p>
                        )}
                    </div>

                    {/* Industry Type */}
                    <div className="relative col-span-3 lg:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Industry Type</label>
                        <MultiSelectCategoriesSearchInput
                            disabled={!editable}
                            onChange={(newTagIds: Categories[]) => {
                                setCategories(newTagIds);
                            }}
                            defaultValue={formValue?.industryType || []}
                        />
                        {errors?.industryType?.[0] && (
                            <p className="mt-1 text-xs font-medium text-red-500">{errors.industryType[0]}</p>
                        )}
                    </div>

                    {/* Team Size */}
                    <div className="relative col-span-3 lg:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Team Size</label>
                        <Select
                            disabled={!editable}
                            value={formValue.teamSize}
                            onValueChange={(value) => handleSelectChange('teamSize', value)}
                        >
                            <SelectTrigger
                                className={clsx(
                                    'h-12 rounded-sm text-base',
                                    errors?.teamSize?.length > 0
                                        ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                        : 'focus:border-primary focus:ring-primary'
                                )}
                            >
                                <SelectValue placeholder="Select..." />
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
                        {errors?.teamSize?.[0] && (
                            <p className="mt-1 text-xs font-medium text-red-500">{errors.teamSize[0]}</p>
                        )}
                    </div>
                </div>

                {/* Additional Fields */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {/* Year of Establishment */}
                    <div className="relative col-span-2 lg:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Year of Establishment</label>
                        <Input
                            disabled={!editable}
                            name="foundedIn"
                            type="date"
                            value={formValue.foundedIn ? formValue.foundedIn.toISOString().split('T')[0] : ''}
                            onChange={handleChangeInputValue}
                            className={clsx(
                                'h-12 rounded-sm',
                                errors?.foundedIn?.length > 0
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />

                        {errors?.foundedIn?.[0] && (
                            <p className="mt-1 text-xs font-medium text-red-500">{errors.foundedIn[0].toString()}</p>
                        )}
                    </div>

                    {/* Company Website */}
                    <div className="relative col-span-2 lg:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Company Website</label>
                        <Input
                            disabled={!editable}
                            name="email"
                            placeholder="Company website"
                            type="text"
                            value={formValue.email}
                            onChange={handleChangeInputValue}
                            className={clsx(
                                'h-12 rounded-sm',
                                errors?.email?.length > 0
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        {errors?.email?.[0] && (
                            <p className="mt-1 text-xs font-medium text-red-500">{errors.email[0]}</p>
                        )}
                    </div>
                </div>

                {/* Text Editors */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Introduction (Bio)</label>
                        <RichTextEditor
                            disabled={!editable}
                            name="bio"
                            value={formValue.bio}
                            onChange={handleChangeRichEditor}
                            placement="inside-bottom"
                            className="rounded-sm px-3 shadow-sm"
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Company Vision</label>
                        <RichTextEditor
                            disabled={!editable}
                            name="companyVision"
                            value={formValue.companyVision}
                            onChange={handleChangeRichEditor}
                            placement="inside-bottom"
                            className="rounded-sm px-3 shadow-sm"
                        />
                    </div>
                    {/* Description */}
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="cursor-default text-sm text-gray-900">Description</label>
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

            <div>
                <Button size="xl" isPending={isPending} disabled={!canSubmit}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
