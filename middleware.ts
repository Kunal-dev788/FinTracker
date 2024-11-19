import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define your protected routes (example: protect the homepage)
const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  // Protect routes if they match the specified route matcher
  if (isProtectedRoute(req)) auth().protect();

  // Continue to process the request
  return NextResponse.next();
});

// Configuration for matching which routes should apply middleware
export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // You can add more protected routes here
    '/',
  ],
};
