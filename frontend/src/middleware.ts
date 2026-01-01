import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('jwt');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        '/((?!login|register|api|_next/static|_next/image|favicon.ico).*)',
    ]
}
