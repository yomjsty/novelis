import React from 'react'
import NovelForm from "./novel-form"
import { getQueryClient } from "@/lib/get-query-client";
import { getGenres } from "@/actions/genre";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";

export default async function CreateNovelPage() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    })

    return (
        <div className="flex flex-col gap-4">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NovelForm />
            </HydrationBoundary>
        </div>
    )
}
