import Image from 'next/image';
import Link from 'next/link';
import headerLogo from '@/assets/svgs/header-logo.svg';
import { routes } from '@/configs/routes';

export function ButtonHome() {
    return (
        <div>
            <Link href={routes.home}>
                <div className="logo">
                    <Image
                        loading="eager"
                        src={headerLogo}
                        height={26}
                        width={180}
                        alt="JobCompass"
                        className="-translate-x-1"
                    />
                </div>
            </Link>
        </div>
    );
}
