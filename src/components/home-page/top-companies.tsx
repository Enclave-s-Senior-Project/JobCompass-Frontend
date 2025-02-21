'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { HomePart } from './home-part';

export function TopCompanies() {
    const [index, setIndex] = useState(0);
    const totalCompanies = companies.length;
    const itemsPerPage = 8;

    const nextSlide = useCallback(() => {
        setIndex((prev) => (prev + itemsPerPage) % totalCompanies);
    }, [itemsPerPage, totalCompanies]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const prevSlide = () => {
        setIndex((prev) => (prev - itemsPerPage + totalCompanies) % totalCompanies);
    };

    return (
        <HomePart title="Top Companies">
            <section className="relative container max-w-screen-xl mx-auto px-4">
                <Button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
                    variant="outline"
                    size="icon-lg"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
                    variant="outline"
                    size="icon-lg"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="relative overflow-hidden min-h-[440px]">
                    <AnimatePresence initial={false} custom={index}>
                        <motion.div
                            key={index}
                            className="absolute w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-visible"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', ease: 'easeInOut', duration: 1 }}
                        >
                            {companies.slice(index, index + itemsPerPage).map((company, i) => (
                                <motion.div
                                    key={i}
                                    className="flex flex-col items-center rounded-lg border-2 border-gray-50 p-8 gap-8 text-center transition-all duration-300 hover:border-blue-500"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={company.logo || '/placeholder.svg'}
                                            alt={company.name}
                                            width={40}
                                            height={40}
                                            className="size-12 rounded-lg"
                                        />
                                        <div>
                                            <h3 className="mb-2 font-semibold">{company.name}</h3>
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                <MapPin className="size-4" /> {company.location}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="xl" className="mt-2 w-full">
                                        {company.openPositions}
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </HomePart>
    );
}

const companies = [
    {
        name: 'TechNova',
        logo: 'https://i.pinimg.com/736x/c9/8b/b6/c98bb634f86104989b8162306dc3cfb1.jpg',
        openPositions: '12 Open Positions',
        location: 'China',
    },
    {
        name: 'InnoSoft',
        logo: 'https://i.pinimg.com/236x/76/e6/31/76e63117e2ef7365abf0fca5ae577757.jpg',
        openPositions: '8 Open Positions',
        location: 'China',
    },
    {
        name: 'CloudSphere',
        logo: 'https://i.pinimg.com/736x/a5/1e/1a/a51e1a0e290126feba3c34112d8b7182.jpg',
        openPositions: '15 Open Positions',
        location: 'China',
    },
    {
        name: 'DataX',
        logo: 'https://i.pinimg.com/236x/ae/2a/fc/ae2afc261530afe11b266c24067806ca.jpg',
        openPositions: '10 Open Positions',
        location: 'China',
    },
    {
        name: 'NextGen AI',
        logo: 'https://i.pinimg.com/736x/2a/86/90/2a869009496c24fde0876f1e7b926fc4.jpg',
        openPositions: '5 Open Positions',
        location: 'China',
    },
    {
        name: 'FinTech Hub',
        logo: 'https://i.pinimg.com/236x/e3/17/3b/e3173be00f7ecbd4d1e44f3bd55447e9.jpg',
        openPositions: '9 Open Positions',
        location: 'China',
    },
    {
        name: 'CyberShield',
        logo: 'https://i.pinimg.com/236x/db/ab/4c/dbab4ca81ae6cf3ae8c2e0f36689e8b0.jpg',
        openPositions: '7 Open Positions',
        location: 'China',
    },
    {
        name: 'EcoSolutions',
        logo: 'https://i.pinimg.com/236x/7c/c7/ab/7cc7ab6bff2c395ed28f5f9a1fdf004b.jpg',
        openPositions: '11 Open Positions',
        location: 'China',
    },
    {
        name: 'GreenTech',
        logo: 'https://i.pinimg.com/736x/54/08/05/540805458f37f91f4299c4fba94bb5cd.jpg',
        openPositions: '13 Open Positions',
        location: 'China',
    },
    {
        name: 'AI Labs',
        logo: 'https://i.pinimg.com/236x/ca/3a/18/ca3a188c7ea1160fd2fd1ea1b4ed50e7.jpg',
        openPositions: '6 Open Positions',
        location: 'China',
    },
    {
        name: 'QuantumSoft',
        logo: 'https://i.pinimg.com/236x/6a/f6/c4/6af6c46f3db386a9e58b348991371ffc.jpg',
        openPositions: '10 Open Positions',
        location: 'China',
    },
];
