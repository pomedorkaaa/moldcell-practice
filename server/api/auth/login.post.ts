import { eq } from "drizzle-orm";
import { readValidatedBody } from "h3";

import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema";
import { loginSchema } from "~~/server/schemas/login";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (value) => {
    return loginSchema.parse(value);
  });

  const [user] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      email: users.email,
      lastName: users.lastName,
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(eq(users.email, body.email))
    .limit(1);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid message or password",
    });
  }

  const passwordIsValid = await verifyPassword(
    user.passwordHash,
    body.password,
  );

  if (!passwordIsValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid message or password",
    });
  }

  const sessionUser = {
    id: user.id,
    firstName: user.firstName,
    email: user.email,
    lastName: user.lastName,
  };

  await setUserSession(event, {
    user: sessionUser,
    loggedInAt: Date.now(),
  });

  return {
    user: sessionUser,
  };
});
