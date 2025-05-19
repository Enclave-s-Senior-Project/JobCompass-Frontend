import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { memo } from 'react';

export const PaginationListEnterprise = memo(() => {
    return (
        <div className="mt-8 flex items-center justify-center">
            <nav className="flex items-center gap-1" aria-label="Pagination">
                <Button variant="outline" className="h-8 w-8" disabled>
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" className="h-8 w-8 border-teal-200 bg-teal-50 text-teal-600">
                    1<span className="sr-only">Page 1</span>
                </Button>
                <Button variant="outline" className="h-8 w-8">
                    2<span className="sr-only">Page 2</span>
                </Button>
                <Button variant="outline" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                </Button>
            </nav>
        </div>
    );
});
