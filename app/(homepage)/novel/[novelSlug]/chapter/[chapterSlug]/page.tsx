import ChapterDetails from "./chapter-details"
import { Suspense } from "react";

export default async function ChapterPage() {
    // try {
    //     const chapter = await getChapterBySlug(params.novelSlug, params.chapterSlug)
    //     return <ChapterDetails chapter={chapter} />
    // } catch (error) {
    //     notFound()
    // }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChapterDetails />
        </Suspense>
    )
}
