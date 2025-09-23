import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      const protectedRoutes = [
        "/profile",
        "/tools",
        "/categories",
        "/dashboard",
      ];
      const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
      );

      if (isProtectedRoute) {
        return !!token;
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
