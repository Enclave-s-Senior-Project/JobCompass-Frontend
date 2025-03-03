import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PiBellRinging } from 'react-icons/pi';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PiUserCircle, PiTimer, PiUsers, PiSignOutFill, PiBuilding } from 'react-icons/pi';
import { routes } from '@/configs/routes';
import { useContext } from 'react';
import { UserContext } from '@/contexts/user-context';
import { hasPermission } from '@/lib/auth';

export function SwitchSignIn() {
    const { userInfo } = useContext(UserContext);

    return userInfo ? (
        <div className="flex items-center justify-between lg:justify-normal gap-2 lg:gap-6">
            <div className="relative">
                {/*notification*/}
                <PiBellRinging className="size-6 "></PiBellRinging>
                <Badge className={clsx(badgeVariants({ variant: 'notify' }), 'absolute top-0 right-0 size-2.5')} />
            </div>
            {/*if there is enterprise role, this will be shown*/}
            {hasPermission(userInfo, 'job', 'create') && (
                <Link href={routes.home}>
                    <Button variant="outline" size="lg">
                        Post a Job
                    </Button>
                </Link>
            )}
            {/**/}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="size-10 lg:size-12">
                        <AvatarImage className="object-cover object-center" src={userInfo?.profileUrl} />
                        <AvatarFallback>{userInfo?.fullName}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-sm" side="bottom" align="end">
                    <DropdownMenuLabel>Your Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5" asChild>
                        <Link href="/candidate-dashboard/settings/personal-profile">
                            <PiUserCircle /> Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiTimer />
                        Requesting Jobs
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiUsers />
                        Candidates
                    </DropdownMenuItem>
                    {hasPermission(userInfo, 'enterpriseDashboard', 'access') && (
                        <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                            <PiBuilding />
                            Enterprise
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiSignOutFill />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ) : (
        <div className="w-full flex items-center justify-end gap-2 lg:gap-3">
            <Link href={routes.signIn}>
                <Button variant="outline" size="lg">
                    Sign in
                </Button>
            </Link>
            <Link href={routes.home}>
                <Button variant="primary" size="lg">
                    Post a Job
                </Button>
            </Link>
        </div>
    );
}
