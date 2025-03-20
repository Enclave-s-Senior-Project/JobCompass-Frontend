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
import { toast } from 'sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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
                toast.success('User update is successful!');
            }
            return res;
        },
        onError: () => {
            toast.error('Oops! Something went wrong');
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        submitMutation();
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="flex items-center gap-4 select-none">
                    <div className="w-24 md:w-40 lg:w-60">
                        <label className="text-sm text-gray-900 cursor-default">Profile Picture</label>
                        <ImageInput
                            name="avatarFile"
                            value={formValue?.avatarUrl}
                            isAvatar={true}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-900 cursor-default">Background Picture</label>
                        <ImageInput
                            name="backgroundFile"
                            value={formValue?.backgroundUrl}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 select-none">
                    <div className="relative col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Full name
                        </label>
                        <Input
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
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {errors?.fullName?.length > 0 && errors.fullName[0]}
                        </p>
                    </div>
                    <div className="relative col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Phone
                        </label>
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
                    <div className="relative col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Date Of Birth</label>
                        <Input
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
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {errors?.dateOfBirth?.length > 0 && errors.dateOfBirth[0]}
                        </p>
                    </div>
                    <div className="relative col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Marital Status</label>
                        <Select
                            name="maritalStatus"
                            value={formValue.maritalStatus}
                            onValueChange={(value: string) => {
                                console.log(value);
                                setFormValue((prev) => ({ ...prev, maritalStatus: value }));
                            }}
                        >
                            <SelectTrigger
                                className={clsx(
                                    'h-12 text-base rounded-sm',
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
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {errors?.maritalStatus?.length > 0 && errors.maritalStatus[0]}
                        </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Education
                        </label>
                        <RichTextEditor
                            name="education"
                            onChange={handleChangeRichEditor}
                            placement="inside-bottom"
                            value={formValue.education}
                            className="px-3 rounded-sm shadow-sm"
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Experience
                        </label>
                        <RichTextEditor
                            name="experience"
                            value={formValue.experience}
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
