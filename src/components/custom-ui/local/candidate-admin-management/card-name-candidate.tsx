import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CandidateStatus } from '@/lib/common-enum';
import { Ban, Check, Clock, X } from 'lucide-react';
import { useEffect } from 'react';

type props = {
    name?: string;
    major?: string;
    industry?: string;
    status?: CandidateStatus;
    avatar?: string;
};
export function CardNameCandidate({ name, major, industry, status, avatar }: props) {
    const renderStatus = () => {
        switch (status) {
            case 'ACTIVE':
                return (
                    <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">Active</span>
                    </>
                );
            case 'PENDING':
                return (
                    <>
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-yellow-500">Pending</span>
                    </>
                );
            case 'BLOCKED':
                return (
                    <>
                        <Ban className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-600">Blocked</span>
                    </>
                );
            case 'REJECTED':
                return (
                    <>
                        <X className="h-4 w-4 text-purple-800" />
                        <span className="text-sm font-semibold text-purple-800">Rejected</span>
                    </>
                );
            default:
                return null;
        }
    };
    useEffect(() => {
        console.log('12', status);
    }, [name]);
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-24 w-24">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-2xl">{name}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className="mb-2 text-muted-foreground">{major}</p>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{industry}</Badge>

                    <div className="mt-6 w-full">
                        {status ? (
                            <div className="flex items-center justify-center gap-2">{renderStatus()}</div>
                        ) : (
                            <span className="italic text-muted-foreground opacity-70">&lt;Unknown&gt;</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
