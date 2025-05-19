import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { CoinsIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export default async function Coins() {
    const user = await getCurrentUser();

    const userCoins = await db.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
            coins: true
        }
    })

    return (
        <Badge variant="outline" className="gap-2 text-sm">
            Coins:
            <div className="flex items-center gap-1">
                <CoinsIcon size={14} aria-hidden="true" />
                {userCoins?.coins}
            </div>
        </Badge>
    )
}
