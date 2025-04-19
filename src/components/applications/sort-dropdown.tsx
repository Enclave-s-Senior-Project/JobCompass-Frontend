'use client';

import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function SortDropdown() {
    const [sortOption, setSortOption] = useState('newest');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="primary">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <div className="p-2 font-medium">SORT APPLICATION</div>
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                    <DropdownMenuRadioItem value="newest">
                        <div className="flex items-center gap-2">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-primary">
                                {sortOption === 'newest' && <div className="h-2 w-2 rounded-full bg-primary" />}
                            </div>
                            <span>Newest</span>
                        </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">
                        <div className="flex items-center gap-2">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-primary">
                                {sortOption === 'oldest' && <div className="h-2 w-2 rounded-full bg-primary" />}
                            </div>
                            <span>Oldest</span>
                        </div>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
