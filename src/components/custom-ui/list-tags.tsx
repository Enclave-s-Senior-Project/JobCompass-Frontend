import { Tag } from '@/types';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
            <div className="mb-1 flex flex-wrap items-center gap-2">
                {tag.map((feature) => {
                    const color = tagColors[feature.tagId];

                    return (
                        <Tooltip key={feature.tagId}>
                            <TooltipTrigger asChild>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${color.bg} ${color.text} max-w-[80px] overflow-hidden truncate whitespace-nowrap border border-gray-300 border-opacity-50 md:max-w-[100px] lg:max-w-[120px]`}
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
