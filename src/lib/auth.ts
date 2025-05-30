import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  user: {
    modelName: usersTable,
  },
  session: {
    modelName: sessionTable,
  },
  account: {
    modelName: accountsTable,
  },
  verification: {
    modelName: verificationTable,
  },
});
