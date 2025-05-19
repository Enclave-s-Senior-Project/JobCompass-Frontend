import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, Calendar, ChevronRight, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

export const CardListEnterprise = memo(() => {
    return (
        <div className="space-y-4">
            {/* Enterprise Card 1 */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex w-full items-center justify-center bg-slate-100 p-6 sm:h-auto sm:w-32">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white">
                                {/* <Image
                                    src="/placeholder.svg?height=64&width=64"
                                    alt="Nice98s"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                /> */}
                            </div>
                        </div>
                        <div className="flex-1 p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-800">Nice98s</h3>
                                        <Badge className="border-teal-200 bg-teal-50 text-xs font-medium text-teal-600">
                                            FEATURED
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span>Vietnam - Da Nang</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span>Feb 28, 2023</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            <span>0236384952</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="gap-1 sm:self-end">
                                    View Detail
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-slate-600">
                                    Leading technology company specializing in software development and IT solutions.
                                    With over 10 years of experience in the industry.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge className="text-xs">Software Development</Badge>
                                    <Badge className="text-xs">IT Solutions</Badge>
                                    <Badge className="text-xs">Web Development</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enterprise Card 2 */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex w-full items-center justify-center bg-slate-100 p-6 sm:h-auto sm:w-32">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white">
                                {/* <Image
                                    src="/placeholder.svg?height=64&width=64"
                                    alt="DGW ASIA"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                /> */}
                            </div>
                        </div>
                        <div className="flex-1 p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-800">DGW ASIA</h3>
                                        <Badge className="border-teal-200 bg-teal-50 text-xs font-medium text-teal-600">
                                            FEATURED
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span>Vietnam - Da Nang</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span>Jan 10, 2023</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            <span>0236384974</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="gap-1 sm:self-end">
                                    View Detail
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-slate-600">
                                    A multinational corporation with operations across Asia, specializing in
                                    distribution and supply chain management solutions.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge className="text-xs">Distribution</Badge>
                                    <Badge className="text-xs">Supply Chain</Badge>
                                    <Badge className="text-xs">Logistics</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enterprise Card 3 */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex w-full items-center justify-center bg-slate-100 p-6 sm:h-auto sm:w-32">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white">
                                {/* <Image
                                    src="/placeholder.svg?height=64&width=64"
                                    alt="Nanosoft"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                /> */}
                            </div>
                        </div>
                        <div className="flex-1 p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-800">Nanosoft</h3>
                                        <Badge className="border-teal-200 bg-teal-50 text-xs font-medium text-teal-600">
                                            FEATURED
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span>Vietnam - Ho Chi Minh City</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span>Mar 02, 2020</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            <span>0787513417</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="gap-1 sm:self-end">
                                    View Detail
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-slate-600">
                                    Innovative software company focusing on cutting-edge technologies including AI,
                                    machine learning, and cloud solutions.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge className="text-xs">AI Solutions</Badge>
                                    <Badge className="text-xs">Cloud Computing</Badge>
                                    <Badge className="text-xs">Machine Learning</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enterprise Card 4 */}
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex w-full items-center justify-center bg-slate-100 p-6 sm:h-auto sm:w-32">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white">
                                {/* <Image
                                    src="/placeholder.svg?height=64&width=64"
                                    alt="Floware"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                /> */}
                            </div>
                        </div>
                        <div className="flex-1 p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-slate-800">Floware</h3>
                                        <Badge className="border-blue-200 bg-blue-100 text-xs font-medium text-blue-700">
                                            PUBLIC
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <span>United States - California</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span>Mar 17, 2020</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            <span>9787513422</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="gap-1 sm:self-end">
                                    View Detail
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-slate-600">
                                    Leading provider of workflow automation solutions for businesses of all sizes.
                                    Specializing in digital transformation and process optimization.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge className="text-xs">Workflow Automation</Badge>
                                    <Badge className="text-xs">Digital Transformation</Badge>
                                    <Badge className="text-xs">Business Solutions</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});
