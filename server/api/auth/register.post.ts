import { eq } from "drizzle-orm";
import { readValidatedBody } from "h3";

import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema";
import { registerSchema } from "~~/server/schemas/register";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (value) => {
    return registerSchema.parse(value);
  });

  const [existingUser] = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, body.email))
    .limit(1);

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "User with this email already exists",
    });
  }

  const passwordHash = await hashPassword(body.password);

  const [user] = await db
    .insert(users)
    .values({
      firstName: body.firstName,
      email: body.email,
      lastName: body.lastName,
      passwordHash,
    })
    .returning({
      id: users.id,
      firstName: users.firstName,
      email: users.email,
      lastName: users.lastName,
    });

  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: "Could not create user",
    });
  }

  await setUserSession(event, {
    user,
    loggedInAt: Date.now(),
  });

  return {
    user,
  };
});
