import BuyButton from "@/components/buy-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import Coins from "./coins";

export default async function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Suspense fallback={<div>Coins: </div>}>
                <Coins />
            </Suspense>
            <BuyButton />
            <Link href="/dashboard/genres">
                <Button>
                    Go to genres page
                </Button>
            </Link>
            <Link href="/dashboard/novels">
                <Button>
                    Go to novels page
                </Button>
            </Link>
            <Link href="/dashboard/chapters">
                <Button>
                    Go to chapters page
                </Button>
            </Link>
        </div>
    )
}
