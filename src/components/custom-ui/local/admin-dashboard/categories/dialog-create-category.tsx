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

type CreateCategoryDialogProps = {
    triggerNode: React.ReactNode;
    handleCreateCategory: (categoryName: string) => void;
};

export const CreateCategoryDialog = memo(({ triggerNode, handleCreateCategory }: CreateCategoryDialogProps) => {
    const [value, setValue] = useState<string>('');

    const handleCreate = (e: any) => {
        e.stopPropagation();
        handleCreateCategory(value);
        setValue('');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{triggerNode}</DialogTrigger>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium leading-6 text-gray-900">Create Category</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Create a new category for your products.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="col-span-full">
                        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
                            Category Name
                        </label>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter category name"
                            type="text"
                            name="category-name"
                            id="category-name"
                            className="h-12 rounded-md focus:border focus:border-primary focus:ring-1 focus:ring-primary"
                        />
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

CreateCategoryDialog.displayName = 'CreateCategoryDialog';
