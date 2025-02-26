'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { addTag, applyJob } from '@/lib/action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { successKeyMessage } from '@/lib/message-keys';
import { Input } from '../ui/input';

export function ContentAddTag(props: { setOpen: (value: boolean) => void }) {
    const router = useRouter();
    const { setOpen } = props;
    const [state, onSubmit, isPending] = useActionState(addTag, {
        tagName: '',
        errors: {},
        success: false,
    });
    useEffect(() => {
        if (state.errors?.code) {
            toast.error(state.errors.code[0]);
        }
        if (state.success) {
            toast.success(successKeyMessage.APPLY_JOB_SUCCESSFULL);
        }
    }, [state.success, state.errors, router, state.email]);

    return (
        <form className="space-y-6 p-2" action={onSubmit}>
            <div className="space-y-2">
                <Input name="tag" className="focus-visible:border-primary focus-visible:ring-primary" />
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    variant="outline"
                    className="w-[102px] h-[48px] text-[#0A65CC] bg-[#E7F0FA]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isPending={isPending}
                    onClick={() => setOpen(false)}
                    className="w-[168px] h-[48px] bg-[#0A65CC] text-[#FFFFFF]"
                >
                    Add Tag
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
