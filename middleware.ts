import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isPassationEnabled } from "@/flags";

export const config = {
  matcher: ["/passation"],
};

export async function middleware(req: NextRequest) {
  const passationEnabled = await isPassationEnabled();

  if (!passationEnabled) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
