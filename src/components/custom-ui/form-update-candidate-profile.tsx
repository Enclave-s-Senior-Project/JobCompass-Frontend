'use client';

import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { updateCandidateProfile } from '@/lib/action';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import RichTextEditor from './rich-text-editor';
import { Button } from '../ui/button';
import { languagesData } from '@/lib/data/languages.data';
import { UserContext } from '@/contexts/user-context';
import { toast } from 'react-toastify';

export function FormUpdateCandidateProfile() {
    const { refreshMe, userInfo } = useContext(UserContext);

    const initialErrors: {
        nationality: string[] | null;
        dateOfBirth: string[] | null;
        gender: string[] | null;
        maritalStatus: string[] | null;
        introduction: string[] | null;
    } = {
        nationality: null,
        dateOfBirth: null,
        gender: null,
        maritalStatus: null,
        introduction: null,
    };

    const [nationality, setNationality] = useState(userInfo?.nationality ?? '');
    const [gender, setGender] = useState(userInfo?.gender ?? '');
    const [maritalStatus, setMaritalStatus] = useState(userInfo?.maritalStatus ?? '');
    const [introduction, setIntroduction] = useState(userInfo?.introduction ?? '');
    const [dateOfBirth, setDateOfBirth] = useState(userInfo?.dateOfBirth ?? '');
    const [errors, setErrors] = useState(initialErrors);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const result = await updateCandidateProfile({
                nationality,
                gender,
                maritalStatus,
                introduction,
                dateOfBirth,
            });

            if (result && !result.success) {
                setErrors({
                    nationality: result.errors.nationality || [],
                    dateOfBirth: result.errors.dateOfBirth || [],
                    gender: result.errors.gender || [],
                    maritalStatus: result.errors.maritalStatus || [],
                    introduction: result.errors.introduction || [],
                });
            } else {
                setErrors(initialErrors);
                refreshMe();
            }
        } catch {
            toast.error('Oops! Please try again');
        }
    };

    useEffect(() => {
        refreshMe();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Nationality</label>
                    <Select name="nationality" value={nationality} onValueChange={setNationality}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.nationality
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.entries(languagesData).map(([abb, country]) => {
                                    return (
                                        <SelectItem key={abb} value={country.title}>
                                            {country.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.nationality && errors.nationality[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Date Of Birth</label>
                    <Input
                        value={dateOfBirth}
                        onChange={(e) => {
                            setDateOfBirth(e.target.value);
                        }}
                        name="dateOfBirth"
                        placeholder="Email address"
                        type="date"
                        className={clsx(
                            'h-12 rounded-sm',
                            errors?.dateOfBirth
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.dateOfBirth && errors.dateOfBirth[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Gender</label>
                    <Select name="gender" value={gender} onValueChange={setGender}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.gender
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {errors?.gender && errors.gender[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Marital Status</label>
                    <Select name="maritalStatus" value={maritalStatus} onValueChange={setMaritalStatus}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.maritalStatus
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
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
                        {errors?.maritalStatus && errors.maritalStatus[0]}
                    </p>
                </div>
                <div className="relative col-span-2">
                    <label className="text-sm text-gray-900 cursor-default">Introduction (Bio)</label>
                    <RichTextEditor
                        placement="inside-bottom"
                        name="introduction"
                        value={introduction}
                        onChange={setIntroduction}
                    />
                </div>
            </div>
            <div>
                <Button size="xl" variant="primary" type="submit" isPending={false}>
                    Save changes
                </Button>
            </div>
        </form>
    );
}
