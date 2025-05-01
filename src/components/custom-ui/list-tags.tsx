import { Tag } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { hexToRgb } from '@/lib/utils';

export function ListTag({ tag }: { tag: Tag[] }) {
    if (!tag || tag.length === 0) return null;

    return (
        <TooltipProvider>
            <div className="mb-1 flex flex-wrap items-center gap-2">
                {tag.map((feature) => {
                    return (
                        <Tooltip key={feature.tagId}>
                            <TooltipTrigger asChild>
                                <span
                                    style={{
                                        backgroundColor: `rgba(${hexToRgb(feature.color || '')}, 0.2)`,
                                        color: feature.color,
                                        borderColor: `rgba(${hexToRgb(feature.color || '')}, 0.5)`,
                                        borderWidth: '1px',
                                    }}
                                    className={`max-w-[80px] overflow-hidden truncate whitespace-nowrap rounded-full border-opacity-50 px-2 py-1 text-xs md:max-w-[100px] lg:max-w-[120px]`}
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
