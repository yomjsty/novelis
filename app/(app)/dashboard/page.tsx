import BuyButton from "@/components/buy-button";
import { Button } from "@/components/ui/button";
import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import Link from "next/link";
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

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Coins: {userCoins?.coins}</p>
            <BuyButton />
            <Link href="/dashboard/genres">
                <Button>
                    Go to genre page
                </Button>
            </Link>
        </div>
    )
}
