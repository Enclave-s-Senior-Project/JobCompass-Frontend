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
    '/find-candidates/candidate-profile/:slug',
    '/reset-password',
    '/find-candidates',
    '/enterprises',
    '/enterprises/:slug/jobs/',
    '/not-found',
    '/error',
    '/auth/callback',
    '/terms-of-service',
];

// Pages that should redirect to home if user is al</ChatBox>ready logged in
export const authPages = ['/sign-in', '/sign-up', '/forget-password', '/email-verify'];

// Pages that require authentication
export const privatePages = [
    '/candidate-dashboard/*',
    '/employer-dashboard/*',
    '/profile',
    '/settings',
    '/pricing-plans',
    '/admin-dashboard',
    '/admin-dashboard/*',
];

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Skip middleware for static files and assets
    if (isStaticFile(pathname)) {
        return NextResponse.next();
    }

    const isLoggedIn = !!checkAuthStatus(req);

    // Check if the requested path matches any known route pattern
    const isValidRoute = isKnownRoute(pathname);
    if (!isValidRoute) {
        return NextResponse.rewrite(new URL('/not-found', req.url));
    }

    // Handle authentication routes (sign-in, sign-up, etc.)
    if (isAuthPage(pathname)) {
        return handleAuthPageAccess(req, isLoggedIn);
    }

    // Allow access to public pages for all users
    if (isPublicPage(pathname)) {
        return NextResponse.next();
    }

    // Handle private pages with proper redirect
    if (isPrivatePage(pathname)) {
        console.log('Is private page');
        return handlePrivatePageAccess(req, isLoggedIn, pathname);
    }

    // Default handling for any other routes
    return NextResponse.next();
}

function isStaticFile(pathname: string): boolean {
    return (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.startsWith('/images/') ||
        pathname.startsWith('/favicon.ico') ||
        (pathname.includes('.') && !pathname.endsWith('/'))
    );
}

function checkAuthStatus(req: NextRequest): string | null {
    try {
        const cookie = req.cookies.get('login')?.value;
        return JSON.parse(cookie || 'false');
    } catch {
        return null;
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
    return privatePages.some((pattern) => {
        // Improved regex pattern for both wildcards and slugs
        const regexPattern = pattern
            .replace(/:[^\/]+/g, '[^/]+') // Replace :slug with any non-slash chars
            .replace(/\*/g, '.*'); // Replace * with any chars (wildcard)

        const regex = new RegExp(`^${regexPattern}(/.*)?$`);
        const matches = regex.test(pathname);

        return matches;
    });
}

function isPublicPage(pathname: string): boolean {
    return publicPages.some((pattern) => {
        // Convert route pattern to regex
        const regexPattern = pattern
            .replace(/:[^/]+/g, '[^/]+') // Replace :slug with any non-slash chars
            .replace(/\*/g, '.*'); // Replace * with any chars
        return new RegExp(`^${regexPattern}(/.*)?$`).test(pathname);
    });
}

function handleAuthPageAccess(req: NextRequest, isLoggedIn: boolean): NextResponse {
    // Redirect authenticated users away from auth pages
    if (isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

function handlePrivatePageAccess(req: NextRequest, isLoggedIn: boolean, pathname: string): NextResponse {
    // Redirect unauthenticated users to login with the current path as redirect param
    if (!isLoggedIn) {
        const encodedRedirect = encodeURIComponent(pathname);
        return NextResponse.redirect(new URL(`/sign-in?redirect=${encodedRedirect}`, req.url));
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
