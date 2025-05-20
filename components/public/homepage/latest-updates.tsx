// app/components/LatestUpdates.tsx
import { getAllNovels } from "@/actions/novel"
import { GenreTabs } from "@/components/genre-tabs"

export async function LatestUpdates() {
    const latestUpdates = await getAllNovels()

    return (
        <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Latest Updates</h2>
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>
                <GenreTabs initialData={latestUpdates} />
            </div>
        </section>
    )
}
