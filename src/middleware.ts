import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPages = ['/', '/single-job', '/find-jobs'];
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
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to home or dashboard
    }

    // Case 2: Unauthenticated user trying to access protected pages
    if (!isLoggedIn && !publicPages.includes(pathname) && !blockedPagesAfterAuth.includes(pathname)) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, req.url));
    }

    // Allow request to proceed if none of the above conditions are met
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
