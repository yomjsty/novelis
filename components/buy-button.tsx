"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client";
import { Coins, Loader2 } from "lucide-react"
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CoinOption {
    id: string;
    slug: string;
    amount: number;
}

const coinOptions: CoinOption[] = [
    { id: "d2f14d56-eb91-4466-ab2e-501a9755ae7f", slug: "10-coins", amount: 10 },
    { id: "36870a5a-1489-4dc2-beb3-1528d5a79cf1", slug: "30-coins", amount: 30 },
    { id: "05f8b341-2e93-44c6-9aad-b7b4c879ea13", slug: "70-coins", amount: 70 },
];

export default function BuyButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(coinOptions[0].id);
    const radioRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const handleDivClick = (optionId: string) => {
        radioRefs.current[optionId]?.click();
    };

    const handleBuyCoins = async () => {
        const selectedCoin = coinOptions.find(option => option.id === selectedOption);
        if (!selectedCoin) {
            toast.error("Please select a coin package");
            return;
        }

        try {
            setIsLoading(true);
            await authClient.checkout({
                products: selectedCoin.id,
                slug: selectedCoin.slug,
            });
            toast.success("Redirecting to Polar...");
        } catch (error) {
            toast.error("Failed to process purchase. Please try again.");
            console.error("Checkout error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto p-4">
            <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="w-full space-y-4"
            >
                {coinOptions.map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                        onClick={() => handleDivClick(option.id)}
                    >
                        <RadioGroupItem
                            value={option.id}
                            id={option.id}
                            ref={(el) => {
                                radioRefs.current[option.id] = el;
                            }}
                        />
                        <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                            Buy {option.amount} Coins
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            <Button
                onClick={handleBuyCoins}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Coins className="w-4 h-4 mr-2" />
                )}
                Purchase Selected Coins
            </Button>
        </div>
    )
}
