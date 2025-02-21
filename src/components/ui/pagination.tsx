import * as React from 'react';
import { ArrowLeft, ArrowRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
        <ul ref={ref} className={cn('flex flex-row items-center justify-center', className)} {...props} />
    )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('flex-1', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
    isActive?: boolean;
    disabled?: boolean;
    isNavigate?: boolean;
} & Pick<ButtonProps, 'size'> &
    React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, isNavigate, size = 'icon-lg', ...props }: PaginationLinkProps) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? 'primary' : isNavigate ? 'secondary' : 'ghost',
                size,
            }),
            'rounded-full min-h-12 min-w-12 shadow-none',
            className
        )}
        {...props}
    />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        isNavigate={true}
        className={cn(
            buttonVariants({
                variant: 'secondary',
                size: 'icon-lg',
            }),
            'p-3 rounded-full shadow-none',
            props.disabled ? 'opacity-60 pointer-events-none' : '',
            className
        )}
        {...props}
    >
        <ArrowLeft />
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        isNavigate={true}
        className={cn(
            buttonVariants({
                variant: 'secondary',
                size: 'icon-lg',
            }),
            'p-3 rounded-full shadow-none',
            className
        )}
        {...props}
    >
        <ArrowRight />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span aria-hidden className={cn('flex h-12 w-12 items-center justify-center', className)} {...props}>
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
