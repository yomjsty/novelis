import BuyButton from "@/components/buy-button";
import { authClient } from "@/lib/auth-client";
import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login")
    }

    const userCoins = await db.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            coins: true
        }
    })

    const { data: customerState } = await authClient.customer.state();

    console.log("🔍 Customer State:", customerState);

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Coins: {userCoins?.coins}</p>
            <BuyButton />
            <p>Customer State: {JSON.stringify(customerState, null, 2)}</p>
        </div>
    )
}
