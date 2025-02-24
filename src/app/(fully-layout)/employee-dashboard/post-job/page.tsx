'use client';

import type React from 'react';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LuArrowRight } from 'react-icons/lu';

export default function PostJobForm() {
    const [jobData, setJobData] = useState({
        title: '',
        tags: '',
        minSalary: '',
        maxSalary: '',
        description: '',
        responsibilities: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(jobData);
    };

    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-2xl font-bold mb-6">Post a job</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white  ">
                <div className="flex flex-col gap-y-2">
                    <h1>Job Title</h1>
                    <Input
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                        id="jobTitle"
                        placeholder="Add job title, role, vacancies etc"
                        value={jobData.title}
                        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <h1>Tags</h1>
                    <Input
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                        id="tags"
                        placeholder="Job keyword, tags etc..."
                        value={jobData.tags}
                        onChange={(e) => setJobData({ ...jobData, tags: e.target.value })}
                    />
                </div>

                <div>
                    <h2 className="text-lg font-bold mt-8 mb-4">Salary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <h1>Min Salary</h1>
                            <Input
                                className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                                id="minSalary"
                                type="number"
                                placeholder="Minimum salary..."
                                value={jobData.minSalary}
                                onChange={(e) => setJobData({ ...jobData, minSalary: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Max Salary</h1>
                            <Input
                                className="h-12 focus-visible:border-primary focus-visible:ring-primary"
                                id="maxSalary"
                                type="number"
                                placeholder="Maximum salary..."
                                value={jobData.maxSalary}
                                onChange={(e) => setJobData({ ...jobData, maxSalary: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold mt-8 mb-4">Advance Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <h1>Education</h1>
                            <Select>
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." className="text-[#767F8C]" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                                    <SelectItem value="master">Master's Degree</SelectItem>
                                    <SelectItem value="phd">Ph.D.</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Experience</h1>
                            <Select>
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="entry">Entry Level</SelectItem>
                                    <SelectItem value="intermediate">Intermediate Level</SelectItem>
                                    <SelectItem value="senior">Senior Level</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Job Type</h1>
                            <Select>
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fulltime">Full Time</SelectItem>
                                    <SelectItem value="parttime">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Expiration Date</h1>
                            <div className="relative">
                                <Input
                                    type="date"
                                    className="pl-10 h-12 focus-visible:border-primary focus-visible:ring-primary"
                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h1>Job Level</h1>
                            <Select>
                                <SelectTrigger className="h-12 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="junior">Junior</SelectItem>
                                    <SelectItem value="mid">Mid-Level</SelectItem>
                                    <SelectItem value="senior">Senior</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold mt-8 mb-4">Description & Responsibility</h2>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-y-2">
                            <h1>Description</h1>
                            <div className="border rounded-md">
                                <textarea
                                    id="description"
                                    className="min-h-[100px] w-full rounded-t-md border-b border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Add your job description..."
                                    value={jobData.description}
                                    onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                                />
                                <div className="flex items-center gap-1 p-2 border-t">
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="font-bold">B</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="italic">I</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="underline">U</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="line-through">S</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span>🔗</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span>≡</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span>•</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1>Responsibilities</h1>
                            <div className="border rounded-md">
                                <textarea
                                    id="responsibilities"
                                    className="min-h-[100px] w-full rounded-t-md border-b border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Add your job responsibilities..."
                                    value={jobData.responsibilities}
                                    onChange={(e) => setJobData({ ...jobData, responsibilities: e.target.value })}
                                />
                                <div className="flex items-center gap-1 p-2 border-t">
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="font-bold">B</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="italic">I</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="underline">U</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span className="line-through">S</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span>🔗</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span>≡</span>
                                    </button>
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-md">
                                        <span>•</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="group w-full md:w-auto">
                    Post Job <LuArrowRight className="group-hover:translate-x-2 transition-all duration-100" />
                </Button>
            </form>
        </div>
    );
}
