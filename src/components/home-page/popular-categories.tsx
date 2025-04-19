'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { Category } from '@/types/categories-home-page.types';
import { HomePart } from './home-part';
import { motionVariant } from '@/lib/motion-variants';
import { IconPresent } from '../custom-ui/icon-present';
import { routes } from '@/configs/routes';

const categories: Category[] = [
    { name: 'Design & Creative', jobs: 235, icon: Building2 },
    { name: 'Development', jobs: 427, icon: Building2 },
    { name: 'Marketing', jobs: 264, icon: Building2 },
    { name: 'Finance', jobs: 154, icon: Building2 },
    { name: 'Design & Creative', jobs: 235, icon: Building2 },
    { name: 'Development', jobs: 427, icon: Building2 },
    { name: 'Marketing', jobs: 264, icon: Building2 },
    { name: 'Finance', jobs: 154, icon: Building2 },
];

export function PopularCategory() {
    return (
        <HomePart
            title="Popular category"
            linkNode={
                <Link href="#" className="flex items-center gap-2 text-primary">
                    View all <ArrowRight className="h-4 w-4" />
                </Link>
            }
        >
            <motion.div
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                variants={motionVariant.containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {categories.map((category: Category, index) => {
                    const Icon = category.icon;
                    return (
                        <motion.div key={index} variants={motionVariant.itemVariants}>
                            <IconPresent.Group className="rounded-md hover:bg-white hover:shadow-lg hover:shadow-primary-50 md:p-6">
                                <Link href={routes.home}>
                                    <div className="flex items-center gap-2 overflow-hidden md:gap-3">
                                        <IconPresent.Icon Icon={Icon} size="md" />
                                        <div>
                                            <h3 className="line-clamp-1 text-lg font-medium">{category.name}</h3>
                                            <p className="text-sm text-gray-600">{category.jobs} positions</p>
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
