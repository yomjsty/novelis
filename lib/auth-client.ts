import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [polarClient(), adminClient(), inferAdditionalFields<typeof auth>()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
