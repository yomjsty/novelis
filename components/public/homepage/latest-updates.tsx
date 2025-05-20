// app/components/LatestUpdates.tsx
import { getAllNovels } from "@/actions/novel"
import { GenreTabs } from "@/components/genre-tabs"

export async function LatestUpdates() {
    const latestUpdates = await getAllNovels()

    return (
        <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="container px-4 mx-auto">
                <GenreTabs initialData={latestUpdates} />
            </div>
        </section>
    )
}
