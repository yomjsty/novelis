import React, { Suspense } from 'react'
import NovelDetailPage from "./novel-details"

export default function NovelPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NovelDetailPage />
        </Suspense>
    )
}
