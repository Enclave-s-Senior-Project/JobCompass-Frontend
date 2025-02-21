'use client';

import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
// import { useSearchParams } from 'next/navigation';

// const ITEM_PER_PAGE = 10;

export default function JobWishListPage() {
    // const search = useSearchParams();

    // const page = Number(search.get('page') || 1);

    return (
        <div className="p-12 space-y-3">
            <div className="flex items-center">
                <h5 className="text-lg text-gray-900 font-medium">Favorite Jobs</h5>&nbsp;
                <span className="text-base text-gray-400 font-normal">(17)</span>
            </div>
            <div></div>
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem className="mr-2">
                            <PaginationPrevious href="#" disabled={true} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem className="ml-2">
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
