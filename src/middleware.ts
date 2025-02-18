import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from './configs/routes';

export function middleware(req: NextRequest) {
    const check = JSON.parse(req.cookies.get('login')?.value || 'false');
    if (check) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}
export const config = {
    matcher: [routes.signIn, routes.signUp, routes.verifyEmail],
};
