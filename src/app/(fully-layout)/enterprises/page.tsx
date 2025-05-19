'use client';
import CardEnterprisesHorizontal from '@/components/custom-ui/card-enterprises-horizontal';
import { CardListEnterprise } from '@/components/custom-ui/local/list-enterprise/card-list-enterprise';
import { FilterListEnterprise } from '@/components/custom-ui/local/list-enterprise/filter-list-enterprise';
import { HeaderListEnterprise } from '@/components/custom-ui/local/list-enterprise/header-list-enterprise';
import { PaginationListEnterprise } from '@/components/custom-ui/local/list-enterprise/pagination-list-enterprise';
export default function Enterprises() {
    return (
        // <div className="container mx-auto max-w-screen-xl">
        //     <CardEnterprisesHorizontal />
        // </div>
        <div className="container mx-auto max-w-screen-xl">
            <main className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Sidebar Filters */}
                        <FilterListEnterprise />
                        <div className="flex-1">
                            <HeaderListEnterprise />
                            <CardListEnterprise />
                            <PaginationListEnterprise />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
