'use client';

import React, { useEffect, useState, useContext, FormEvent, ChangeEvent } from 'react';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import { settingPersonalProfile } from '@/lib/action';
import { UserContext } from '@/contexts/user-context';
import { PersonalProfileType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/lib/toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Edit, XCircle } from 'lucide-react';
import { handleErrorToast } from '@/lib/utils';

type FormErrors = {
    avatarFile: (string | null)[];
    backgroundFile: (string | null)[];
    fullName: (string | null)[];
    phone: (string | null)[];
    education: (string | null)[];
    experience: (string | null)[];
    dateOfBirth: (string | null)[];
    maritalStatus: (string | null)[];
};

export function FormPersonalProfile() {
    const { refreshMe, userInfo } = useContext(UserContext);
    const [editable, setEditable] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({
        avatarFile: [],
        backgroundFile: [],
        fullName: [],
        phone: [],
        education: [],
        experience: [],
        dateOfBirth: [],
        maritalStatus: [],
    });
    const [formValue, setFormValue] = useState<PersonalProfileType>({
        avatarFile: null,
        backgroundFile: null,
        avatarUrl: userInfo?.profileUrl ?? '',
        backgroundUrl: userInfo?.pageUrl ?? '',
        fullName: userInfo?.fullName ?? '',
        phone: userInfo?.phone ?? '',
        education: userInfo?.education ?? '',
        experience: userInfo?.experience ?? '',
        dateOfBirth: userInfo?.dateOfBirth ?? '',
        maritalStatus: userInfo?.maritalStatus ?? '',
    });

    const { mutate: submitMutation, isPending } = useMutation({
        mutationFn: () => settingPersonalProfile(formValue),
        onSuccess: (res) => {
            const { success, errors } = res;
            setErrors(errors as FormErrors);
            if (success) {
                refreshMe();
                setEditable(false);
                toast.success('User update is successful!');
            }
            return res;
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setCanSubmit(
                JSON.stringify(formValue) !==
                    JSON.stringify({
                        avatarFile: null,
                        backgroundFile: null,
                        avatarUrl: userInfo?.profileUrl ?? '',
                        backgroundUrl: userInfo?.pageUrl ?? '',
                        fullName: userInfo?.fullName ?? '',
                        phone: userInfo?.phone ?? '',
                        education: userInfo?.education ?? '',
                        experience: userInfo?.experience ?? '',
                        dateOfBirth: userInfo?.dateOfBirth ?? null,
                        maritalStatus: userInfo?.maritalStatus ?? null,
                    })
            );
        }, 300);

        return () => clearTimeout(handler);
    }, [formValue, userInfo]);

    useEffect(() => {
        refreshMe();
    }, []);

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        if (e.target.type === 'file') {
            const file = e.target.files?.[0] || null;
            setFormValue((prev) => ({ ...prev, [name]: file }));
        } else {
            setFormValue((prev) => ({ ...prev, [name]: e.target.value }));
        }
    };

    const handleChangeRichEditor = (value: string, nameInput?: string) => {
        if (nameInput) setFormValue((prev) => ({ ...prev, [nameInput]: value }));
    };
    const handleToggleEditable = () => {
        setEditable((prev) => !prev);
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitMutation();
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium text-gray-900">Basic Information</h5>
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
                            name="avatarFile"
                            value={formValue?.avatarUrl}
                            isAvatar={true}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="cursor-default text-sm text-gray-900">Background Picture</label>
                        <ImageInput
                            disabled={!editable}
                            name="backgroundFile"
                            value={formValue?.backgroundUrl}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                </div>
                <div className="grid select-none grid-cols-2 gap-4">
                    <div className="relative col-span-2 lg:col-span-1">
                        <label htmlFor="" className="cursor-default text-sm text-gray-900">
                            Full name
                        </label>
                        <Input
                            disabled={!editable}
                            value={formValue?.fullName}
                            name="fullName"
                            placeholder="John Smith"
                            type="text"
                            onChange={handleChangeInputValue}
                            className={clsx(
                                'h-12 rounded-sm',
                                errors?.fullName?.length > 0
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {errors?.fullName?.length > 0 && errors.fullName[0]}
                        </p>
                    </div>
                    <div className="relative col-span-2 lg:col-span-1">
                        <label htmlFor="" className="cursor-default text-sm text-gray-900">
                            Phone
                        </label>
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
                    <div className="relative col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Date Of Birth</label>
                        <Input
                            disabled={!editable}
                            value={formValue.dateOfBirth}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setFormValue((prev) => ({ ...prev, dateOfBirth: e.target.value }));
                            }}
                            name="dateOfBirth"
                            placeholder="Email address"
                            type="date"
                            className={clsx(
                                'h-12 rounded-sm',
                                errors?.dateOfBirth?.length
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {errors?.dateOfBirth?.length > 0 && errors.dateOfBirth[0]}
                        </p>
                    </div>
                    <div className="relative col-span-1">
                        <label className="cursor-default text-sm text-gray-900">Marital Status</label>
                        <Select
                            disabled={!editable}
                            name="maritalStatus"
                            value={formValue.maritalStatus}
                            onValueChange={(value: string) => {
                                setFormValue((prev) => ({ ...prev, maritalStatus: value }));
                            }}
                        >
                            <SelectTrigger
                                className={clsx(
                                    'h-12 rounded-sm text-base',
                                    errors?.maritalStatus?.length > 0
                                        ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                        : 'focus:border-primary focus:ring-primary',
                                    formValue.maritalStatus ? 'text-gray-900' : 'text-stone-500'
                                )}
                            >
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="ALONE">Alone</SelectItem>
                                    <SelectItem value="MARRIED">Married</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="absolute bottom-0 top-full mb-1 line-clamp-1 min-h-5 text-[12px] font-medium text-red-500">
                            {errors?.maritalStatus?.length > 0 && errors.maritalStatus[0]}
                        </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="" className="cursor-default text-sm text-gray-900">
                            Education
                        </label>
                        <RichTextEditor
                            disabled={!editable}
                            name="education"
                            onChange={handleChangeRichEditor}
                            placement="inside-bottom"
                            value={formValue.education}
                            className="rounded-sm px-3 shadow-sm"
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="" className="cursor-default text-sm text-gray-900">
                            Experience
                        </label>
                        <RichTextEditor
                            disabled={!editable}
                            name="experience"
                            value={formValue.experience}
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
