import { auth } from "@/auth"

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    const callbackUrl = new URL(req.nextUrl.pathname, req.nextUrl.origin).toString()
    const url = new URL("/api/auth/signin", req.nextUrl.origin)
    url.searchParams.set("callbackUrl", callbackUrl)
    return Response.redirect(url)
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
