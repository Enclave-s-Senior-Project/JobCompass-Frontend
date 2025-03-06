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
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

type FormErrors = {
    nationality: (string | null)[];
    dateOfBirth: (string | null)[];
    gender: (string | null)[];
    maritalStatus: (string | null)[];
    introduction: (string | null)[];
};

export function FormUpdateCandidateProfile() {
    const { refreshMe, userInfo } = useContext(UserContext);

    const initialErrors: FormErrors = {
        nationality: [],
        dateOfBirth: [],
        gender: [],
        maritalStatus: [],
        introduction: [],
    };

    const [nationality, setNationality] = useState(userInfo?.nationality ?? '');
    const [gender, setGender] = useState(userInfo?.gender ?? '');
    const [maritalStatus, setMaritalStatus] = useState(userInfo?.maritalStatus ?? '');
    const [introduction, setIntroduction] = useState(userInfo?.introduction ?? '');
    const [dateOfBirth, setDateOfBirth] = useState(userInfo?.dateOfBirth ?? '');
    const [errors, setErrors] = useState<FormErrors>(initialErrors);
    const [canSubmit, setCanSubmit] = useState(false);

    const { mutate: submitMutation, isPending } = useMutation({
        mutationFn: () =>
            updateCandidateProfile({
                nationality,
                gender,
                maritalStatus,
                introduction,
                dateOfBirth,
            }),
        onSuccess: (res) => {
            const { success, errors } = res;
            setErrors(errors as FormErrors);
            if (success) {
                refreshMe();
                toast.success('Updated!');
            }
            return res;
        },
        onError: () => {
            toast.error('Oops! Something went wrong');
        },
    });

    useEffect(() => {
        refreshMe();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(checkFormChanged, 300); // Check after 100ms delay
        return () => clearTimeout(timeout);
    }, [nationality, gender, maritalStatus, introduction, dateOfBirth, userInfo]);

    const checkFormChanged = () => {
        const hasChanges =
            nationality !== (userInfo?.nationality ?? '') ||
            gender !== (userInfo?.gender ?? '') ||
            maritalStatus !== (userInfo?.maritalStatus ?? '') ||
            introduction !== (userInfo?.introduction ?? '') ||
            dateOfBirth !== (userInfo?.dateOfBirth ?? '');

        setCanSubmit(hasChanges);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        submitMutation();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Nationality</label>
                    <Select name="nationality" value={nationality} onValueChange={setNationality}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.nationality?.length > 0
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
                        {errors?.nationality?.length > 0 && errors.nationality[0]}
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
                    <label className="text-sm text-gray-900 cursor-default">Gender</label>
                    <Select name="gender" value={gender} onValueChange={setGender}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.gender?.length > 0
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
                        {errors?.gender?.length > 0 && errors.gender[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Marital Status</label>
                    <Select name="maritalStatus" value={maritalStatus} onValueChange={setMaritalStatus}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                errors?.maritalStatus?.length > 0
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
                        {errors?.maritalStatus?.length > 0 && errors.maritalStatus[0]}
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
                <Button size="xl" variant="primary" type="submit" isPending={isPending} disabled={!canSubmit}>
                    Save changes
                </Button>
            </div>
        </form>
    );
}
