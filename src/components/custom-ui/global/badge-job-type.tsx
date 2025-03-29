import { Badge } from '@/components/ui/badge';
import { JobTypeEnum } from '@/lib/common-enum';
import clsx from 'clsx';
import React from 'react';

export function BadgeJobType({ type }: { type: JobTypeEnum }) {
    return (
        <Badge
            className={clsx(
                'cursor-default border-none rounded-xl px-4 shadow-none',
                JobTypeEnum.fulltime == type
                    ? 'bg-primary-100 text-primary hover:text-white hover:bg-primary-400'
                    : JobTypeEnum.partTime == type
                      ? 'bg-green-100 text-green hover:text-white hover:bg-green-400'
                      : JobTypeEnum.contract == type
                        ? 'bg-warning-100 text-warning hover:text-white hover:bg-warning-400'
                        : ''
            )}
        >
            {type}
        </Badge>
    );
}
