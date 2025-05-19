"use server"

import React from 'react'
import GenreForm from "./genre-form"
// import { getQueryClient } from "@/lib/get-query-client";
import GenreList from "./genre-list";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getGenres } from "@/actions/genre";
import { Header } from "../../header";

export default async function GenresPage() {
    // const queryClient = getQueryClient();

    // await queryClient.prefetchQuery({
    //     queryKey: ["genres"],
    //     queryFn: getGenres,
    // })


    return (
        <>
            <Header
                heading="Genres"
                text="Manage your genres, track performance, and engage with readers."
            />
            <GenreForm />
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <GenreList />
            {/* </HydrationBoundary> */}
        </>
    )
}
