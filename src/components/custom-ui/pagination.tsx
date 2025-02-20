'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
export function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 7;
    const renderPageButtons = () => {
        const pages = [];
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(currentPage + 1, totalPages);
        if (currentPage === 1) {
            endPage = Math.min(3, totalPages);
        } else if (currentPage === totalPages) {
            startPage = Math.max(totalPages - 2, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={i === currentPage ? 'default' : 'outline'}
                    size="icon"
                    className="h-[48px] w-[48px]"
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </Button>
            );
        }

        return pages;
    };
    return (
        <div>
            {totalPages > 1 && (
                <div className="flex items-center justify-between mb-6">
                    <span className="text-[40px]">Related Jobs</span>
                    <nav className="flex items-center gap-2">
                        <Button
                            className="h-[48px] w-[48px]"
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {renderPageButtons()}

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-[48px] w-[48px]"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </nav>
                </div>
            )}
        </div>
    );
}
