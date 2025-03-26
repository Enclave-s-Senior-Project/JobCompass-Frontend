'use client';

import React, { FormEvent, useId, useState } from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { updateCV, uploadCV } from '@/lib/action';
import { handleErrorToast } from '@/lib/utils';
import { Button } from '../ui/button';

type FormFields = {
    cvId?: string;
    cvName: string;
    cvFile: File | null;
    isPublished: boolean;
};

type Props = {
    initValue: FormFields | null;
    onClose: () => void;
    refetchResume: () => void;
    isEditing: boolean;
};

const initFormValue: FormFields = {
    cvId: '',
    cvName: '',
    cvFile: null as File | null,
    isPublished: false,
};

export function FormUploadResume({ initValue, onClose, refetchResume, isEditing }: Props) {
    const [formValue, setFormValue] = useState(initValue ? initValue : initFormValue);
    const [errors, setErrors] = useState({ cvName: '', cvFile: '', isPublished: '' });
    const checkboxId = useId();

    const uploadMutation = useMutation({
        mutationFn: (formValue: FormFields) => uploadCV(formValue),
        onSuccess: (data) => {
            if (!data?.success) {
                setErrors(data?.errors);
            } else {
                resetForm();
                refetchResume();
            }
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const updateMutation = useMutation({
        mutationFn: (formValue: FormFields) => updateCV(formValue),
        onSuccess: (data) => {
            if (!data?.success) {
                setErrors(data?.errors);
            } else {
                resetForm();
                refetchResume();
            }
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateMutation.mutate(formValue);
        } else {
            uploadMutation.mutate(formValue);
        }
    };

    const resetForm = () => {
        setFormValue({
            cvId: '',
            cvName: '',
            cvFile: null,
            isPublished: false,
        });
        setErrors({ cvName: '', cvFile: '', isPublished: '' });
        onClose();
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit} onReset={resetForm}>
            <div className="space-y-1 relative">
                <label className="text-sm">CV/Resume Name</label>
                <Input
                    value={formValue.cvName}
                    onChange={(e) =>
                        setFormValue((prev) => ({
                            ...prev,
                            cvName: e.target.value,
                        }))
                    }
                    className={clsx(
                        'h-12 rounded-sm',
                        errors?.cvName
                            ? 'border-2 border-danger ring-danger'
                            : 'focus-visible:border-primary focus-visible:ring-primary'
                    )}
                    placeholder="template_cv"
                />
                <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                    {errors?.cvName && errors.cvName[0]}
                </p>
            </div>
            <div className="space-y-1 relative">
                <label className="text-sm">Upload your CV/Resume</label>
                <Input
                    disabled={isEditing}
                    type="file"
                    onChange={(e) =>
                        setFormValue((prev) => ({
                            ...prev,
                            cvFile: e.target.files?.[0] || null,
                        }))
                    }
                    className={clsx(
                        'h-12 rounded-sm px-1 py-2.5',
                        errors?.cvFile
                            ? 'border-2 border-danger ring-danger'
                            : 'focus-visible:border-primary focus-visible:ring-primary'
                    )}
                />
                <p className="absolute top-full bottom-0 line-clamp-1 text-red-500 text-[12px] font-medium mb-1 min-h-5">
                    {errors?.cvFile && errors.cvFile[0]}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Input
                    id={checkboxId}
                    type="checkbox"
                    className="size-4"
                    checked={formValue.isPublished}
                    onChange={(e) =>
                        setFormValue((prev) => ({
                            ...prev,
                            isPublished: e.target.checked,
                        }))
                    }
                />
                <label htmlFor={checkboxId} className="text-sm">
                    Enable public visibility
                </label>
            </div>
            <div className="flex items-center justify-between">
                <Button
                    variant="secondary"
                    type="reset"
                    disabled={uploadMutation.isPending || updateMutation.isPending}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPending={uploadMutation.isPending || updateMutation.isPending}
                    disabled={isEditing && JSON.stringify(formValue) === JSON.stringify(initValue)}
                >
                    Save changes
                </Button>
            </div>
        </form>
    );
}
