'use client';

import { AdminDashboardPagination } from '@/components/custom-ui/global/pagination-admin-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { queryKey } from '@/lib/react-query/keys';
import { cn, handleErrorToast } from '@/lib/utils';
import { CategoryService } from '@/services';
import { DetailedRequest } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus, Trash } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { BiCollapse, BiExpand } from 'react-icons/bi';
import { CategoryItem } from './item-category';
import { toast } from '@/lib/toast';

import { CreateCategoryDialog } from './dialog-create-category';
import { DeleteCategoryDialog } from './dialog-delete-category';

type Props = {
    params: DetailedRequest.Pagination;
};

export const ListCategories = memo(({ params }: Props) => {
    const [searchParams, setSearchParams] = useState<DetailedRequest.Pagination>(params);

    const [categoriesExpanded, setCategoriesExpanded] = useState<Record<string, boolean>>({});

    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const { data, isFetching, isPending, isRefetching, refetch } = useQuery({
        queryKey: [queryKey.categoriesPrimary, searchParams],
        queryFn: async ({ queryKey }) => {
            try {
                return await CategoryService.getPrimaryCategories(queryKey[1] as DetailedRequest.Pagination);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const createCategoryMutation = useMutation({
        mutationFn: async (data: DetailedRequest.CreateCategory) => await CategoryService.createCategory(data),
        onSuccess: () => {
            refetch();
            toast.success('Category created successfully!');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const deleteManyCategoryMutation = useMutation({
        mutationFn: async (ids: string[]) => await CategoryService.deleteMany({ categoryIds: ids }),
        onSuccess: () => {
            refetch();
            toast.success('Categories deleted successfully!');
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    useEffect(() => {
        if (data?.data) {
            const initialExpandedState: Record<string, boolean> = {};
            data.data.forEach((category) => {
                initialExpandedState[category.categoryId] = categoriesExpanded[category.categoryId] || false;
            });
            setCategoriesExpanded(initialExpandedState);
        }
    }, [data?.data]);

    const handleExpendAllCategories = () => {
        if (!data?.data) return;
        const newState: Record<string, boolean> = {};
        data.data.forEach((category) => {
            newState[category.categoryId] = true;
        });
        setCategoriesExpanded(newState);
    };

    const handleCollapseAllCategories = () => {
        if (!data?.data) return;
        const newState: Record<string, boolean> = {};
        data.data.forEach((category) => {
            newState[category.categoryId] = false;
        });
        setCategoriesExpanded(newState);
    };

    const handleToggleCategories = () => {
        if (Object.values(categoriesExpanded).some((isExpanded) => isExpanded)) {
            handleCollapseAllCategories();
        } else {
            handleExpendAllCategories();
        }
    };

    const handleSelectPrimaryCategory = (categoryId: string) => {
        if (!data?.data) return;
        const category = data.data.find((cat) => cat.categoryId === categoryId);
        if (!category) return;
        const childrenIds = category.children?.map((sub) => sub.categoryId) || [];
        setSelectedCategory((prev) => {
            const prevSet = new Set(prev);
            if (prevSet.has(categoryId)) {
                const toRemove = new Set([categoryId, ...childrenIds]);
                return prev.filter((id) => !toRemove.has(id));
            } else {
                return Array.from(new Set([...prev, categoryId, ...childrenIds]));
            }
        });
    };

    const handleSelectChildrenCategory = (categoryId: string) => {
        if (!data?.data) return;

        let parentCategory,
            childrenIds: string[] = [];

        for (const cat of data.data) {
            if (cat.children?.some((sub) => sub.categoryId === categoryId)) {
                parentCategory = cat;
                childrenIds = cat.children.map((sub) => sub.categoryId);
                break;
            }
        }

        if (!parentCategory) return;

        const parentCategoryId = parentCategory.categoryId;

        // Handle selection logic outside of setState
        const prevSelected = selectedCategory;
        const prevSet = new Set(prevSelected);
        let newSelected: string[];

        if (prevSet.has(categoryId)) {
            prevSet.delete(categoryId);
            prevSet.delete(parentCategoryId);
            newSelected = Array.from(prevSet);
        } else {
            prevSet.add(categoryId);
            newSelected = Array.from(prevSet);
        }

        setSelectedCategory(newSelected);
    };

    const handleCreatePrimaryCategory = (categoryName: string) => {
        createCategoryMutation.mutate({ categoryName: categoryName });
    };

    const handleDeleteManyCategories = () => {
        if (selectedCategory.length === 0) {
            toast.error('Please select at least one category to delete.');
            return;
        }
        deleteManyCategoryMutation.mutate(selectedCategory);
    };

    return (
        <div className="space-y-5 p-4 md:p-8">
            <Card className="rounded-md shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
                    <CardTitle className="text-base font-medium">Categories Management</CardTitle>
                    <div className="flex items-center gap-2">
                        <button
                            className="rounded-sm p-1 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-800 [&_svg]:size-6"
                            onClick={handleToggleCategories}
                        >
                            {Object.values(categoriesExpanded).some((isExpanded) => isExpanded) ? (
                                <BiCollapse />
                            ) : (
                                <BiExpand />
                            )}
                        </button>

                        <CreateCategoryDialog
                            triggerNode={
                                <button className="rounded-sm p-1 text-green-500 transition-all hover:bg-green-50 [&_svg]:size-6">
                                    <Plus />
                                </button>
                            }
                            handleCreateCategory={handleCreatePrimaryCategory}
                        />

                        <DeleteCategoryDialog
                            triggerNode={
                                <button
                                    disabled={selectedCategory.length === 0}
                                    className={cn(
                                        'rounded-sm p-1 text-danger-500 transition-all hover:bg-danger-50 [&_svg]:size-6',
                                        selectedCategory.length === 0 ? 'pointer-events-none opacity-50' : ''
                                    )}
                                >
                                    <Trash />
                                </button>
                            }
                            onDelete={handleDeleteManyCategories}
                            onClose={() => {}}
                            title="Are you sure that these categories will be deleted?"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {isPending || (isFetching && !isRefetching) ? (
                        <div className="flex h-96 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Subcategories</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Updated At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data && data.data.length > 0 ? (
                                        data.data.map((category, index) => (
                                            <CategoryItem
                                                key={category.categoryId}
                                                category={category}
                                                index={index}
                                                isExpanded={categoriesExpanded[category.categoryId]}
                                                onToggleExpand={(idx) =>
                                                    setCategoriesExpanded((prev) => ({
                                                        ...prev,
                                                        [data.data[idx].categoryId]: !prev[data.data[idx].categoryId],
                                                    }))
                                                }
                                                selectedCategory={selectedCategory}
                                                onSelectPrimary={handleSelectPrimaryCategory}
                                                onSelectChild={handleSelectChildrenCategory}
                                                refetchCategoryList={refetch}
                                                createCategoryMutation={createCategoryMutation}
                                            />
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No categories found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </CardContent>
            </Card>

            <AdminDashboardPagination
                page={searchParams.page || 1}
                setPage={(page) => setSearchParams((prev) => ({ ...prev, page }))}
                meta={data?.meta}
            />
        </div>
    );
});

ListCategories.displayName = 'ListCategories';
