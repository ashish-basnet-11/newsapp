import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('jwt');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|login|register|articles|$).*)',]}
