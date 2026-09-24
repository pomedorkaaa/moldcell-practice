import { randomUUID } from "node:crypto";

import type { H3Event } from "h3";
import { getCookie, setCookie } from "h3";

export type Customer =
  | {
      type: "user";
      userId: number;
    }
  | {
      type: "guest";
      guestId: string;
    };

export const GUEST_COOKIES_NAME = "flux_guest_id";

export async function getCustomer(event: H3Event): Promise<Customer> {
  const session = await getUserSession(event);

  if (session.user?.id) {
    return { type: "user", userId: session.user.id };
  }

  let guestId = getCookie(event, GUEST_COOKIES_NAME);

  if (!guestId) {
    guestId = randomUUID();
    setCookie(event, GUEST_COOKIES_NAME, guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return { type: "guest", guestId };
}
