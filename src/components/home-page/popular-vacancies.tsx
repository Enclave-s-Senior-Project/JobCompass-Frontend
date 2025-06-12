'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomePart } from './home-part';
import { motionVariant } from '@/lib/motion-variants';
import { queryKey } from '@/lib/react-query/keys';
import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '@/services/dashboard.service';
import { handleErrorToast } from '@/lib/utils';

export function PopularVacancies() {
    const { data } = useQuery({
        queryKey: [queryKey.getCategoryChildHomePage],
        queryFn: async () => {
            try {
                return await DashboardService.getCategoryChildHomePage();
            } catch (error) {
                handleErrorToast(error);
            }
        },
        retry: 1,
    });

    const columns = data
        ? Array.from({ length: Math.ceil(data.length / 3) }, (_, i) => data.slice(i * 3, i * 3 + 3))
        : [];

    return (
        <HomePart title="Most Popular Vacancies">
            <motion.div
                className="grid grid-cols-2 gap-x-10 gap-y-12 text-center md:text-left lg:grid-cols-4"
                variants={motionVariant.containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {columns.map((column, i) => (
                    <motion.div key={i} className="space-y-4" variants={motionVariant.itemVariants}>
                        {column.map((job, j) => (
                            <Link
                                key={j}
                                href="#"
                                className="block text-lg transition-colors duration-300 hover:text-primary"
                            >
                                {job}
                            </Link>
                        ))}
                    </motion.div>
                ))}
            </motion.div>
        </HomePart>
    );
}
