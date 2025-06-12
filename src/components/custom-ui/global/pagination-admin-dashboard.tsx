import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Meta } from '@/types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { memo } from 'react';

type PaginationProps = {
    meta?: Meta;
    setPage: (page: number) => void;
    page: number;
};
export const AdminDashboardPagination = memo(({ meta, page, setPage }: PaginationProps) => {
    const handlePrevPage = () => {
        if (meta && page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (meta && page < meta?.pageCount) {
            setPage(page + 1);
        }
    };

    const handleSelectPage = (selectedPage: number) => {
        if (meta && selectedPage > 0 && selectedPage <= meta?.pageCount) {
            setPage(selectedPage);
        }
    };

    const handleToFirstPage = () => {
        if (meta && page > 1) {
            setPage(1);
        }
    };

    const handleToLastPage = () => {
        if (meta && page < meta?.pageCount) {
            setPage(meta.pageCount);
        }
    };

    return (
        <Pagination>
            <PaginationContent className="gap-1">
                <PaginationItem>
                    <Button size="icon-md" variant="ghost" className="h-9 border-gray-100" onClick={handleToFirstPage}>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button size="icon-md" variant="ghost" className="h-9 border-gray-100" onClick={handlePrevPage}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                {page - 1 > 1 && <PaginationEllipsis />}
                {page - 1 > 0 && (
                    <PaginationItem>
                        <Button
                            size="md"
                            variant="ghost"
                            className="h-9 border-gray-100"
                            onClick={() => handleSelectPage(page - 1)}
                        >
                            {page - 1}
                        </Button>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <Button
                        size="md"
                        variant="ghost"
                        className="h-9 border-gray-100 bg-gray-800 text-white"
                        onClick={() => handleSelectPage(page)}
                    >
                        {page}
                    </Button>
                </PaginationItem>
                {meta && page + 1 <= meta.pageCount && (
                    <PaginationItem>
                        <Button
                            size="md"
                            variant="ghost"
                            className="h-9 border-gray-100"
                            onClick={() => handleSelectPage(page + 1)}
                        >
                            {page + 1}
                        </Button>
                    </PaginationItem>
                )}
                {meta && page + 1 < meta.pageCount && <PaginationEllipsis />}
                <PaginationItem>
                    <Button size="icon-md" variant="ghost" className="h-9 border-gray-100" onClick={handleNextPage}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button size="icon-md" variant="ghost" className="h-9 border-gray-100" onClick={handleToLastPage}>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
});

AdminDashboardPagination.displayName = 'AdminDashboardPagination';
