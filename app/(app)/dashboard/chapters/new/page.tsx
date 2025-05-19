import ChapterForm from "./chapter-form";
import { Header } from "@/app/(app)/header";
export default async function CreateNovelPage() {

    return (
        <div className="flex flex-col gap-4">
            <Header
                heading="Create Chapter"
                text="Create a new chapter to share with others."
            />
            <ChapterForm />
        </div>
    )
}
