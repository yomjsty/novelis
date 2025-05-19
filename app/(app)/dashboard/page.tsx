import { Header } from "../header";
import { QuickActionsCard } from "./quick-actions-card";
import { PublishedNovelsCard } from "./published-novels-card";
// import { getAuthorNovels } from "@/actions/novel";
// import { getQueryClient } from "@/lib/get-query-client";
// import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function DashboardPage() {
    // const queryClient = getQueryClient();

    // await queryClient.prefetchQuery({
    //     queryKey: ["novels"],
    //     queryFn: getAuthorNovels,
    // })

    return (
        <>
            <Header
                heading="Dashboard"
                text="Manage your novels, track performance, and engage with readers."
            />
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                <QuickActionsCard className="md:col-span-2 lg:col-span-1 h-fit" />
                {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
                <PublishedNovelsCard className="md:col-span-3 lg:col-span-3 h-fit" />
                {/* </HydrationBoundary> */}
            </div>
        </>
    )
}
