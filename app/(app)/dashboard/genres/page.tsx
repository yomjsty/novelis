"use server"

import React, { Suspense } from 'react'
import GenreForm from "./genre-form"
import { getQueryClient } from "@/lib/get-query-client";
import GenreList from "./genre-list";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getGenres } from "@/actions/genre";

export default async function GenresPage() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    })


    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Genres</h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <GenreForm />
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <GenreList />
                {/* </Suspense> */}
            </HydrationBoundary>
        </div>
    )
}
