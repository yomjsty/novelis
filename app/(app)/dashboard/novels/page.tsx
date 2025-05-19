"use server"

// import { getQueryClient } from "@/lib/get-query-client";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getAuthorNovels } from "@/actions/novel";
import NovelList from "./novel-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "../../header";

export default async function Novels() {
    // const queryClient = getQueryClient();

    // await queryClient.prefetchQuery({
    //     queryKey: ["novels"],
    //     queryFn: getAuthorNovels,
    // })


    return (
        <>
            <Header
                heading="Novels"
                text="Manage your novels, track performance, and engage with readers."
            />
            <Link href="/dashboard/novels/new">
                <Button>
                    New Novel
                </Button>
            </Link>
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <NovelList />
            {/* </HydrationBoundary> */}
        </>
    )
}
