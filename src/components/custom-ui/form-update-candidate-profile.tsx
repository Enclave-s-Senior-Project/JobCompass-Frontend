'use client';

import React, { useActionState } from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { updateCandidateProfile } from '@/lib/action';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import RichTextEditor from './rich-text-editor';
import { Button } from '../ui/button';
import { languagesData } from '@/lib/data/languages.data';

export function FormUpdateCandidateProfile() {
    const [state, onSubmit, isPending] = useActionState(updateCandidateProfile, {
        nationality: '',
        dateOfBirth: '',
        gender: null,
        maritalStatus: null,
        introduction: '',
        success: false,
        errors: {},
    });

    return (
        <form action={onSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Nationality</label>
                    <Select name="nationality">
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                state.errors?.nationality
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
                        {state.errors?.nationality && state.errors.nationality[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Date Of Birth</label>
                    <Input
                        defaultValue={state.dateOfBirth}
                        name="dateOfBirth"
                        placeholder="Email address"
                        type="date"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.dateOfBirth
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                        {state.errors?.dateOfBirth && state.errors.dateOfBirth[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Gender</label>
                    <Select name="gender">
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                state.errors?.gender
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
                        {state.errors?.gender && state.errors.gender[0]}
                    </p>
                </div>
                <div className="relative col-span-1">
                    <label className="text-sm text-gray-900 cursor-default">Marital Status</label>
                    <Select name="maritalStatus">
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                state.errors?.maritalStatus
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
                        {state.errors?.maritalStatus && state.errors.maritalStatus[0]}
                    </p>
                </div>
                <div className="relative col-span-2">
                    <label className="text-sm text-gray-900 cursor-default">Introduction (Bio)</label>
                    <RichTextEditor placement="inside-bottom" name="introduction" />
                </div>
            </div>
            <div>
                <Button size="xl" variant="primary" type="submit" isPending={isPending}>
                    Save changes
                </Button>
            </div>
        </form>
    );
}
