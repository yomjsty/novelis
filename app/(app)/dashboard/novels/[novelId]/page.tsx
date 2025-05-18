import { getNovelById } from "@/actions/novel";
import EditNovelForm from "./edit-novel-form";
import { notFound } from "next/navigation";

export default async function EditNovelPage({ params }: { params: Promise<{ novelId: string }> }) {
    const { novelId } = await params;
    const novel = await getNovelById(novelId);

    if (!novel) {
        notFound();
    }

    return (
        <div>
            <h1>{novel.title}</h1>
            <EditNovelForm novel={novel} />
        </div>
    )
}
