// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  // Use the `bad` locale sub-path for badbad.zone.
  if (
    req.nextUrl.host.includes('badbad.zone') &&
    req.nextUrl.locale !== 'bad'
  ) {
    return NextResponse.redirect(
      new URL(`/bad${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}
