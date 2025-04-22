'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { toast } from '@/lib/toast';
import { cn, handleErrorToast, hexToRgb, toFormattedDate } from '@/lib/utils';
import { TagService } from '@/services';
import { Tag } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Check, SquarePen, Trash } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { DeleteConfirmDialog } from '../../../global/dialog-delete-confirm';

type Props = {
    tag: Tag;
    refetchTags: () => void;
    isSelected: boolean;
    onSelect: (tagId: string) => void;
};

export const ItemTag = memo(({ tag, refetchTags, isSelected, onSelect }: Props) => {
    const [name, setName] = useState(tag.name);
    const [color, setColor] = useState(tag.color);
    const [rgb, setRgb] = useState(hexToRgb(tag.color || ''));
    const [editable, setEditable] = useState(false);

    const updateTagMutation = useMutation({
        mutationFn: async ({ tagId, name, color }: { tagId: string; name: string; color: string }) => {
            await TagService.updateTag(tagId, { name: name.trim(), color: color });
        },
        onSuccess: () => {
            setEditable(false);
            toast.success('Tag updated successfully');
            refetchTags();
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    const deleteTagMutation = useMutation({
        mutationFn: async (tagId: string) => {
            await TagService.deleteOne({ tagId });
        },
        onSuccess: () => {
            toast.success('Tag deleted successfully');
            refetchTags();
        },
        onError: (error) => {
            console.error(error);
            handleErrorToast(error);
        },
    });

    useEffect(() => {
        if (color) setRgb(hexToRgb(color));
    }, [color]);

    const toggleEditable = () => {
        if (editable) {
            setColor(tag.color);
            setName(tag.name);
            setRgb(hexToRgb(tag.color || ''));
            setEditable(false);
        } else {
            setEditable(true);
        }
    };

    const handleUpdate = () => {
        if (!editable || !name || !color) return;
        updateTagMutation.mutate({ tagId: tag.tagId, name, color: color });
    };

    return (
        <TableRow className={cn(editable ? 'bg-zinc-200' : '')}>
            <TableCell className="flex items-center gap-2">
                <input type="checkbox" checked={isSelected} onChange={() => onSelect(tag.tagId)} />
                <input
                    className={cn('px-2 py-2', editable ? 'border border-gray-200 bg-white' : 'bg-transparent')}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editable}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            handleUpdate();
                        }
                    }}
                />
                {editable && (name !== tag.name || color !== tag.color) && (
                    <button
                        type="submit"
                        className="h-10 border bg-white p-3 hover:border-gray-500"
                        onClick={handleUpdate}
                    >
                        <Check className="size-4 text-gray-600" />
                    </button>
                )}
            </TableCell>
            <TableCell>
                <input
                    className="h-5"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={!editable}
                />
            </TableCell>
            <TableCell>
                <span className="rounded-3xl px-2 py-1" style={{ color: color, backgroundColor: `rgba(${rgb}, 0.2)` }}>
                    {name}
                </span>
            </TableCell>
            <TableCell>{toFormattedDate(tag.createdAt)}</TableCell>
            <TableCell>{toFormattedDate(tag.updatedAt)}</TableCell>
            <TableCell>
                <div className="flex items-center justify-end gap-2">
                    <button className="rounded-sm p-1 text-primary-500 hover:bg-primary-50" onClick={toggleEditable}>
                        <SquarePen className="size-5" />
                    </button>
                    <DeleteConfirmDialog
                        triggerNode={
                            <button className="rounded-sm p-1 text-danger-500 hover:bg-danger-50">
                                <Trash className="size-5" />
                            </button>
                        }
                        title="Tag Delete Confirmation"
                        description={`Tag "${tag.name}" will be deleted permanently. Are you sure?`}
                        onDelete={() => deleteTagMutation.mutate(tag.tagId)}
                        onClose={() => {}}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
});

ItemTag.displayName = 'ItemTag';
