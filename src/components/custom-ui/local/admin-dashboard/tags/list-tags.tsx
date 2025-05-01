'use client';

import { AdminDashboardPagination } from '@/components/custom-ui/global/pagination-admin-dashboard';
import { DetailedRequest, Tag } from '@/types';
import { memo, useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { DeleteConfirmDialog } from '../../../global/dialog-delete-confirm';
import { cn, handleErrorToast } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { TagService } from '@/services';
import { useDebounce } from '@/hooks/useDebounce';
import { ItemTag } from './item-tag';
import { toast } from '@/lib/toast';
import { CreateTagDialog } from './dialog-create-tag';

type Props = {
    params: DetailedRequest.Pagination;
};
export const ListTags = memo(({ params }: Props) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchParams, setSearchParams] = useState(params);
    const searchDebounced = useDebounce(searchParams.options, 700);

    const { data, isFetching, isPending, isRefetching, refetch } = useQuery({
        queryKey: [queryKey.listTag, { ...searchParams, options: searchDebounced }],
        queryFn: async ({ queryKey }) => {
            try {
                return await TagService.getAllTags(queryKey[1] as DetailedRequest.Pagination);
            } catch (error) {
                handleErrorToast(error);
            }
        },
        refetchOnWindowFocus: false,
    });

    const createTagMutation = useMutation({
        mutationFn: async (data: Omit<Tag, 'isActive' | 'tagId' | 'createdAt' | 'updatedAt'>[]) => {
            await TagService.addTag(data);
        },
        onSuccess: () => {
            toast.success('Tag created successfully');
            refetch();
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const deleteTagsMutation = useMutation({
        mutationFn: async (tagIds: string[]) => {
            await TagService.deleteMany({ tagIds });
        },
        onSuccess: () => {
            toast.success('Tags deleted successfully');
            refetch();
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const handleSelectTag = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags((prev) => prev.filter((id) => id !== tagId));
        } else {
            setSelectedTags((prev) => [...prev, tagId]);
        }
    };

    const handleCreateTag = (name: string, color: string) => {
        if (!name || !color) {
            toast.error('Please fill in all fields');
            return;
        }
        createTagMutation.mutate([{ name, color }]);
    };

    return (
        <div className="space-y-5 p-4 md:p-8">
            <Card className="rounded-md shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
                    <CardTitle className="text-base font-medium">Tags Management</CardTitle>
                    <div className="flex items-center gap-2">
                        <Input
                            className="max-w-48 rounded-sm border text-sm placeholder:text-sm focus:border-zinc-400 focus-visible:ring-0"
                            placeholder="Tag name..."
                            value={searchParams.options}
                            onChange={(e) => {
                                setSearchParams((prev) => ({
                                    ...prev,
                                    options: e.target.value,
                                }));
                            }}
                        />
                        <CreateTagDialog
                            triggerNode={
                                <button className="rounded-sm p-1 text-green-500 transition-all hover:bg-green-50 [&_svg]:size-6">
                                    <Plus />
                                </button>
                            }
                            handleCreateCategory={(name: string, color: string) => handleCreateTag(name, color)}
                        />

                        <DeleteConfirmDialog
                            triggerNode={
                                <button
                                    className={cn(
                                        'rounded-sm p-1 text-danger-500 transition-all hover:bg-danger-50 [&_svg]:size-6',
                                        selectedTags.length === 0 ? 'opacity-50' : ''
                                    )}
                                    disabled={selectedTags.length === 0}
                                >
                                    <Trash />
                                </button>
                            }
                            onDelete={() => deleteTagsMutation.mutate(selectedTags)}
                            onClose={() => {}}
                            title="Delete Many Tags"
                            description="Your selected tags will be deleted permanently? Are you sure?"
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
                                        <TableHead>Color</TableHead>
                                        <TableHead>Preview</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Updated At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data && data?.data.length > 0 ? (
                                        data?.data.map((tag) => (
                                            <ItemTag
                                                key={tag.tagId}
                                                tag={tag}
                                                refetchTags={refetch}
                                                isSelected={selectedTags.includes(tag.tagId)}
                                                onSelect={handleSelectTag}
                                            />
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No tags found.
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

ListTags.displayName = 'ListTags';
