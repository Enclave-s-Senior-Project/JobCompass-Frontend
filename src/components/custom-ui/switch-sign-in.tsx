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
import { routes } from '@/configs/routes';
import { useContext } from 'react';
import { UserContext } from '@/contexts/user-context';
import { hasPermission } from '@/lib/auth';
import { Bookmark, BriefcaseBusiness, CircleUserRound, Clock4, LayoutDashboard, LogOut, Settings } from 'lucide-react';

const commonNavigatePages = [
    { href: '/candidate-dashboard/overview', icon: <LayoutDashboard />, label: 'Candidate Dashboard' },
    { href: '/candidate-dashboard/settings/personal-profile', icon: <CircleUserRound />, label: 'Profile Settings' },
    { href: '/candidate-dashboard/favorite-jobs', icon: <Bookmark />, label: 'Favorite Jobs' },
    { href: '/candidate-dashboard/applied-jobs', icon: <Clock4 />, label: 'Applied Jobs' },
];

const enterpriseNavigatePages = [
    { href: '/employer-dashboard/overview', icon: <LayoutDashboard />, label: 'Enterprise Dashboard' },
    { href: '/employer-dashboard/my-jobs', icon: <BriefcaseBusiness />, label: 'My Jobs' },
    { href: '/employer-dashboard/settings/company-info', icon: <Settings />, label: 'Settings' },
];

export function SwitchSignIn() {
    const { userInfo, logoutHandle } = useContext(UserContext);

    return userInfo ? (
        <div className="flex items-center justify-between lg:justify-normal gap-2 lg:gap-6">
            <div className="relative">
                {/*notification*/}
                <PiBellRinging className="size-6 "></PiBellRinging>
                <Badge className={clsx(badgeVariants({ variant: 'notify' }), 'absolute top-0 right-0 size-2.5')} />
            </div>
            {/*if there is enterprise role, this will be shown*/}
            {hasPermission(userInfo, 'job', 'create') && (
                <Link href={routes.postJob}>
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
                    {commonNavigatePages.map((link) => (
                        <DropdownMenuItem key={link.href} className="pr-3 py-2 [&_svg]:size-5" asChild>
                            <Link href={link.href}>
                                {link.icon}&nbsp;{link.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}

                    {hasPermission(userInfo, 'enterpriseDashboard', 'access') && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Enterprise</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {enterpriseNavigatePages.map((link) => (
                                <DropdownMenuItem key={link.href} className="pr-3 py-2 [&_svg]:size-5" asChild>
                                    <Link href={link.href}>
                                        {link.icon}&nbsp;{link.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="pr-3 py-2 [&_svg]:size-5" onClick={logoutHandle}>
                        <LogOut />
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
