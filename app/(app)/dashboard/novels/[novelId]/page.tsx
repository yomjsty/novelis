import { getNovelById } from "@/actions/novel";
import EditNovelForm from "./edit-novel-form";
import { notFound } from "next/navigation";
import { Header } from "@/app/(app)/header";

export default async function EditNovelPage({ params }: { params: Promise<{ novelId: string }> }) {
    const { novelId } = await params;
    const novel = await getNovelById(novelId);

    if (!novel) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4">
            <Header
                heading={`Edit ${novel.title}`}
                text="Edit your novel to share with others."
            />
            <EditNovelForm novel={novel} />
        </div>
    )
}
