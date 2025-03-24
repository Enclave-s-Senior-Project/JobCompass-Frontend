'use client';

import { Resume } from '@/types';
import { CirclePlus } from 'lucide-react';
import { CardResume } from './card-resume';
import { Skeleton } from '../ui/skeleton';

const mockResume: Resume[] = [
    {
        cvName: 'Professional',
        cvUrl: 'http://facebook.com',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        size: 3.5,
        isPublished: true,
    },
    {
        cvName: 'Product Designer',
        cvUrl: 'http://facebook.com',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        size: 3.3,
        isPublished: true,
    },
    {
        cvName: 'Product Designer',
        cvUrl: 'http://facebook.com',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        size: 3.3,
        isPublished: true,
    },
    {
        cvName: 'Product Designer',
        cvUrl: 'http://facebook.com',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        size: 3.3,
        isPublished: false,
    },
];

export function ResumePart() {
    const isLoading = false;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 cursor-pointer">
                <div className="py-5 pl-5 pr-2 w-full flex items-center gap-3 justify-center bg-white border-2 border-input border-dashed rounded-md hover:bg-gray-50 hover:border-transparent transition-all">
                    <CirclePlus className="size-8 text-primary-500" />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm text-gray-900">Add CV/Resume</p>
                        <p className="text-sm text-gray-600">Browser file (pdf)</p>
                    </div>
                </div>
            </div>
            {isLoading
                ? Array.from({ length: 5 }).map((_) => <Skeleton className="h-[90px] w-full" />)
                : mockResume.map((resume, index) => (
                      <div className="col-span-1" key={index}>
                          <CardResume resume={resume} />
                      </div>
                  ))}
        </div>
    );
}
