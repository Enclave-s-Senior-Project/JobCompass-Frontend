import { TableCell, TableRow } from '@/components/ui/table';
import { cn, toFormattedDate } from '@/lib/utils';
import { Categories } from '@/types';
import { Check, SquarePen, Trash } from 'lucide-react';
import { memo, useState } from 'react';
import { DeleteConfirmDialog } from '../../../global/dialog-delete-confirm';

type SubCategoryItemProps = {
    subcategory: Categories;
    selectedCategory: string[];
    onSelectChild: (categoryId: string) => void;
    handleUpdateCategory: (categoryId: string, categoryName: string) => void;
    handleDeleteCategory: (categoryId: string) => void;
};

export const SubCategoryItem = memo(
    ({
        subcategory,
        selectedCategory,
        onSelectChild,
        handleUpdateCategory,
        handleDeleteCategory,
    }: SubCategoryItemProps) => {
        const [editable, setEditable] = useState(false);
        const [categoryName, setCategoryName] = useState(subcategory.categoryName);

        const handleToggleEdit = (e: any) => {
            e?.stopPropagation();
            if (editable) {
                setCategoryName(subcategory.categoryName);
            }
            setEditable(!editable);
        };

        const handleSubmitUpdate = (e: React.FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (categoryName !== subcategory.categoryName) {
                handleUpdateCategory(subcategory.categoryId, categoryName);
                setEditable(false);
            }
        };

        return (
            <TableRow className="hover:bg-muted">
                <TableCell className="ms-8 flex items-center gap-8" colSpan={2}>
                    <div className="flex items-center">
                        <div className="cursor-pointer">
                            <input
                                checked={selectedCategory.includes(subcategory.categoryId)}
                                type="checkbox"
                                id={subcategory.categoryId}
                                onChange={() => onSelectChild(subcategory.categoryId)}
                            />
                        </div>
                    </div>
                    <form className="flex items-center gap-2" onSubmit={handleSubmitUpdate}>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            disabled={!editable}
                            className={cn('h-10', !editable ? 'bg-transparent' : 'border border-gray-200 bg-white p-2')}
                        />
                        {editable && categoryName !== subcategory.categoryName && (
                            <button type="submit" className="h-10 border bg-white p-3 hover:border-gray-500">
                                <Check className="size-4 text-gray-600" />
                            </button>
                        )}
                    </form>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <p>{toFormattedDate(subcategory.createdAt)}</p>
                </TableCell>
                <TableCell>
                    <p>{toFormattedDate(subcategory.updatedAt)}</p>
                </TableCell>
                <TableCell>
                    <div className="flex items-center justify-end gap-2">
                        <button
                            className="rounded-sm p-1 text-primary-500 hover:bg-primary-50"
                            onClick={handleToggleEdit}
                        >
                            <SquarePen className="size-5" />
                        </button>
                        <DeleteConfirmDialog
                            triggerNode={
                                <button className="rounded-sm p-1 text-danger-500 hover:bg-danger-50">
                                    <Trash className="size-5" />
                                </button>
                            }
                            onClose={() => {}}
                            onDelete={() => handleDeleteCategory(subcategory.categoryId)}
                            title="Delete Category Confirmation"
                            description={`The "${subcategory.categoryName}" will be deleted permanently. Are you sure?`}
                        />
                    </div>
                </TableCell>
            </TableRow>
        );
    }
);

SubCategoryItem.displayName = 'SubCategoryItem';
