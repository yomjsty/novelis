// app/components/GenreTabs.tsx
"use client"

import { useEffect, useState } from "react"
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

export function GenreTabs({ initialData }: Props) {
    const [activeTab, setActiveTab] = useState("all")

    const { data: actionNovels, refetch: refetchAction, isFetching: loadingAction } = useQuery({
        queryKey: ["genre", "action"],
        queryFn: () => getNovelsByGenre("action"),
        enabled: false,
    })

    const { data: comedyNovels, refetch: refetchComedy, isFetching: loadingComedy } = useQuery({
        queryKey: ["genre", "comedy"],
        queryFn: () => getNovelsByGenre("comedy"),
        enabled: false,
    })

    const { data: schoolNovels, refetch: refetchSchool, isFetching: loadingSchool } = useQuery({
        queryKey: ["genre", "school"],
        queryFn: () => getNovelsByGenre("school"),
        enabled: false,
    })

    useEffect(() => {
        if (activeTab === "action") refetchAction()
        if (activeTab === "comedy") refetchComedy()
        if (activeTab === "school") refetchSchool()
    }, [activeTab, refetchAction, refetchComedy, refetchSchool])

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap bg-muted/50 p-1 h-auto">
                {["all", "action", "comedy", "school"].map((genre) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialData?.map((novel) => (
                        <NovelCard key={novel.id} novel={novel} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="action" className="mt-0">
                {loadingAction ? (
                    <p className="text-center p-12 text-muted-foreground">Loading action novels...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actionNovels?.map((novel) => (
                            <NovelCard key={novel.id} novel={novel} />
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="comedy" className="mt-0">
                {loadingComedy ? (
                    <p className="text-center p-12 text-muted-foreground">Loading comedy novels...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {comedyNovels?.map((novel) => (
                            <NovelCard key={novel.id} novel={novel} />
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="school" className="mt-0">
                {loadingSchool ? (
                    <p className="text-center p-12 text-muted-foreground">Loading school novels...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schoolNovels?.map((novel) => (
                            <NovelCard key={novel.id} novel={novel} />
                        ))}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    )
}
