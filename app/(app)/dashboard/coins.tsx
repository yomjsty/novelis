import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"

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
        <p>Coins: {userCoins?.coins}</p>
    )
}
