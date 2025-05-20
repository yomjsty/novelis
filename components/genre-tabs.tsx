"use client"

import { useEffect, useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NovelCard } from "@/components/novel-card"
import { useQuery } from "@tanstack/react-query"
import { getNovelsByGenre } from "@/actions/novel"

interface Novel {
    id: string
    title: string
    slug: string
    synopsis: string | null
    isFeatured: boolean
    featuredImage: string | null
    tags: string[]
    status: string
    authorId: string
    createdAt: Date
    updatedAt: Date
    genres: { id: string; name: string }[]
    chapters: { id: string }[]
}

type Props = {
    initialData: Novel[]
}

const genres = ["all", "action", "comedy", "school"] as const

export function GenreTabs({ initialData }: Props) {
    const [activeTab, setActiveTab] = useState<string>("all")

    const actionQuery = useQuery({
        queryKey: ["genre", "action"],
        queryFn: () => getNovelsByGenre("action"),
        enabled: false,
    })

    const comedyQuery = useQuery({
        queryKey: ["genre", "comedy"],
        queryFn: () => getNovelsByGenre("comedy"),
        enabled: false,
    })

    const schoolQuery = useQuery({
        queryKey: ["genre", "school"],
        queryFn: () => getNovelsByGenre("school"),
        enabled: false,
    })

    const queries = useMemo(() => ({
        action: actionQuery,
        comedy: comedyQuery,
        school: schoolQuery,
    }), [actionQuery, comedyQuery, schoolQuery])

    useEffect(() => {
        if (activeTab in queries) {
            const query = queries[activeTab as keyof typeof queries]
            if (query.dataUpdatedAt === 0) {
                query.refetch()
            }
        }
    }, [activeTab, queries])

    const renderNovels = (novels: Novel[] | undefined, isLoading: boolean, isCached: boolean) => {
        if (isLoading && !isCached) {
            return (
                <p className="text-center p-12 text-muted-foreground">
                    Loading {activeTab} novels...
                </p>
            )
        }

        if (!novels || novels.length === 0) {
            return (
                <p className="text-center p-12 text-muted-foreground">
                    No {activeTab} novels found.
                </p>
            )
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {novels.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        )
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap bg-muted/50 p-1 h-auto">
                {genres.map((genre) => (
                    <TabsTrigger
                        key={genre}
                        value={genre}
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 capitalize"
                    >
                        {genre}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
                {renderNovels(initialData, false, true)}
            </TabsContent>

            {(["action", "comedy", "school"] as const).map((genre) => (
                <TabsContent key={genre} value={genre} className="mt-0">
                    {renderNovels(
                        queries[genre].data,
                        queries[genre].isFetching,
                        queries[genre].dataUpdatedAt !== 0
                    )}
                </TabsContent>
            ))}
        </Tabs>
    )
}
