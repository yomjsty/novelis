import React, { Suspense } from 'react'
import NovelDetailPage from "./novel-details"

export default async function NovelPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NovelDetailPage />
        </Suspense>
    )
}
