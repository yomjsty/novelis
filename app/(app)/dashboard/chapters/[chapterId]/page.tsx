import { getChapterById } from "@/actions/chapter";
import { notFound } from "next/navigation";
import EditChapterForm from "./edit-chapter-form";
import { Header } from "@/app/(app)/header";

export default async function EditChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params;
    const chapter = await getChapterById(chapterId);

    if (!chapter) {
        notFound();
    }

    return (
        <div>
            <Header
                heading={`Edit ${chapter.title}`}
                text="Edit your chapter to share with others."
            />
            <EditChapterForm chapter={chapter} />
        </div>
    )
}
