import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const check = JSON.parse(req.cookies.get('login')?.value || 'false');
    console.log(typeof check);
    if (check) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}
console.log(typeof middleware) 
export const config = {
    matcher: ['/sign-in'],
};
