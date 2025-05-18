"use server"

import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ChapterList from "./chapter-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAuthorChapters } from "@/actions/chapter";

export default async function Chapters() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["chapters"],
        queryFn: getAuthorChapters,
    })


    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Chapters</h1>
            <Link href="/dashboard/chapters/new">
                <Button>
                    New Chapter
                </Button>
            </Link>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ChapterList />
            </HydrationBoundary>
        </div>
    )
}
