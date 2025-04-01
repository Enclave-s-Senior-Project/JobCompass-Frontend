'use client';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { updateRegisterEnterprice } from '@/lib/action';
import { toast } from '@/lib/toast';
import { successKeyMessage } from '@/lib/message-keys';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { ImageInput } from './image-input';
import RichTextEditor from './rich-text-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '../ui/select';
import { Enterprise } from '@/types';
import { EnterpriseService } from '@/services/enterprises.service';

export function FormUpdateRegisterEnterprises(props: {
    setOpen: (value: boolean) => void;
    enterprises: Enterprise | null;
}) {
    const { setOpen, enterprises } = props;
    const [enterprise, setEnterprise] = useState<Enterprise | null>(enterprises);
    const [checkLogo, setCheckLogo] = useState(false);
    const [state, onSubmit, isPending] = useActionState(updateRegisterEnterprice, {
        id: enterprise?.enterpriseId,
        logo: enterprise?.logoUrl || '',
        logoUrl: enterprise?.logoUrl || '',
        name: enterprise?.name,
        phone: enterprise?.phone,
        email: enterprise?.email,
        vision: enterprise?.companyVision,
        size: enterprise?.teamSize,
        foundedIn: enterprise?.foundedIn,
        organizationType: enterprise?.organizationType,
        industryType: enterprise?.industryType,
        bio: enterprise?.bio,
        enterpriseBenefits: enterprise?.enterpriseBenefits,
        description: enterprise?.description,
        errors: {},
        success: false,
    });
    const [enterpriseBenefits, setEnterpriseBenefits] = useState(state.enterpriseBenefits);
    const [description, setDescription] = useState(state.description);
    const fetchEnterpriseData = async () => {
        const updatedEnterprise = await EnterpriseService.checkEnterprise();
        if (updatedEnterprise?.value) {
            setEnterprise(updatedEnterprise.value);
        }
    };

    useEffect(() => {
        if (state.errors?.logo) {
            setCheckLogo(true);
        } else {
            setCheckLogo(false);
        }
        if (state.success) {
            fetchEnterpriseData();
            toast.success(successKeyMessage.UPDATE_REGISTER_ENTERPRISE_SUCCESSFULL);
            setOpen(false);
        }
    }, [state.success, state.errors]);

    const handleEnterpriseBenefits = (content: string) => {
        setEnterpriseBenefits(content);
    };
    const handleDescription = (content: string) => {
        setDescription(content);
    };

    return (
        <form
            className="space-y-6"
            action={(formData) => {
                formData.set('description', description);
                formData.set('enterpriseBenefits', enterpriseBenefits);
                return onSubmit(formData);
            }}
        >
            <div className="flex flex-row gap-7">
                <div className="w-24 md:w-40 lg:w-60">
                    <label className="text-sm text-gray-900 cursor-default">Profile Picture</label>
                    <ImageInput name="logo" initImage={state.logo} isAvatar={true} isError={checkLogo} />
                    <p className="text-red-500 text-[12px] font-medium">
                        {Array.isArray(state.errors?.logo) ? state.errors.logo[0] : state.errors?.logo}
                    </p>
                </div>
                <div className="space-y-5">
                    <div className="relative col-span-1">
                        <label className="text-sm text-gray-900 cursor-default">Enterprise name</label>
                        <Input
                            defaultValue={state.name}
                            name="name"
                            className={clsx(
                                'h-12 rounded-sm',
                                state.errors?.name
                                    ? 'border-2 border-danger ring-danger'
                                    : 'focus-visible:border-primary focus-visible:ring-primary'
                            )}
                        />
                        <p className="text-red-500 text-[12px] font-medium">
                            {state.errors?.name && state.errors.name[0]}
                        </p>
                    </div>
                    <div className="flex flex-row gap-3 relative col-span-1">
                        <div className="w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Phone number</label>
                            <Input
                                defaultValue={state.phone}
                                name="phone"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.phone
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.phone && state.errors.phone[0]}
                            </p>
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Email</label>
                            <Input
                                defaultValue={state.email}
                                name="email"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.email
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.email && state.errors.email[0]}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 relative col-span-1">
                        <div className="w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Company vision</label>
                            <Input
                                defaultValue={state.vision}
                                name="vision"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.vision
                                        ? 'border-2 border-danger ring-danger'
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.vision && state.errors.vision[0]}
                            </p>
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm text-gray-900 cursor-default">Team size</label>
                            <Input
                                defaultValue={state.size}
                                name="size"
                                className={clsx(
                                    'h-12 rounded-sm',
                                    state.errors?.size
                                        ? 'border-2 border-danger ring-danger '
                                        : 'focus-visible:border-primary focus-visible:ring-primary'
                                )}
                            />
                            <p className="text-red-500 text-[12px] font-medium">
                                {state.errors?.size && state.errors.size[0]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-3 relative col-span-1">
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Founded in</label>
                    <Input
                        defaultValue={state.foundedIn}
                        type="date"
                        name="foundedIn"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.foundedIn
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="text-red-500 text-[12px] font-medium">
                        {state.errors?.foundedIn && state.errors.foundedIn[0]}
                    </p>
                </div>
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Organization type</label>
                    <Select name="organizationType" defaultValue={state.organizationType}>
                        <SelectTrigger
                            className={clsx(
                                'h-12 text-base rounded-sm',
                                state.errors?.organizationType
                                    ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                    : 'focus:border-primary focus:ring-primary'
                            )}
                        >
                            <SelectValue placeholder="Select..." className="text-[#767F8C]" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="FLAT">Flat</SelectItem>
                                <SelectItem value="PRIVATE">Private</SelectItem>
                                <SelectItem value="PUBLIC">Public</SelectItem>
                                <SelectItem value="OUTSOURCE">Out source</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <p className="text-red-500 text-[12px] font-medium">
                        {state.errors?.organizationType && state.errors.organizationType[0]}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-3 relative col-span-1">
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Industry type</label>
                    <Input
                        defaultValue={state.industryType}
                        name="industryType"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.industryType
                                ? 'border-2 border-danger ring-danger'
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="text-red-500 text-[12px] font-medium">
                        {state.errors?.industryType && state.errors.industryType[0]}
                    </p>
                </div>
                <div className="w-1/2">
                    <label className="text-sm text-gray-900 cursor-default">Bio </label>
                    <Input
                        defaultValue={state.bio}
                        name="bio"
                        className={clsx(
                            'h-12 rounded-sm',
                            state.errors?.bio
                                ? 'border-2 border-danger ring-danger '
                                : 'focus-visible:border-primary focus-visible:ring-primary'
                        )}
                    />
                    <p className="text-red-500 text-[12px] font-medium">{state.errors?.bio && state.errors.bio[0]}</p>
                </div>
            </div>
            <div className="relative col-span-1">
                <label className="text-sm text-gray-900 cursor-default">Benefits</label>
                <RichTextEditor
                    onChange={handleEnterpriseBenefits}
                    placement="inside-bottom"
                    initialContent={enterpriseBenefits}
                    hasError={!!state.errors?.enterpriseBenefits}
                />
                <p className=" text-red-500 text-[12px] font-medium ">
                    {state.errors?.enterpriseBenefits && state.errors.enterpriseBenefits[0]}
                </p>
            </div>
            <div className="relative col-span-1">
                <label className="text-sm text-gray-900 cursor-default">Description</label>
                <RichTextEditor
                    onChange={handleDescription}
                    placement="inside-bottom"
                    initialContent={description}
                    hasError={!!state.errors?.description}
                />
                <p className=" text-red-500 text-[12px] font-medium ">
                    {state.errors?.description && state.errors.description[0]}
                </p>
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    type="reset"
                    variant="secondary"
                    className="w-[102px] h-[48px] text-[#0A65CC] bg-[#E7F0FA]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPending={isPending}
                    className="group w-[168px] h-[48px] bg-[#0A65CC] text-[#FFFFFF]"
                >
                    Update
                    <ChevronRight className="group-hover:translate-x-2 transition-all ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
