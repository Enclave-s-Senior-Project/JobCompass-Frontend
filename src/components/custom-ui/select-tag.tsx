'use client';
import type React from 'react';
import { useActionState, useState } from 'react';
import { postJob } from '@/lib/action';
import CreatableSelect from 'react-select/creatable';
import { Tag } from '@/types';

export function SelectTag(props: { defaultTags: Tag[] }) {
    const { defaultTags } = props;
    const handleCreate = (inputValue: string) => {
        const newTag: Tag = {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            tagId: crypto.randomUUID(),
            name: inputValue,
            color: '#000000',
            backgroundColor: '#E5E7EB',
        };

        // Thêm tag mới vào defaultTags và jobData.tags
        setJobData((prev) => ({
            ...prev,
            tags: [...prev.tags, newTag],
        }));

        defaultTags.push(newTag); // Cập nhật defaultTags nếu cần (nếu defaultTags là state thì dùng setState)
    };

    const [state, onSubmit, isPending] = useActionState(postJob, {
        title: '',
        tags: [] as Tag[],
        minSalary: '',
        maxSalary: '',
        description: '',
        responsibilities: '',
    });
    const [jobData, setJobData] = useState({
        title: '',
        tags: [] as Tag[], // Khởi tạo tags mặc định là rỗng
        minSalary: '',
        maxSalary: '',
        description: '',
        responsibilities: '',
    });

    const [description, setDescription] = useState(state.description);
    const handleDescription = (content: string) => {
        setDescription(content);
    };
    return (
        <>
            <CreatableSelect
                id="tags"
                isMulti
                options={defaultTags}
                value={jobData.tags}
                onChange={(newValue) => setJobData({ ...jobData, tags: newValue as Tag[] })}
                onCreateOption={handleCreate}
                placeholder="Select or create tags..."
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.tagId}
                className="react-select-container"
                styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: '48px', // Đặt minHeight thay vì height cố định
                        borderRadius: '0.375rem',
                        maxHeight: '150px', // Giới hạn chiều cao tối đa
                        overflowY: 'auto', // Thêm thanh cuộn khi cần
                    }),
                    multiValue: (base, { data }) => ({
                        ...base,
                        backgroundColor: (data as Tag).backgroundColor,
                        borderRadius: '0.375rem',
                        padding: '2px 8px',
                        display: 'flex',
                        alignItems: 'center',
                    }),
                    multiValueLabel: (base, { data }) => ({
                        ...base,
                        color: (data as Tag).color,
                        fontSize: '1rem',
                        padding: '2px',
                    }),
                    multiValueRemove: (base, { data }) => ({
                        ...base,
                        color: '#000000',
                        backgroundColor: (data as Tag).backgroundColor,
                        borderRadius: '0.375rem',
                        paddingLeft: '0',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: `${(data as Tag).backgroundColor}CC`,
                            color: '#FFFFFF',
                        },
                    }),
                }}
            />
        </>
    );
}
