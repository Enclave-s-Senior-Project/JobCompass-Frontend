'use client';
import { useActionState, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import RichTextEditor from './rich-text-editor';
import { applyJob } from '@/lib/action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { CVService } from '@/services/cv.service';
import { handleErrorToast } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { SelectGroup } from '@radix-ui/react-select';

export function TextEditorApplyJob(props: { setOpen: (value: boolean) => void }) {
    const { setOpen } = props;
    const [state, onSubmit, isPending] = useActionState(applyJob, {
        coverLetter: '',
        selectedCv: '',
        errors: {},
        success: false,
    });
    const {
        refetch,
        data: resultQuery,
        isLoading,
    } = useQuery({
        queryKey: [queryKey.listCvofProfile],
        queryFn: async () => {
            try {
                const payload = await CVService.getCvByIdProfile();
                return payload;
            } catch (error: any) {
                console.log(error);
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });
    // Hàm xử lý khi nội dung của RichTextEditor thay đổi
    const handleCoverLetterChange = (content: string) => {
        state.coverLetter = content; // Cập nhật giá trị coverLetter trong state
    };

    return (
        <form className="space-y-6 p-2" action={onSubmit}>
            <div className="space-y-2">
                <label className="text-[#18191C] text-[14px]">Choose Resume</label>
                <Select
                    value={state.selectedCv}
                    onValueChange={(value) => (state.selectedCv = value)} // Cập nhật state trực tiếp
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {resultQuery?.map((cv) => (
                                <SelectItem key={cv.id} value={cv.id}>
                                    {cv.cvName}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <RichTextEditor onChange={handleCoverLetterChange} initialContent={state.coverLetter} />
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    variant="outline"
                    className="w-[102px] h-[48px] text-[#0A65CC] bg-[#E7F0FA]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button type="submit" isPending={isPending} className="w-[168px] h-[48px] bg-[#0A65CC] text-[#FFFFFF]">
                    Apply Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
