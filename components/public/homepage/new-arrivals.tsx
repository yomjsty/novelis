"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"

export function NewArrivals() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slidesToShow = 6 // Show 4 novels per slide

    const newArrivals = [
        {
            id: 1,
            title: "The Last Guardian",
            category: "Fantasy",
            image: "/placeholder.svg?height=300&width=200&text=Novel%201",
            rating: 4.5,
            isHot: true,
            slug: "the-last-guardian",
        },
        {
            id: 2,
            title: "Shadow of the Moon",
            category: "Romance",
            image: "/placeholder.svg?height=300&width=200&text=Novel%202",
            rating: 4.7,
            isNew: true,
            slug: "shadow-of-the-moon",
        },
        {
            id: 3,
            title: "Dragon's Breath",
            category: "Fantasy",
            image: "/placeholder.svg?height=300&width=200&text=Novel%203",
            rating: 4.8,
            isHot: true,
            slug: "dragons-breath",
        },
        {
            id: 4,
            title: "The Silent Blade",
            category: "Action",
            image: "/placeholder.svg?height=300&width=200&text=Novel%204",
            rating: 4.3,
            slug: "the-silent-blade",
        },
        {
            id: 5,
            title: "Crimson Ties",
            category: "Horror",
            image: "/placeholder.svg?height=300&width=200&text=Novel%205",
            rating: 4.6,
            isNew: true,
            slug: "crimson-ties",
        },
        {
            id: 6,
            title: "Eternal Bond",
            category: "Romance",
            image: "/placeholder.svg?height=300&width=200&text=Novel%206",
            rating: 4.9,
            isHot: true,
            slug: "eternal-bond",
        },
        {
            id: 7,
            title: "Night Walker",
            category: "Mystery",
            image: "/placeholder.svg?height=300&width=200&text=Novel%207",
            rating: 4.4,
            slug: "night-walker",
        },
        {
            id: 8,
            title: "The Enchantress",
            category: "Fantasy",
            image: "/placeholder.svg?height=300&width=200&text=Novel%208",
            rating: 4.7,
            isNew: true,
            slug: "the-enchantress",
        },
        {
            id: 9,
            title: "Mystic Realms",
            category: "Fantasy",
            image: "/placeholder.svg?height=300&width=200&text=Novel%209",
            rating: 4.6,
            isHot: true,
            slug: "mystic-realms",
        },
        {
            id: 10,
            title: "Starlight Saga",
            category: "Sci-Fi",
            image: "/placeholder.svg?height=300&width=200&text=Novel%2010",
            rating: 4.8,
            isNew: true,
            slug: "starlight-saga",
        },
    ]

    const totalSlides = Math.ceil(newArrivals.length / slidesToShow)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
    }

    return (
        <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Arrivals</h2>
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                    <Link
                        href="#"
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 group"
                    >
                        View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="flex-shrink-0 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                                >
                                    {newArrivals
                                        .slice(slideIndex * slidesToShow, slideIndex * slidesToShow + slidesToShow)
                                        .map((novel) => (
                                            <Link href={`/novel/${novel.slug}`} key={novel.id} className="group flex flex-col">
                                                <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                                                    {novel.isHot && (
                                                        <div className="absolute top-2 left-2 z-10">
                                                            <Badge className="bg-red-500 hover:bg-red-600 text-white border-none px-2 py-0.5 text-[10px]">
                                                                HOT
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    {novel.isNew && (
                                                        <div className="absolute top-2 left-2 z-10">
                                                            <Badge className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-0.5 text-[10px]">
                                                                NEW
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    <Image
                                                        src={novel.image || "/placeholder.svg"}
                                                        width={200}
                                                        height={300}
                                                        alt={novel.title}
                                                        className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/80 rounded-full py-1 px-2 flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                                        <span className="text-xs font-medium">{novel.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h3 className="font-medium text-sm line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {novel.title}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">{novel.category}</p>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-900 transition-colors z-10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-900 transition-colors z-10"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex justify-center mt-4 gap-2">
                        {Array.from({ length: totalSlides }).map((_, index) => (
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
