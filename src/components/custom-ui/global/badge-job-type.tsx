import { Badge } from '@/components/ui/badge';
import { JobTypeEnum } from '@/lib/common-enum';
import clsx from 'clsx';
import React from 'react';

export function BadgeJobType({ type }: { type: JobTypeEnum }) {
    return (
        <Badge
            className={clsx(
                'cursor-default rounded-xl border-none px-4 shadow-none',
                JobTypeEnum.FULL_TIME == type
                    ? 'bg-primary-100 text-primary hover:bg-primary-400 hover:text-white'
                    : JobTypeEnum.PART_TIME == type
                      ? 'bg-green-100 text-green hover:bg-green-400 hover:text-white'
                      : JobTypeEnum.CONTRACT == type
                        ? 'bg-warning-100 text-warning hover:bg-warning-400 hover:text-white'
                        : ''
            )}
        >
            {type}
        </Badge>
    );
}
