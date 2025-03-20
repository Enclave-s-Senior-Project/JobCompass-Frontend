import { Tag } from '@/types';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Đường dẫn đến Tooltip của shadcn/ui

export function ListTag({ tag }: { tag: Tag[] }) {
    const featureColors = [
        { bg: 'bg-red-50', text: 'text-red-600' },
        { bg: 'bg-blue-50', text: 'text-blue-600' },
        { bg: 'bg-green-50', text: 'text-green-600' },
        { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        { bg: 'bg-purple-50', text: 'text-purple-600' },
    ];

    const getRandomFeatureColor = () => {
        const randomIndex = Math.floor(Math.random() * featureColors.length);
        return featureColors[randomIndex];
    };

    const tagColors = useMemo(() => {
        return tag?.reduce(
            (acc, feature) => {
                acc[feature.tagId] = getRandomFeatureColor();
                return acc;
            },
            {} as Record<string, { bg: string; text: string }>
        );
    }, [tag]);

    if (!tag || tag.length === 0) return null;

    return (
        <TooltipProvider>
            <div className="flex flex-wrap items-center gap-2 mb-1">
                {tag.map((feature) => {
                    const color = tagColors[feature.tagId];

                    return (
                        <Tooltip key={feature.tagId}>
                            <TooltipTrigger asChild>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${color.bg} ${color.text} border border-gray-300 border-opacity-50 
                                    max-w-[80px] md:max-w-[100px] lg:max-w-[120px] truncate whitespace-nowrap overflow-hidden`}
                                >
                                    {feature.name}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-sm">{feature.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}
