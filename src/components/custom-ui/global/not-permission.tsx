import Image from 'next/image';
import notPermissionImage from '@/assets/images/avatar/not-permission.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function NotPermission() {
    return (
        <div className="flex h-full min-h-[60vh] items-center justify-center p-4">
            <div className="flex w-[80%] max-w-5xl flex-col items-center justify-center gap-4 md:flex-row">
                <div className="max-w-md">
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">Access Denied</h1>
                    <p className="mb-8 text-muted-foreground">
                        You don&apos;t have permission to access this page. Please contact your administrator if you
                        believe this is an error.
                    </p>
                    <div className="flex gap-4">
                        <Button>
                            <Link href="/" className="flex items-center gap-2">
                                Home <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button onClick={() => window.history.back()} variant="outline">
                            Go Back
                        </Button>
                    </div>
                </div>
                <div className="relative w-full max-w-md">
                    <Image
                        src={notPermissionImage}
                        alt="no permission"
                        width={500}
                        height={500}
                        priority
                        className="h-auto w-full"
                    />
                </div>
            </div>
        </div>
    );
}
