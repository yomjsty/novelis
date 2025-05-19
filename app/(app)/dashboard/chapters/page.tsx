"use server"

// import { getQueryClient } from "@/lib/get-query-client";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getAuthorChapters } from "@/actions/chapter";
import ChapterList from "./chapter-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "../../header";

export default async function Chapters() {
    // const queryClient = getQueryClient();

    // await queryClient.prefetchQuery({
    //     queryKey: ["chapters"],
    //     queryFn: getAuthorChapters,
    // })


    return (
        <>
            <Header
                heading="Chapters"
                text="Manage your chapters, track performance, and engage with readers."
            />
            <Link href="/dashboard/chapters/new">
                <Button>
                    New Chapter
                </Button>
            </Link>
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <ChapterList />
            {/* </HydrationBoundary> */}
        </>
    )
}
