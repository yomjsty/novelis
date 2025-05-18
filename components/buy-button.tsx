"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client";
import { Coins } from "lucide-react"

export default function BuyButton() {
    const handleBuyCoins = async (productId: string, slug: string) => {
        await authClient.checkout({
            products: productId,
            slug: slug,
        });
    }

    const handleState = async () => {
        await authClient.customer.state()
    }

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button onClick={() => handleBuyCoins("d2f14d56-eb91-4466-ab2e-501a9755ae7f", "10-coins")}>
                <Coins className="w-4 h-4 mr-2" />
                Buy 10 Coins
            </Button>
            <Button onClick={() => handleBuyCoins("36870a5a-1489-4dc2-beb3-1528d5a79cf1", "30-coins")}>
                <Coins className="w-4 h-4 mr-2" />
                Buy 30 Coins
            </Button>
            <Button onClick={() => handleBuyCoins("05f8b341-2e93-44c6-9aad-b7b4c879ea13", "70-coins")}>
                <Coins className="w-4 h-4 mr-2" />
                Buy 70 Coins
            </Button>
            <Button onClick={() => handleState()}>
                <Coins className="w-4 h-4 mr-2" />
                Buy 70 Coins
            </Button>
        </div>
    )
}
