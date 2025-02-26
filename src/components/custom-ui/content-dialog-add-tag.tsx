'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { addTag } from '@/lib/action';
import { toast } from 'react-toastify';
import { successKeyMessage } from '@/lib/message-keys';
import { Input } from '../ui/input';
import clsx from 'clsx';

export function ContentAddTag(props: { setOpen: (value: boolean) => void }) {
    const { setOpen } = props;
    const [state, onSubmit, isPending] = useActionState(addTag, {
        tagName: '',
        errors: {},
        success: false,
    });

    useEffect(() => {
        if (state.errors?.tag) {
            toast.error(state.errors.tag[0]);
        }
        if (state.success) {
            toast.success(successKeyMessage.APPLY_JOB_SUCCESSFULL);
            setOpen(false);
        }
    }, [state.success, state.errors]);

    return (
        <form className="space-y-6 p-2" action={onSubmit}>
            <div className="space-y-2">
                <Input
                    name="tag"
                    className={clsx(
                        'h-12 rounded-sm',
                        state.errors?.tag
                            ? 'border-2 border-danger ring-danger'
                            : 'focus-visible:border-primary focus-visible:ring-primary'
                    )}
                />
                <p className="text-red-500 text-[12px] font-medium">{state.errors?.tag && state.errors.tag[0]}</p>
            </div>

            <div className="flex justify-between gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="w-[102px] h-[48px] text-[#0A65CC] bg-[#E7F0FA]"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button type="submit" isPending={isPending} className="w-[168px] h-[48px] bg-[#0A65CC] text-[#FFFFFF]">
                    Add Tag
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
