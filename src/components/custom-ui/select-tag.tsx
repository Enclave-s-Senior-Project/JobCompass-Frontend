'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TagService } from '@/services/tag.service';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { Tag } from '@/types';

const CreatableSelect = dynamic(() => import('react-select/creatable'), { ssr: false });

interface SelectTagProps {
    value: Tag[];
    onChange: (selectedOptions: Tag[]) => void;
    options: Tag[];
}

const SelectTag = ({ value, onChange, options }: SelectTagProps) => {
    const [defaultTags, setDefaultTags] = useState<Tag[]>(options);

    const { data: resultQuery } = useQuery({
        queryKey: [queryKey.listTag],
        queryFn: async () => {
            try {
                const payload = await TagService.getAllTags();
                return payload;
            } catch (error: any) {
                console.log(error);
                return [];
            }
        },
        staleTime: 1000 * 60,
        refetchInterval: 1000 * 60,
        retry: 2,
        enabled: true,
    });

    useEffect(() => {
        if (resultQuery && Array.isArray(resultQuery)) {
            setDefaultTags(resultQuery);
        }
    }, [resultQuery]);

    const handleCreate = (inputValue: string) => {
        const newTag: Tag = {
            isActive: true,
            tagId: crypto.randomUUID(),
            name: inputValue,
            color: '#000000',
            backgroundColor: '#E5E7EB',
        };
        const updatedTags = [...value, newTag];
        setDefaultTags((prev) => [...prev, newTag]);
        onChange(updatedTags);
    };

    const handleChange = (newValue: unknown) => {
        onChange(newValue as Tag[]);
    };

    return (
        <CreatableSelect
            isMulti
            options={defaultTags}
            value={value}
            onChange={handleChange}
            onCreateOption={handleCreate}
            getOptionLabel={(tag) => (tag as Tag).name}
            getOptionValue={(tag) => (tag as Tag).tagId}
        />
    );
};

export default SelectTag;
