import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { fallbackLng, languages } from "./lib/i18n/settings";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

const isProtectedRoute = createRouteMatcher(["/settings(.*)"]);
acceptLanguage.languages(languages);

const cookieName = "i18next";

async function i18nMiddleware(req) {
  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`))) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  const lngInReferer = languages.find((l) =>
    req.nextUrl.pathname.startsWith(`/${l}`)
  );
  const response = NextResponse.next();
  if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  return response;
}

export default async function middleware(req) {
  // 先执行 i18n 中间件
  const i18nResponse = await i18nMiddleware(req);

  // 如果 i18n 中间件返回了重定向响应，直接返回
  if (i18nResponse.status !== 200) return i18nResponse;

  // 执行 Clerk 中间件
  return clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  })(req);
}