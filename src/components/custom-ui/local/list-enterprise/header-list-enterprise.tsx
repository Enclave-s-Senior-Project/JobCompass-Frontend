import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { ArrowUpDown } from 'lucide-react';
import { memo } from 'react';

export const HeaderListEnterprise = memo(() => {
    return (
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Enterprise Listings</h2>
                    <p className="text-sm text-slate-500">Showing 4 results</p>
                </div>
                <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
                    <Tabs defaultValue="all" className="w-full md:w-auto">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="featured">Featured</TabsTrigger>
                            <TabsTrigger value="verified">Verified</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Sort by:</span>
                        <Button variant="ghost" className="gap-1">
                            <span className="text-sm">Newest</span>
                            <ArrowUpDown className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});
