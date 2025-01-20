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

export function SwitchSignIn() {
    const isLogged = false;

    return !isLogged ? (
        <div className="flex items-center justify-between lg:justify-normal gap-2 lg:gap-6">
            <div className="relative">
                {/*notification*/}
                <PiBellRinging className="size-6 "></PiBellRinging>
                <Badge className={clsx(badgeVariants({ variant: 'notify' }), 'absolute top-0 right-0 size-2.5')} />
            </div>
            {/*if there is enterprise role, this will be shown*/}
            <Link href="/">
                <Button variant="outline-primary" size="xl-responsive">
                    Post a Job
                </Button>
            </Link>
            {/**/}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="size-10 lg:size-12">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>Name</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-sm" side="bottom" align="end">
                    <DropdownMenuLabel>Your Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiUserCircle /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiTimer />
                        Requesting Jobs
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiUsers />
                        Candidates
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiBuilding />
                        Enterprise
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5">
                        <PiSignOutFill />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ) : (
        <div className="w-full flex items-center gap-2 lg:gap-3">
            <Link href="/sign-in" className="w-full">
                <Button variant="outline-primary" size="xl-responsive" className="w-full">
                    Sign in
                </Button>
            </Link>
            <Link href="/" className="w-full">
                <Button variant="default" size="xl-responsive" className="w-full">
                    Post a Job
                </Button>
            </Link>
        </div>
    );
}
