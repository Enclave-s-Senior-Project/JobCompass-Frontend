'use client';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import RichTextEditor from './rich-text-editor';
import { applyJob } from '@/lib/action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { CVService } from '@/services/cv.service';
import { toast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { successKeyMessage } from '@/lib/message-keys';
import clsx from 'clsx';
import { handleErrorToast } from '@/lib/utils';

export function TextEditorApplyJob(props: { setOpen: (value: boolean) => void; jobId: string }) {
    const router = useRouter();
    const { setOpen, jobId } = props;
    const [state, onSubmit, isPending] = useActionState<any, FormData>(
        (currentState, formData) => applyJob(currentState, formData, jobId),
        {
            coverLetter: '',
            selectedCv: '',
            errors: {},
            success: false,
        }
    );
    const [coverLetter, setCoverLetter] = useState(state.coverLetter);
    const { data: resultQuery } = useQuery({
        queryKey: [queryKey.listCvofProfile],
        queryFn: async () => {
            try {
                const payload = await CVService.getOwnCV();
                return payload || null;
            } catch (error: any) {
                handleErrorToast(error);
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });
    const handleCoverLetterChange = (content: string) => {
        setCoverLetter(content);
    };
    useEffect(() => {
        if (state.errors?.code) {
            toast.error(state.errors.code[0]);
        }
        if (state.success) {
            toast.success(successKeyMessage.APPLY_JOB_SUCCESSFUL);
            router.push('/single-job/' + jobId);
        }
    }, [state.success, state.errors, router, state.email]);

    return (
        <form
            className="space-y-6 p-2"
            action={(formData) => {
                formData.set('coverLetter', coverLetter);
                return onSubmit(formData);
            }}
        >
            <div className="space-y-2">
                <label className="text-[14px] text-[#18191C]">Choose Resume</label>
                <Select name="selectedCv">
                    <SelectTrigger
                        className={clsx(
                            'h-12 rounded-sm text-base',
                            state.errors?.selectedCv
                                ? 'border-2 border-danger focus:border-danger focus:ring-0'
                                : 'focus:border-primary focus:ring-primary'
                        )}
                    >
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        {resultQuery?.map((cv) => (
                            <SelectItem key={cv.cvId} value={cv.cvId}>
                                {cv.cvName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-[12px] font-medium text-red-500">
                    {state.errors?.selectedCv && state.errors.selectedCv[0]}
                </p>
            </div>

            <div>
                <RichTextEditor
                    onChange={handleCoverLetterChange}
                    initialContent={coverLetter}
                    hasError={!!state.errors?.coverLetter}
                />
                <p className="text-[12px] font-medium text-red-500">
                    {state.errors?.coverLetter && state.errors.coverLetter[0]}
                </p>
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    variant="outline"
                    className="h-[48px] w-[102px] bg-[#E7F0FA] text-[#0A65CC]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPending={isPending}
                    // onClick={() => setOpen(false)}
                    className="h-[48px] w-[168px] bg-[#0A65CC] text-[#FFFFFF]"
                >
                    Apply Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
