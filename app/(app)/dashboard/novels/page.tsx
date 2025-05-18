"use server"

import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NovelList from "./novel-list";
import { getAuthorNovels } from "@/actions/novel";

export default async function Novels() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["novels"],
        queryFn: getAuthorNovels,
    })


    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Novels</h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NovelList />
            </HydrationBoundary>
        </div>
    )
}
