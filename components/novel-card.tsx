// app/components/NovelCard.tsx
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

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
    chapters: { id: string; title?: string; slug?: string }[]
}

export function NovelCard({ novel }: { novel: Novel }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group">
            <CardContent className="p-0">
                <div className="flex flex-col">
                    <div className="relative">
                        <div className="w-full h-48 overflow-hidden">
                            <Image
                                src={novel.featuredImage || "/placeholder.svg"}
                                width={300}
                                height={200}
                                alt={novel.title}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                        </div>
                        {novel.isFeatured && (
                            <div className="absolute top-3 right-3">
                                <Badge className="bg-amber-500 text-white border-none">
                                    <Sparkles className="h-3 w-3 mr-1" /> Popular
                                </Badge>
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-lg font-bold text-white">{novel.title}</h3>
                            <div className="flex items-center mt-1">
                                <Badge className="bg-blue-600 text-white border-none">
                                    {novel.chapters.length > 0
                                        ? `Chapter ${novel.chapters.length}`
                                        : "No chapters yet"}
                                </Badge>
                                <span className="text-xs text-white/80 ml-2">
                                    {(() => {
                                        const diff = Date.now() - new Date(novel.updatedAt).getTime()
                                        const minutes = Math.floor(diff / (1000 * 60))
                                        const hours = Math.floor(diff / (1000 * 60 * 60))
                                        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                                        if (minutes < 60) return `Updated ${minutes} min ago`
                                        else if (hours < 24) return `Updated ${hours} hr ago`
                                        else return `Updated ${days} day${days > 1 ? "s" : ""} ago`
                                    })()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {novel.chapters?.[0]?.title || "No chapters available"}
                            </p>
                            <Badge variant="outline" className="mt-1 capitalize">
                                {novel.genres?.[0]?.name || "Uncategorized"}
                            </Badge>
                        </div>
                        <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                            asChild
                        >
                            <Link
                                href={
                                    novel.chapters?.[0]
                                        ? `/novel/${novel.slug}/chapter/${novel.chapters[0].slug}`
                                        : `/novel/${novel.slug}`
                                }
                            >
                                Read
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
