'use client';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import RichTextEditor from './rich-text-editor';
import { applyJob } from '@/lib/action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function TextEditorApplyJob(props: { setOpen: (value: boolean) => void }) {
    const { setOpen } = props;
    const [state, onSubmit, isPending] = useActionState(applyJob, {
        coverLetter: '',
        errors: {},
        success: false,
    });

    // Hàm xử lý khi nội dung của RichTextEditor thay đổi
    const handleCoverLetterChange = (content: string) => {
        state.coverLetter = content; // Cập nhật giá trị coverLetter trong state
    };

    return (
        <form className="space-y-6 p-2" action={onSubmit}>
            <div className="space-y-2">
                <label className=" text-[#18191C] text-[14px]">Choose Resume</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="resume1">MyResume.pdf</SelectItem>
                        <SelectItem value="resume2">Portfolio2024.pdf</SelectItem>
                        <SelectItem value="resume3">Designer_CV.pdf</SelectItem>
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
