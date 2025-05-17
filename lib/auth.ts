import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import db from "./db";
import { nextCookies } from "better-auth/next-js";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { getCoinsForProduct } from "@/utils/getCoinsForProduct";
import { getCurrentUser } from "./get-current-user";

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: "sandbox",
});

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "d2f14d56-eb91-4466-ab2e-501a9755ae7f",
                            slug: "10-coins"
                        },
                        {
                            productId: "36870a5a-1489-4dc2-beb3-1528d5a79cf1",
                            slug: "30-coins"
                        },
                        {
                            productId: "05f8b341-2e93-44c6-9aad-b7b4c879ea13",
                            slug: "70-coins"
                        },
                    ],
                    // successUrl: "/success?checkout_id={CHECKOUT_ID}",
                    successUrl: "/dashboard",
                    authenticatedUsersOnly: true
                }),
                portal(),
                usage(),
                webhooks({
                    secret: process.env.POLAR_WEBHOOK_SECRET as string,
                    onOrderPaid: async (payload) => {
                        try {
                            const { customerId, productId } = payload.data;

                            const user = await getCurrentUser();

                            if (!user) {
                                throw new Error("User not found");
                            }

                            await db.user.update({
                                where: { id: user.id },
                                data: {
                                    customerId: customerId
                                }
                            })

                            const coins = getCoinsForProduct(productId);

                            await db.user.update({
                                where: { id: user.id },
                                data: {
                                    coins: {
                                        increment: coins
                                    }
                                }
                            });

                            console.log(`✅ Credited ${coins} coins to user`);
                        } catch (error) {
                            console.error('Failed to update user balance:', error);
                        }
                    }
                })
            ],
        }),
        admin(),
        nextCookies(),
    ],
});
