import React from 'react'
import NovelForm from "./novel-form"
import { Header } from "@/app/(app)/header"

export default async function CreateNovelPage() {
    return (
        <div className="flex flex-col gap-4">
            <Header
                heading="Create Novel"
                text="Create a new novel to share with others."
            />
            <NovelForm />
        </div>
    )
}
