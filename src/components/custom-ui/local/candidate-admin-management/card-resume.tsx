import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resume } from '@/types';
import Image from 'next/image';
import defaultResumeImage from '@/assets/images/avatar/default-resume-image.jpg';
import { downloadFileViaURL } from '@/lib/utils';
import { Download } from 'lucide-react';

type props = {
    resumes: Resume[];
};
export function CardResume({ resumes = [] }: props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Resume</CardTitle>
            </CardHeader>
            <CardContent>
                {resumes.length > 0 ? (
                    resumes.map((resume) => (
                        <div key={resume?.cvId} className="flex items-center justify-between space-y-3">
                            <div className="flex items-center gap-3">
                                <Image src={defaultResumeImage} alt="" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-600">{resume?.cvName}</p>
                                    <p className="text-sm font-medium uppercase">PDF</p>
                                </div>
                            </div>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="[&_svg]:size-6"
                                onClick={() => {
                                    downloadFileViaURL(resume?.cvUrl);
                                }}
                            >
                                <Download /> <span className="block sm:hidden lg:block">Download</span>
                            </Button>
                        </div>
                    ))
                ) : (
                    <span className="text-sm italic text-gray-500">No public resume</span>
                )}
            </CardContent>
        </Card>
    );
}
