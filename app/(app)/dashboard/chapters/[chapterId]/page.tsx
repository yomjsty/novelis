import { getChapterById } from "@/actions/chapter";
import { notFound } from "next/navigation";
import EditChapterForm from "./edit-chapter-form";

export default async function EditChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params;
    const chapter = await getChapterById(chapterId);

    if (!chapter) {
        notFound();
    }

    return (
        <div>
            <h1>{chapter.title}</h1>
            <EditChapterForm chapter={chapter} />
        </div>
    )
}
