"use client"

import Image from "next/image"
import Link from "next/link"
import {
    BookOpen,
    Star,
    Clock,
    User,
    MessageSquare,
    Share2,
    Bookmark,
    ChevronRight,
    Heart,
    Eye,
    ThumbsUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { getNovelBySlug } from "@/actions/novel"
import { useQuery } from "@tanstack/react-query"

export default function NovelDetailPage() {
    const { slug } = useParams();

    const { data: novel, isLoading, isError } = useQuery({
        queryKey: ["novel", slug],
        queryFn: () => getNovelBySlug(slug as string),
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading novel</div>
    if (!novel) return <div>Novel not found</div>

    return (
        <>
            <section className="w-full py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Novel Cover */}
                        <div className="w-full md:w-1/4 flex flex-col items-center">
                            <div className="relative aspect-[2/3] w-full max-w-[250px] overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={novel.featuredImage || "/placeholder.svg"}
                                    alt={novel.title}
                                    width={400}
                                    height={550}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex gap-2 mt-4 w-full max-w-[250px]">
                                <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                                    Read First Chapter
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Bookmark className="h-5 w-5" />
                                    <span className="sr-only">Bookmark</span>
                                </Button>
                            </div>
                        </div>

                        {/* Novel Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {novel.genres?.map((genre) => (
                                    <Badge key={genre.id} className="capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                                        {genre.name}
                                    </Badge>
                                ))}
                                <Badge className="capitalize bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
                                    {novel.status}
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{novel.title}</h1>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">By {novel.author.name}</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <Star className="h-5 w-5 fill-amber-500" />
                                        {/* {novel.rating} */}
                                        <span className="font-bold text-lg">5</span>
                                    </div>
                                    {/* {novel.reviews} */}
                                    <span className="text-xs text-muted-foreground">251 reviews</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <div className="flex items-center gap-1 text-blue-500">
                                        <Bookmark className="h-5 w-5" />
                                        {/* {novel.bookmarks.toLocaleString()} */}
                                        <span className="font-bold text-lg">724</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Bookmarks</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <div className="flex items-center gap-1 text-purple-500">
                                        <Eye className="h-5 w-5" />
                                        {/* {novel.views.toLocaleString()} */}
                                        <span className="font-bold text-lg">124,893</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Views</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <div className="flex items-center gap-1 text-red-500">
                                        <Heart className="h-5 w-5" />
                                        {/* {novel.likes.toLocaleString()} */}
                                        <span className="font-bold text-lg">8,762</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Likes</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-500" />
                                    <span className="font-medium">Total Chapters:</span>
                                    <span>{novel.chapters.length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-green-500" />
                                    <span className="font-medium">Last Updated:</span>
                                    <span>
                                        {(() => {
                                            const diff = Date.now() - new Date(novel.updatedAt).getTime();
                                            const minutes = Math.floor(diff / (1000 * 60));
                                            const hours = Math.floor(diff / (1000 * 60 * 60));
                                            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

                                            if (minutes < 60) {
                                                return `Updated ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
                                            } else if (hours < 24) {
                                                return `Updated ${hours} hour${hours !== 1 ? 's' : ''} ago`;
                                            } else {
                                                return `Updated ${days} day${days !== 1 ? 's' : ''} ago`;
                                            }
                                        })()}
                                    </span>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-500" />
                                    <span className="font-medium">Release Schedule:</span>
                                    <span>{novel.releaseSchedule}</span>
                                </div> */}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {novel.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="border-gray-200 dark:border-gray-800">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    Like
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-8">
                <div className="container px-4 mx-auto max-w-7xl">
                    <Tabs defaultValue="synopsis" className="w-full">
                        <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap bg-muted/50 p-1 h-auto">
                            <TabsTrigger
                                value="synopsis"
                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 dark:data-[state=active]:bg-blue-700"
                            >
                                Synopsis
                            </TabsTrigger>
                            <TabsTrigger
                                value="chapters"
                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 dark:data-[state=active]:bg-blue-700"
                            >
                                Chapters
                            </TabsTrigger>
                            <TabsTrigger
                                value="reviews"
                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 dark:data-[state=active]:bg-blue-700"
                            >
                                Reviews
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="synopsis" className="space-y-6">
                            <div className="prose dark:prose-invert max-w-none">
                                {novel.synopsis?.split("\n\n").map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4">You May Also Like (SOON)</h3>
                                {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {novel.relatedNovels.map((relatedNovel) => (
                                        <Link
                                            href={`/novel/${relatedNovel.title.toLowerCase().replace(/\s+/g, "-")}`}
                                            key={relatedNovel.id}
                                            className="group"
                                        >
                                            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                                                <Image
                                                    src={relatedNovel.image || "/placeholder.svg"}
                                                    alt={relatedNovel.title}
                                                    width={200}
                                                    height={300}
                                                    className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                                                />
                                                <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/80 rounded-full py-1 px-2 flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                                    <span className="text-xs font-medium">{relatedNovel.rating}</span>
                                                </div>
                                            </div>
                                            <h4 className="mt-2 text-sm font-medium line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                {relatedNovel.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div> */}
                            </div>
                        </TabsContent>

                        <TabsContent value="chapters" className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">Latest Chapters</h3>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    View All Chapters
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {novel.chapters.map((chapter) => (
                                    <Link href={`/novel/${novel.slug}/chapter/${chapter.slug}`} key={chapter.id}>
                                        <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                            {chapter.title}
                                                        </Badge>
                                                        <span className="text-sm text-muted-foreground">{chapter.createdAt.toLocaleDateString()}</span>
                                                    </div>
                                                    <h4 className="font-medium mt-1">{chapter.title}</h4>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="text-sm">4</span>
                                                        {/* <span className="text-sm">{chapter.views.toLocaleString()}</span> */}
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex justify-center mt-6">
                                <Button variant="outline">Load More Chapters</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                                <div className="flex flex-col sm:flex-row gap-6 items-center">
                                    {/* <div className="flex flex-col items-center">
                                        <div className="text-5xl font-bold text-amber-500">{novel.rating}</div>
                                        <div className="flex items-center mt-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-5 w-5 ${star <= Math.floor(novel.rating)
                                                        ? "fill-amber-500 text-amber-500"
                                                        : star <= novel.rating
                                                            ? "fill-amber-500/50 text-amber-500/50"
                                                            : "fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">{novel.reviews} reviews</div>
                                    </div> */}

                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm w-6">5★</div>
                                            <Progress value={75} className="h-2" />
                                            <div className="text-sm text-muted-foreground w-10">75%</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm w-6">4★</div>
                                            <Progress value={20} className="h-2" />
                                            <div className="text-sm text-muted-foreground w-10">20%</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm w-6">3★</div>
                                            <Progress value={3} className="h-2" />
                                            <div className="text-sm text-muted-foreground w-10">3%</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm w-6">2★</div>
                                            <Progress value={1} className="h-2" />
                                            <div className="text-sm text-muted-foreground w-10">1%</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm w-6">1★</div>
                                            <Progress value={1} className="h-2" />
                                            <div className="text-sm text-muted-foreground w-10">1%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-center">
                                    <Button>Write a Review</Button>
                                </div>
                            </div>

                            <div className="text-center text-muted-foreground py-8">Sign in to view and post reviews</div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    )
}
