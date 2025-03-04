'use client';

import React, { useActionState, useContext, useEffect } from 'react';
import RichTextEditor from '@/components/custom-ui/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import { settingPersonalProfile } from '@/lib/action';
import { UserContext } from '@/contexts/user-context';

export function FormPersonalProfile() {
    const { refreshMe, userInfo } = useContext(UserContext);

    // Initial state setup with fallback values
    const initialState = {
        avatarFile: null,
        backgroundFile: null,
        avatarUrl: userInfo?.profileUrl ?? null,
        backgroundUrl: userInfo?.pageUrl ?? null,
        fullname: userInfo?.fullName ?? '',
        phone: userInfo?.phone ?? '',
        education: userInfo?.education ?? '',
        experience: userInfo?.experience ?? '',
        errors: {},
        success: false,
    };

    const handleSubmit = (currentState: any, formData: FormData) => {
        return settingPersonalProfile(currentState, formData).then((res) => {
            refreshMe();
            return res;
        });
    };

    const [state, onSubmit, isPending] = useActionState(handleSubmit, initialState);

    useEffect(() => {
        refreshMe();
    }, []);

    return (
        <form action={onSubmit} className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-4 select-none">
                    <div className="w-24 md:w-40 lg:w-60">
                        <label className="text-sm text-gray-900 cursor-default">Profile Picture</label>
                        <ImageInput name="avatar" initImage={state?.avatarUrl} isAvatar={true} />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-gray-900 cursor-default">Background Picture</label>
                        <ImageInput name="background" initImage={state?.backgroundUrl} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 select-none">
                    <div className="relative col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Full name
                        </label>
                        <Input
                            defaultValue={state.fullname}
                            name="fullname"
                            placeholder="John Smith"
                            type="text"
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.fullname
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {state.errors?.fullname && state.errors.fullname[0]}
                        </p>
                    </div>
                    <div className="relative col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Phone
                        </label>
                        <Input
                            defaultValue={state.phone}
                            name="phone"
                            placeholder="+1233456789"
                            type="text"
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.phone
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                            {state.errors?.phone && state.errors.phone[0]}
                        </p>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Education
                        </label>
                        <RichTextEditor
                            name="education"
                            initialContent={state.education}
                            placement="inside-bottom"
                            className="px-3 rounded-sm shadow-sm"
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <label htmlFor="" className="text-sm text-gray-900 cursor-default">
                            Experience
                        </label>
                        <RichTextEditor
                            name="experience"
                            initialContent={state.experience}
                            placement="inside-bottom"
                            className="px-3 rounded-sm shadow-sm"
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button size="xl" isPending={isPending}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
