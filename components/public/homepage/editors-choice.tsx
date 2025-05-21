"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Award } from "lucide-react"
import { getAllNovels } from "@/actions/novel"
import { useQuery } from "@tanstack/react-query"

export function EditorsChoice() {
    const { data: editorsPicks, isLoading, isError } = useQuery({
        queryKey: ["novels"],
        queryFn: () => getAllNovels(),
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading novels</div>
    if (!editorsPicks) return <div>No novels found</div>

    return (
        <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Editors&apos; Choice</h2>
                        <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            SWITCH
                        </button>
                        <Link
                            href="#"
                            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 group"
                        >
                            View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {editorsPicks.map((novel) => (
                        <Link href="#" key={novel.id}>
                            <div className="flex items-start gap-3 group p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                <div className="relative aspect-[2/3] h-24 overflow-hidden rounded-md shadow-md">
                                    <Image
                                        src={novel.featuredImage || "/placeholder.svg"}
                                        width={80}
                                        height={120}
                                        alt={novel.title}
                                        className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                                    />
                                    {/* {novel.isEditorsPick && ( */}
                                    <div className="absolute -top-1 -right-1">
                                        <div className="bg-amber-500 text-white rounded-full p-0.5 shadow-md">
                                            <Award className="h-3 w-3" />
                                        </div>
                                    </div>
                                    {/* )} */}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                        {novel.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 capitalize">{novel.genres[0].name}</p>
                                    <div className="mt-2 flex items-center">
                                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-amber-500 rounded-full"
                                                style={{ width: `${Math.random() * 50 + 50}%` }}
                                            ></div>
                                        </div>
                                        <span className="ml-2 text-xs text-muted-foreground">Popularity</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
