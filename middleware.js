import createMiddleware from 'next-intl/middleware';
import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import {routing} from './i18n/routing'

const intlMiddleware = createMiddleware(routing);

// const clerkMiddleware = authMiddleware({
//   publicRoutes: ['/']
// });

// 使用 Clerk 的 authMiddleware 包装我们的中间件
export default authMiddleware({
  beforeAuth: (req) => {
    // 在认证之前执行 intl 中间件
    return intlMiddleware(req);
  },
  
  // 确保对匹配的路由执行 afterAuth
  afterAuth(auth, req) {
    // 重定向登录用户到 /dashboard，如果他们访问了 / 路由
    if (auth.userId && req.nextUrl.pathname === "/") {
      const dashboardUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  },

  // 指定公开路由
  publicRoutes: ["/", "/:locale", "/:locale/sign-in", "/:locale/sign-up"]
});

// export default function middleware(req) {
//   const res = intlMiddleware(req);
  
//   if (res.status === 401) {
//     return clerkMiddleware(req);
//   }

//   return res || NextResponse.next();
// }

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};