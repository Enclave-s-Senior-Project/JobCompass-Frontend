import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const basePathPublicStaticFiles = '/public/static';

// Pages that don't require authentication
export const publicPages = [
    '/',
    '/find-jobs',
    '/single-job/:slug',
    '/enterprises/:slug',
    '/enterprises/:slug/jobs',
    '/find-candidates/candidate-profile',
    '/reset-password',
];

// Pages that should redirect to home if user is already logged in
export const authPages = ['/sign-in', '/sign-up', '/forget-password', '/auth/callback', '/email-verify'];

// Pages that require authentication
export const privatePages = ['/candidate-dashboard', '/employer-dashboard', '/profile', '/settings'];

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isLoggedIn = checkAuthStatus(req);

    // Check if the requested path matches any known route pattern
    const isValidRoute = isKnownRoute(pathname);
    if (!isValidRoute) {
        return NextResponse.rewrite(new URL('/not-found', req.url));
    }

    // Handle authentication routes (sign-in, sign-up, etc.)
    if (isAuthPage(pathname)) {
        return handleAuthPageAccess(req, isLoggedIn);
    }

    // Handle private routes (dashboard, profile, etc.)
    if (isPrivatePage(pathname)) {
        return handlePrivatePageAccess(req, isLoggedIn, pathname);
    }

    // // Allow access to public pages
    return NextResponse.next();
}

function checkAuthStatus(req: NextRequest): boolean {
    try {
        const cookie = req.cookies.get('login')?.value;
        return cookie ? JSON.parse(cookie) : false;
    } catch {
        return false;
    }
}

function isKnownRoute(pathname: string): boolean {
    const allKnownPaths = [...publicPages, ...authPages, ...privatePages];

    return allKnownPaths.some((pattern) => {
        // Convert route pattern to regex
        const regexPattern = pattern
            .replace(/:[^/]+/g, '[^/]+') // Replace :slug with any non-slash chars
            .replace(/\*/g, '.*'); // Replace * with any chars
        return new RegExp(`^${regexPattern}(/.*)?$`).test(pathname);
    });
}

function isAuthPage(pathname: string): boolean {
    return authPages.includes(pathname);
}

function isPrivatePage(pathname: string): boolean {
    return privatePages.some((page) => pathname.startsWith(page));
}

function handleAuthPageAccess(req: NextRequest, isLoggedIn: boolean): NextResponse {
    // Redirect authenticated users away from auth pages
    if (isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

function handlePrivatePageAccess(req: NextRequest, isLoggedIn: boolean, pathname: string): NextResponse {
    // Redirect unauthenticated users to login
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * 1. api routes (/api/*)
         * 2. Next.js files (/_next/*)
         * 3. Static assets (/static/*)
         * 4. Root files (favicon.ico, etc)
         */
        {
            source: '/((?!api/|_next/|static/|favicon.ico|images/).*)',
            missing: [{ type: 'header', key: 'next-router-prefetch' }],
        },
    ],
};
