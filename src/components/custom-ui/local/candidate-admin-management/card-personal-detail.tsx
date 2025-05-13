import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleUserRound, Map, NotepadText } from 'lucide-react';
import { PiCake } from 'react-icons/pi';

type props = {
    dateOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
    gender?: string;
};
export function CardPersonalDetail({ dateOfBirth, nationality, maritalStatus, gender }: props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <PiCake className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="text-sm font-medium">{dateOfBirth}</p>
                    </div>
                    <div>
                        <Map className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Nationality</p>
                        <p className="text-sm font-medium capitalize">{nationality?.toLowerCase()}</p>
                    </div>
                    <div>
                        <NotepadText className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Marital Status</p>
                        <p className="text-sm font-medium capitalize">{maritalStatus?.toLowerCase()}</p>
                    </div>
                    <div>
                        <CircleUserRound className="mb-3 size-6 text-primary" />
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="text-sm font-medium capitalize">{gender?.toLowerCase()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
