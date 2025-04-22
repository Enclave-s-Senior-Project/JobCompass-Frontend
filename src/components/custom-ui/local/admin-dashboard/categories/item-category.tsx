import { TableCell, TableRow } from '@/components/ui/table';
import { toast } from '@/lib/toast';
import { cn, handleErrorToast, toFormattedDate } from '@/lib/utils';
import { CategoryService } from '@/services';
import { Categories, DetailedRequest, DetailedResponse } from '@/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Check, ChevronRight, Plus, SquarePen, Trash } from 'lucide-react';
import { useState, memo } from 'react';
import { CreateCategoryDialog } from './dialog-create-category';
import { SubCategoryItem } from './item-subcategory';
import { DeleteCategoryDialog } from './dialog-delete-category';

type Props = {
    category: Categories & { children?: Categories[] };
    index: number;
    isExpanded: boolean;
    onToggleExpand: (idx: number) => void;
    selectedCategory: string[];
    onSelectPrimary: (id: string) => void;
    onSelectChild: (id: string) => void;
    refetchCategoryList: () => void;
    createCategoryMutation: UseMutationResult<any, unknown, DetailedRequest.CreateCategory>;
};

export const CategoryItem = memo(
    ({
        category,
        index,
        isExpanded,
        onToggleExpand,
        selectedCategory,
        onSelectPrimary,
        onSelectChild,
        refetchCategoryList,
        createCategoryMutation,
    }: Props) => {
        const [editable, setEditable] = useState(false);
        const [categoryName, setCategoryName] = useState(category.categoryName);

        const updateCategoryMutation = useMutation({
            mutationFn: async ({ categoryId, categoryName }: { categoryId: string; categoryName: string }) => {
                await CategoryService.updateCategory({ categoryId, categoryName: categoryName.trim() });
            },
            onSuccess: () => {
                setEditable(false);
                if (refetchCategoryList) {
                    refetchCategoryList();
                }

                toast.success('Category updated successfully!');
            },
            onError: (error) => {
                handleErrorToast(error);
            },
        });

        const deleteCategoryMutation = useMutation({
            mutationFn: async (categoryId: string) => {
                await CategoryService.deleteOne({ categoryId });
            },
            onSuccess: () => {
                if (refetchCategoryList) {
                    refetchCategoryList();
                }
                toast.success('Category deleted successfully!');
            },
            onError: (error) => {
                handleErrorToast(error);
            },
        });

        const handleToggleEdit = (e: any) => {
            e?.stopPropagation();
            if (editable) {
                setCategoryName(category.categoryName);
            }
            setEditable(!editable);
        };

        const handleCreateSubcategory = (categoryName: string) => {
            createCategoryMutation.mutate({
                categoryName,
                parentId: category.categoryId,
            });
        };

        const handleSubmitEdit = (e: React.FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (categoryName !== category.categoryName) {
                updateCategoryMutation.mutate({ categoryId: category.categoryId, categoryName });
            }
        };

        return (
            <>
                <TableRow className="bg-muted" onClick={() => onToggleExpand(index)}>
                    <TableCell className="flex h-16 items-center gap-4">
                        <form className="flex items-center gap-2" onSubmit={handleSubmitEdit}>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={category.categoryId}
                                    checked={selectedCategory.includes(category.categoryId)}
                                    onChange={() => onSelectPrimary(category.categoryId)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <ChevronRight
                                    className={cn(
                                        'size-5 text-gray-500 transition-all',
                                        isExpanded ? 'rotate-90' : 'rotate-0'
                                    )}
                                />
                            </div>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                onClick={(e) => {
                                    if (editable) {
                                        e.stopPropagation();
                                    }
                                }}
                                className={cn(
                                    'h-10',
                                    !editable
                                        ? 'pointer-events-none bg-transparent'
                                        : 'border border-gray-200 bg-white p-2'
                                )}
                            />
                            {editable && categoryName !== category.categoryName && (
                                <button type="submit" className="h-10 border bg-white p-3 hover:border-gray-500">
                                    <Check className="size-4 text-gray-600" />
                                </button>
                            )}
                        </form>
                    </TableCell>
                    <TableCell>
                        <p>{category.children?.length || 0} subcategories</p>
                    </TableCell>
                    <TableCell>
                        <p>{toFormattedDate(category.createdAt)}</p>
                    </TableCell>
                    <TableCell>
                        <p>{toFormattedDate(category.updatedAt)}</p>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                className="rounded-sm p-1 text-primary-500 hover:bg-primary-50"
                                onClick={handleToggleEdit}
                            >
                                <SquarePen className="size-5" />
                            </button>
                            <DeleteCategoryDialog
                                triggerNode={
                                    <button className="rounded-sm p-1 text-danger-500 hover:bg-danger-50">
                                        <Trash className="size-5" />
                                    </button>
                                }
                                onClose={() => {}}
                                onDelete={() => {
                                    deleteCategoryMutation.mutate(category.categoryId);
                                }}
                            />

                            <CreateCategoryDialog
                                triggerNode={
                                    <button
                                        className="rounded-sm p-1 text-green-500 hover:bg-green-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Plus className="size-5" />
                                    </button>
                                }
                                handleCreateCategory={handleCreateSubcategory}
                            />
                        </div>
                    </TableCell>
                </TableRow>
                {isExpanded &&
                    category.children?.map((subcategory) => (
                        <SubCategoryItem
                            key={subcategory.categoryId}
                            subcategory={subcategory}
                            selectedCategory={selectedCategory}
                            onSelectChild={onSelectChild}
                            handleUpdateCategory={(categoryId: string, categoryName: string) =>
                                updateCategoryMutation.mutate({
                                    categoryId,
                                    categoryName,
                                })
                            }
                            handleDeleteCategory={(categoryId: string) => deleteCategoryMutation.mutate(categoryId)}
                        />
                    ))}
            </>
        );
    }
);
