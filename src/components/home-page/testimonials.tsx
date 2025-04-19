'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import default_avatar from '@/assets/images/avatar/default-avatar.jpg';
import { HomePart } from './home-part';
import { motionVariant } from '@/lib/motion-variants';
import { Rating } from '../custom-ui/rating';

type Testimonial = {
    text: string;
    name: string;
    role: string;
    avatarUrl?: string;
};

const testimonials: Testimonial[] = [
    {
        text: 'Found my dream job through this platform. The process was smooth and the support team was very helpful.',
        name: 'Sarah Johnson',
        role: 'UI Designer',
        avatarUrl: '',
    },
    {
        text: 'As an employer, I was able to find qualified candidates quickly. The platform is intuitive and powerful.',
        name: 'Michael Chen',
        role: 'HR Manager',
        avatarUrl: '',
    },
    {
        text: 'Great platform for job seekers. Lots of opportunities and easy to use interface.',
        name: 'Emily Brown',
        role: 'Software Engineer',
        avatarUrl: '',
    },
];

export function Testimonials() {
    return (
        <HomePart title="Clients Testimonial">
            <motion.div
                className="grid gap-8 md:grid-cols-3"
                variants={motionVariant.itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {testimonials.map((testimonial, index) => (
                    <Card
                        key={index}
                        className="flex flex-col justify-between border-gray-100 p-6 shadow-sm drop-shadow-sm"
                    >
                        <div>
                            <div className="mb-4 flex gap-1">
                                <Rating size="xs" interactive={false} value={5} />
                            </div>
                            <p className="mb-4 text-muted-foreground">{testimonial.text}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                                {testimonial.avatarUrl?.trim() ? (
                                    <Image
                                        src={testimonial.avatarUrl}
                                        alt={`${testimonial.name}'s Avatar`}
                                        width={40} // Đặt kích thước cố định để tránh layout shift
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={default_avatar}
                                        alt="Default Avatar"
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <p className="font-medium">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </motion.div>
        </HomePart>
    );
}
