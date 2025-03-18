import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPages = ['/', '/single-job/*', '/find-jobs', '/reset-password', '/find-candidates/candidate-profile'];
const blockedPagesAfterAuth = ['/sign-in', '/sign-up', '/forget-password', '/auth/callback', '/email-verify'];

export function middleware(req: NextRequest) {
    const cookie = req.cookies.get('login')?.value;
    let isLoggedIn = false;
    const pathname = req.nextUrl.pathname;

    // Check authentication status
    try {
        isLoggedIn = cookie ? JSON.parse(cookie) : false;
    } catch {
        isLoggedIn = false;
    }

    // Case 1: Authenticated user trying to access blocked pages
    if (isLoggedIn && blockedPagesAfterAuth.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Case 2: Unauthenticated user trying to access protected pages
    const isPublicPage =
        publicPages.includes(pathname) ||
        publicPages.some((page) => new RegExp(`^${page.replace('*', '.*')}$`).test(pathname));

    if (!isLoggedIn && !isPublicPage && !blockedPagesAfterAuth.includes(pathname)) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, req.url));
    }

    return NextResponse.next();
}

// Optional: Configure matcher to specify which paths the middleware applies to
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
