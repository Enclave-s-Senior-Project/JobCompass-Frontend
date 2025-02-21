'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function DialogApplyJob(props: { nameJob: string }) {
    const [open, setOpen] = useState(false);
    const name = props.nameJob;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)} className="flex-1 md:flex-none w-[248px] h-[56px] text-[16px]">
                Apply Now
                <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <DialogContent className="sm:max-w-[648px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-[18px]">Apply Job: {name}</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label className=" text-[#18191C] text-[14px]">Choose Resume</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="resume1">MyResume.pdf</SelectItem>
                                <SelectItem value="resume2">Portfolio2024.pdf</SelectItem>
                                <SelectItem value="resume3">Designer_CV.pdf</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Letter</label>
                        <div className="rounded-md border">
                            <div className="flex items-center gap-1 border-b p-2">
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span className="font-bold">B</span>
                                </Button>
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span className="italic">I</span>
                                </Button>
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span className="underline">U</span>
                                </Button>
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span className="line-through">S</span>
                                </Button>
                                <div className="h-4 w-px bg-border mx-1" />
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span>🔗</span>
                                </Button>
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span>≡</span>
                                </Button>
                                <Button variant="ghost" size="icon-lg" className="h-8 w-8">
                                    <span>⋮</span>
                                </Button>
                            </div>
                            <textarea
                                className="min-h-[200px] w-full resize-none border-0 bg-transparent p-3 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Write down your biography here. Let the employers know who you are..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-3">
                        <Button
                            variant="outline"
                            className="w-[102px] h-[48px] text-[#0A65CC] bg-[#E7F0FA]"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setOpen(false)}
                            className="w-[168px] h-[48px] bg-[#0A65CC] text-[#FFFFFF]"
                        >
                            Apply Now
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
