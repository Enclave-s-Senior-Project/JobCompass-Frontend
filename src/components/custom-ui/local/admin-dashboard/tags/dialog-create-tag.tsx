import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { memo, useState } from 'react';
import { hexToRgb } from '@/lib/utils';

type CreateTagDialogProps = {
    triggerNode: React.ReactNode;
    handleCreateCategory: (name: string, color: string) => void;
};

const DEFAULT_COLOR = '#000000';

export const CreateTagDialog = memo(({ triggerNode, handleCreateCategory }: CreateTagDialogProps) => {
    const [value, setValue] = useState<string>('');
    const [color, setColor] = useState<string>(DEFAULT_COLOR);

    const handleCreate = (e: any) => {
        e.stopPropagation();
        handleCreateCategory(value, color);
        setValue('');
        setColor(DEFAULT_COLOR);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{triggerNode}</DialogTrigger>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium leading-6 text-gray-900">Create Tag</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Create a new tag for your products.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-full">
                        <label htmlFor="tag-name" className="block text-sm font-medium text-gray-700">
                            Tag Name
                        </label>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter tag name"
                            type="text"
                            name="tag-name"
                            id="tag-name"
                            className="h-12 rounded-md focus:border focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="tag-color" className="block text-sm font-medium text-gray-700">
                            Tag Color
                        </label>
                        <input
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            type="color"
                            name="tag-color"
                            id="tag-color"
                            className="h-12 w-full"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="tag-review" className="block text-sm font-medium text-gray-700">
                            Review
                        </label>
                        <p
                            className="min-h-12 text-wrap break-words rounded-3xl px-2 py-3 text-center"
                            style={{ color: color, backgroundColor: `rgba(${hexToRgb(color)}, 0.2)` }}
                        >
                            {value}
                        </p>
                    </div>
                </div>
                <DialogFooter className="flex items-center justify-end gap-2">
                    <DialogClose asChild>
                        <Button onClick={(e) => e.stopPropagation()} variant="ghost" type="reset">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={handleCreate}>Create</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

CreateTagDialog.displayName = 'CreateTagDialog';
