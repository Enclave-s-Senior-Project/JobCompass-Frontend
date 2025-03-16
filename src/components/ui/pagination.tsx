import * as React from 'react';
import { ArrowLeft, ArrowRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { DetailedRequest, Meta } from '@/types';

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
    React.ComponentProps<'a'> & { href: Url };

const PaginationLink = ({ className, isActive, isNavigate, size = 'icon-lg', ...props }: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? 'primary' : isNavigate ? 'secondary' : 'ghost',
                size,
            }),
            'rounded-full min-h-12 min-w-12 shadow-none',
            props.disabled ? 'opacity-60 pointer-events-none' : '',
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

const getPageNumbers = (meta: Meta) => {
    const rangeWithDots: Array<number | string> = [];
    const currentPage = meta?.page;
    const totalPages = meta?.pageCount;

    // Always show first page
    rangeWithDots.push(1);

    if (currentPage <= 3) {
        // Near start: show 2,3
        for (let i = 2; i <= Math.min(3, totalPages - 1); i++) {
            rangeWithDots.push(i);
        }
        if (totalPages > 4) {
            rangeWithDots.push('ellipsis');
        }
    } else if (currentPage >= totalPages - 2) {
        // Near end: show last 3 pages
        if (totalPages > 4) {
            rangeWithDots.push('ellipsis');
        }
        for (let i = Math.max(totalPages - 2, 2); i < totalPages; i++) {
            rangeWithDots.push(i);
        }
    } else {
        // Middle: show current page and one adjacent
        rangeWithDots.push('ellipsis1');
        rangeWithDots.push(currentPage);
        rangeWithDots.push('ellipsis2');
    }

    // Always show last page if different from first
    if (totalPages > 1) {
        rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
};

const PrimaryPagination = ({
    meta,
    totalPages,
    pagination,
}: {
    meta: Meta;
    pagination: DetailedRequest.Pagination;
    totalPages: number | string;
}) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="mr-2">
                    <PaginationPrevious
                        href={`?page=${Number(meta?.page) - 1}&order=${pagination.order}&option=${pagination.options}`}
                        disabled={!meta?.hasPreviousPage}
                    />
                </PaginationItem>
                {getPageNumbers({ ...meta, pageCount: totalPages } as Meta).map((pageNum, index) =>
                    pageNum === 'ellipsis1' || pageNum === 'ellipsis2' || pageNum === 'ellipsis' ? (
                        <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={`?page=${pageNum}&order=${pagination.order}&option=${pagination.options}`}
                                isActive={meta?.page === pageNum}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                <PaginationItem className="ml-2">
                    <PaginationNext
                        href={`?page=${Number(meta?.page) + 1}&order=${pagination.order}&option=${pagination.options}`}
                        disabled={!meta?.hasNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    getPageNumbers,
    PrimaryPagination,
};
