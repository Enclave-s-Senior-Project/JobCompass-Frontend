import { User } from '@/types';
import React from 'react';
import { CircleUserRound, Map, NotepadText } from 'lucide-react';
import { PiCake } from 'react-icons/pi';
import { capitalizeFirstLetter, toFormattedDate } from '@/lib/utils';

type Props = {
    info: Pick<User, 'dateOfBirth' | 'gender' | 'maritalStatus' | 'nationality'>;
};

export default function UserRelatedInformation({ info }: Props) {
    return (
        <div className="flex flex-wrap gap-y-6 rounded-md border-2 border-primary-50 p-6">
            <div className="w-1/2 basis-1/2">
                <PiCake className="mb-3 size-6 text-primary" />
                <p className="mb-1 text-[12px] uppercase text-gray-500">date of birth</p>
                <p className="text-sm font-medium">
                    {info.dateOfBirth ? toFormattedDate(info.dateOfBirth) : 'Not specified'}
                </p>
            </div>
            <div className="w-1/2 basis-1/2">
                <Map className="mb-3 size-6 text-primary" />
                <p className="mb-1 text-[12px] uppercase text-gray-500">nationality</p>
                <p className="text-sm">{info.nationality ? info.nationality : 'Not specified'}</p>
            </div>
            <div className="w-1/2 basis-1/2">
                <NotepadText className="mb-3 size-6 text-primary" />
                <p className="mb-1 text-[12px] uppercase text-gray-500">marital status</p>
                <p className="text-sm font-medium">
                    {info.maritalStatus ? capitalizeFirstLetter(info.maritalStatus) : 'Not specified'}
                </p>
            </div>
            <div className="w-1/2 basis-1/2">
                <CircleUserRound className="mb-3 size-6 text-primary" />
                <p className="mb-1 text-[12px] uppercase text-gray-500">gender</p>
                <p className="text-sm font-medium">
                    {info.gender ? capitalizeFirstLetter(info.gender) : 'Not specified'}
                </p>
            </div>
        </div>
    );
}
