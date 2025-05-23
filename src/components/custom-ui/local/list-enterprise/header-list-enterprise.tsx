import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { memo } from 'react';
interface Props {
    total: number;
    option: 'ASC' | 'DESC';
    itemsPerPage: number;
    setOption: (value: 'ASC' | 'DESC') => void;
    setItemsPerPage: (value: number) => void;
}

export const HeaderListEnterprise = memo(({ total = 0, option, itemsPerPage, setOption, setItemsPerPage }: Props) => {
    return (
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Enterprise Listings</h2>
                    <p className="text-sm text-slate-500">Showing {total} results</p>
                </div>
                <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Sort by:</span>
                        <Select onValueChange={(value: 'ASC' | 'DESC') => setOption(value)}>
                            <SelectTrigger className="h-[40px] w-[140px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:border-slate-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder={option === 'ASC' ? 'Newest' : 'Oldest'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="ASC">Newest</SelectItem>
                                    <SelectItem value="DESC">Oldest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Show:</span>
                        <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
                            <SelectTrigger className="h-[40px] w-[140px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:border-slate-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder={`${itemsPerPage} per page`} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="space-y-1 py-2">
                                    <SelectItem value="2">2 per page</SelectItem>
                                    <SelectItem value="4">4 per page</SelectItem>
                                    <SelectItem value="6">6 per page</SelectItem>
                                    <SelectItem value="8">8 per page</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
});
