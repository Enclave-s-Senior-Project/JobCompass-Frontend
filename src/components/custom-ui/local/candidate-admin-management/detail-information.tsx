import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { RichTextContent } from '../../global/rich-text-content';

type props = {
    overview?: string;
    experience?: string;
    education?: string;
};
export function DetailInformation({ overview, experience, education }: props) {
    return (
        <Card>
            <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="overview"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="experience"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Experience
                        </TabsTrigger>
                        <TabsTrigger
                            value="education"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Education
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0 p-6">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xl font-semibold text-primary-700">About</p>
                                <RichTextContent
                                    className="space-y-2 break-normal text-gray-700"
                                    content={overview ? overview : 'No About'}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="experience" className="mt-0 p-6">
                        <p className="text-xl font-semibold text-primary-700">Experience</p>
                        <RichTextContent
                            className="space-y-2 break-normal text-gray-700"
                            content={experience ? experience : 'No Experience'}
                        />
                    </TabsContent>

                    <TabsContent value="education" className="mt-0 p-6">
                        <p className="text-xl font-semibold text-primary-700">Education</p>
                        <RichTextContent
                            className="space-y-2 break-normal text-gray-700"
                            content={education ? education : 'No Education'}
                        />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
