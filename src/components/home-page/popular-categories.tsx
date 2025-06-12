'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { HomePart } from './home-part';
import { motionVariant } from '@/lib/motion-variants';
import { IconPresent } from '../custom-ui/icon-present';
import { routes } from '@/configs/routes';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/lib/react-query/keys';
import { DashboardService } from '@/services/dashboard.service';
import { handleErrorToast } from '@/lib/utils';

export function PopularCategory() {
    const { data } = useQuery({
        queryKey: [queryKey.getCategoryHomePage],
        queryFn: async () => {
            try {
                return await DashboardService.getCategoryHomePage();
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 1,
    });
    return (
        <HomePart
            title="Popular category"
            // linkNode={
            //     <Link href="#" className="flex items-center gap-2 text-primary">
            //         View all <ArrowRight className="h-4 w-4" />
            //     </Link>
            // }
        >
            <motion.div
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                variants={motionVariant.containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {data?.map((category, index) => {
                    const Icon = Building2;
                    return (
                        <motion.div key={index} variants={motionVariant.itemVariants}>
                            <IconPresent.Group className="rounded-md hover:bg-white hover:shadow-lg hover:shadow-primary-50 md:p-6">
                                <Link href={routes.home}>
                                    <div className="flex items-center gap-2 overflow-hidden md:gap-3">
                                        <IconPresent.Icon Icon={Icon} size="md" />
                                        <div>
                                            <h3 className="line-clamp-1 text-lg font-medium">
                                                {category.categoryName}
                                            </h3>
                                            {/* <p className="text-sm text-gray-600">{category.jobs} positions</p> */}
                                        </div>
                                    </div>
                                </Link>
                            </IconPresent.Group>
                        </motion.div>
                    );
                })}
            </motion.div>
        </HomePart>
    );
}
