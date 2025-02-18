'use client';
import { Job } from 'api-types';
import { motion } from 'framer-motion';
import { motionVariant } from '@/lib/motion-variants';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users } from 'lucide-react';
import { ButtonMark } from '../custom-ui/button-mark';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';

export default function CardJobHorizontal(props: { job: Job }) {
    const { job } = props;
    return (
        <motion.div
            className="space-y-6 "
            variants={motionVariant.itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            <div className="flex gap-8 flex-wrap items-center justify-between p-8 rounded-xl border-2 border-gray-100 hover:border-primary transition-colors xl:w-[1320px]">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <img
                            loading="lazy"
                            src={job.introImg || 'https://www.foxsports.com/soccer/cristiano-ronaldo-player'}
                            alt={job.enterprise.name}
                            width={68}
                            height={68}
                            className="object-contain size-[68px] rounded-md "
                        />
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold text-xl flex items-center gap-2">
                            {job?.name}&nbsp;
                            <Badge className="bg-primary-100 text-primary border-none rounded-xl px-4 shadow-none">
                                {job.type}
                            </Badge>
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 text-sm">
                                <Building2 className="h-5 w-5" /> {job.enterprise.name}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <MapPin className="h-5 w-5" /> {job.enterprise.name}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <Users className="h-5 w-5" /> {job.lowestWage}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-end gap-3">
                    <ButtonMark />
                    <Button className="group" variant="secondary" size="xl">
                        Apply Now <LuArrowRight className="group-hover:translate-x-2 transition-all" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
