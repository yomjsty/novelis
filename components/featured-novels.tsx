"use client"

import Image from "next/image"
import { BookOpen, ChevronLeft, ChevronRight, Clock, Plus, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedNovels } from "@/actions/novel"
import { useQuery } from "@tanstack/react-query"

export function FeaturedNovels() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const { data: featuredNovels, isLoading, isError } = useQuery({
        queryKey: ["featuredNovels"],
        queryFn: () => getFeaturedNovels(),
    })

    if (isLoading) return <div>Loading...</div>
    if (!featuredNovels) return <div>No featured novels found</div>
    if (isError) return <div>Error loading featured novels</div>

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === featuredNovels.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? featuredNovels.length - 1 : prev - 1))
    }

    return (
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="relative">
                    <div className="overflow-hidden rounded-xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {featuredNovels.map((novel) => (
                                <div
                                    key={novel.id}
                                    className="w-full flex-shrink-0 group relative flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-950 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 max-h-[500px]"
                                >
                                    <div className="absolute top-4 right-4 z-20">
                                        <Badge
                                            className={`text-white border-none px-3 py-1 text-xs font-medium capitalize`}
                                        >
                                            {novel.status}
                                        </Badge>
                                    </div>
                                    <div className="relative w-full md:w-1/4 aspect-[2/3] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-10"></div>
                                        <Image
                                            src={novel.featuredImage || "/placeholder.svg"}
                                            width={400}
                                            height={550}
                                            alt={novel.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between p-6 md:w-3/4">
                                        <div className="space-y-2">
                                            <Badge className="inline-block bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                                                Featured Novel
                                            </Badge>
                                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {novel.title}
                                            </h2>
                                            <div className="flex flex-wrap gap-2">
                                                {novel.genres?.map((genre) => (
                                                    <Badge key={genre.id} variant="secondary" className="text-xs capitalize">
                                                        {genre.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-3">{novel.synopsis}</p>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <div className="bg-amber-50 p-1 rounded-full dark:bg-amber-900/30">
                                                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                                    </div>
                                                    <span className="font-medium">Soon</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="bg-blue-50 p-1 rounded-full dark:bg-blue-900/30">
                                                        <BookOpen className="h-4 w-4 text-blue-500" />
                                                    </div>
                                                    <span>{novel.chapters.length} Chapters</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="bg-purple-50 p-1 rounded-full dark:bg-purple-900/30">
                                                        <Clock className="h-4 w-4 text-purple-500" />
                                                    </div>
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
                                            </div>
                                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                                <Button
                                                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-sm hover:shadow transition-all"
                                                    asChild
                                                >
                                                    <Link href={`/novel/${novel.slug}`}>Read Now</Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add to Library
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-900 transition-colors z-10 cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-900 transition-colors z-10 cursor-pointer"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex justify-center mt-4 gap-2">
                        {featuredNovels.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-blue-600 dark:bg-blue-500" : "w-2 bg-gray-300 dark:bg-gray-700"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
