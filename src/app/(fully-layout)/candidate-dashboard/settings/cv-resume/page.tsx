import { ResumePart } from '@/components/custom-ui/resume-part';
import React from 'react';

export default function CvResume() {
    return (
        <section aria-label="Cv Resume" className="space-y-5">
            <h5 className="text-lg font-medium text-gray-900">Your CV/Resume</h5>
            <ResumePart />
        </section>
    );
}
