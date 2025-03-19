import { Tag } from '@/types';
import { useMemo } from 'react';

export function ListTag({ tag }: { tag: Tag[] }) {
    // Danh sách màu có sẵn
    const featureColors = [
        { bg: 'bg-red-50', text: 'text-red-600' },
        { bg: 'bg-blue-50', text: 'text-blue-600' },
        { bg: 'bg-green-50', text: 'text-green-600' },
        { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        { bg: 'bg-purple-50', text: 'text-purple-600' },
    ];

    // Hàm random màu sắc
    const getRandomFeatureColor = () => {
        const randomIndex = Math.floor(Math.random() * featureColors.length);
        return featureColors[randomIndex];
    };

    // Gán màu cố định cho từng tag
    const tagColors = useMemo(() => {
        return tag?.reduce(
            (acc, feature) => {
                acc[feature.tagId] = getRandomFeatureColor();
                return acc;
            },
            {} as Record<string, { bg: string; text: string }>
        );
    }, [tag]);

    // Đảm bảo luôn gọi Hook trước khi return
    if (!tag || tag.length === 0) return null;

    return (
        <div className="flex items-center gap-2 mb-1">
            {tag.map((feature) => {
                const color = tagColors[feature.tagId];
                return (
                    <span
                        key={feature.tagId}
                        className={`text-xs px-2 py-1 rounded-full ${color.bg} ${color.text} border border-gray-300 border-opacity-50`}
                    >
                        {feature.name}
                    </span>
                );
            })}
        </div>
    );
}
