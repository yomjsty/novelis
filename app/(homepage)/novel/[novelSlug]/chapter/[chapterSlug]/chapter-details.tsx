"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Home,
    List,
    MessageSquare,
    Moon,
    Settings,
    Share2,
    Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
} from "@/components/ui/sheet"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
    DrawerFooter,
} from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { getChapterBySlug } from "@/actions/chapter"
import { useQuery } from "@tanstack/react-query"

export default function ChapterDetails() {
    // Reading settings state
    const [fontSize, setFontSize] = useState(18)
    const [lineHeight, setLineHeight] = useState(1.8)
    const [fontFamily, setFontFamily] = useState("serif")
    const [isScrolling, setIsScrolling] = useState(false)
    const [readingProgress, setReadingProgress] = useState(0)
    const [lastScrollY, setLastScrollY] = useState(0)

    const params = useParams()
    const { novelSlug, chapterSlug } = params
    const { theme, setTheme } = useTheme()

    const { data: chapter, isLoading, isError } = useQuery({
        queryKey: ["chapter", chapterSlug],
        queryFn: () => getChapterBySlug(novelSlug as string, chapterSlug as string),
    });

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.body.scrollHeight
            const winHeight = window.innerHeight
            const scrollPercent = scrollTop / (docHeight - winHeight)

            // Only update if the value has changed significantly to avoid excessive re-renders
            if (Math.abs(readingProgress - scrollPercent * 100) > 0.5) {
                setReadingProgress(scrollPercent * 100)
            }

            // Show header when scrolling up, hide when scrolling down
            if (scrollTop < lastScrollY) {
                setIsScrolling(false)
            } else if (scrollTop > 100) { // Only hide after scrolling down 100px
                setIsScrolling(true)
            }

            setLastScrollY(scrollTop)

            clearTimeout(timeout)
            timeout = setTimeout(() => {
                setIsScrolling(false)
            }, 1500)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            clearTimeout(timeout)
        }
    }, [isScrolling, readingProgress, lastScrollY])

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading novel</div>
    if (!chapter) return <div>Novel not found</div>

    // Calculate word count and read time
    const wordCount = chapter.content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 250) // Assuming average reading speed of 250 words per minute

    // Find current chapter index and calculate previous/next chapters
    const currentIndex = chapter.novel.chapters.findIndex(c => c.slug === chapterSlug)
    const previousChapter = currentIndex > 0 ? chapter.novel.chapters[currentIndex - 1] : null
    const nextChapter = currentIndex < chapter.novel.chapters.length - 1 ? chapter.novel.chapters[currentIndex + 1] : null

    return (
        <div className={`min-h-screen bg-white dark:bg-gray-950 ${fontFamily}`}>
            {/* Reading progress bar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Progress value={readingProgress} className="h-1 rounded-none" />
            </div>

            {/* Top navigation bar */}
            <header
                className={`sticky top-16 z-40 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b transition-all duration-300 ${isScrolling ? "opacity-0 translate-y-[-100%]" : "opacity-100 translate-y-0"
                    }`}
            >
                <div className="container flex h-14 items-center justify-between mx-auto">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/novel/${novelSlug}`}>
                                <ChevronLeft className="h-5 w-5" />
                                <span className="sr-only">Back to novel</span>
                            </Link>
                        </Button>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium truncate max-w-[200px]">{chapter.novel.title}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-muted-foreground">{chapter.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <List className="h-5 w-5" />
                                    <span className="sr-only">Chapters</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[540px]">
                                <SheetHeader>
                                    <SheetTitle>Chapters</SheetTitle>
                                </SheetHeader>
                                <div className="py-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-24 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                                            <div
                                                className="w-full h-full bg-center bg-cover"
                                                style={{ backgroundImage: `url(${chapter.novel.featuredImage})` }}
                                            ></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{chapter.novel.title}</h3>
                                            <p className="text-sm text-muted-foreground">By {chapter.novel.author.name}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        {[...chapter.novel.chapters].reverse().map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/novel/${novelSlug}/chapter/${item.slug}`}
                                                className={`flex items-center justify-between p-2 rounded-md ${item.slug === chapterSlug
                                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {/* <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${false
                                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                                                            }`}
                                                    >
                                                        {item.title.split(" ")[1] || item.title}
                                                    </div> */}
                                                    <span className="text-sm">{item.title}</span>
                                                </div>
                                                {false && item.slug !== chapterSlug && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                                                    >
                                                        Read
                                                    </Badge>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button variant="outline" className="w-full">
                                            Close
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Reading Settings</span>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerTitle>Reading Settings</DrawerTitle>
                                    </DrawerHeader>
                                    <div className="p-4 pb-0">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">Font Size</span>
                                                    <span className="text-sm text-muted-foreground">{fontSize}px</span>
                                                </div>
                                                <Slider
                                                    value={[fontSize]}
                                                    min={14}
                                                    max={24}
                                                    step={1}
                                                    onValueChange={(value) => setFontSize(value[0])}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">Line Height</span>
                                                    <span className="text-sm text-muted-foreground">{lineHeight.toFixed(1)}</span>
                                                </div>
                                                <Slider
                                                    value={[lineHeight * 10]}
                                                    min={15}
                                                    max={25}
                                                    step={1}
                                                    onValueChange={(value) => setLineHeight(value[0] / 10)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-sm font-medium">Font Family</span>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <Button
                                                        variant={fontFamily === "serif" ? "default" : "outline"}
                                                        onClick={() => setFontFamily("serif")}
                                                        className="font-serif"
                                                    >
                                                        Serif
                                                    </Button>
                                                    <Button
                                                        variant={fontFamily === "sans" ? "default" : "outline"}
                                                        onClick={() => setFontFamily("sans")}
                                                        className="font-sans"
                                                    >
                                                        Sans
                                                    </Button>
                                                    <Button
                                                        variant={fontFamily === "mono" ? "default" : "outline"}
                                                        onClick={() => setFontFamily("mono")}
                                                        className="font-mono"
                                                    >
                                                        Mono
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-sm font-medium">Theme</span>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
                                                        <Sun className="h-4 w-4 mr-2" />
                                                        Light
                                                    </Button>
                                                    <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
                                                        <Moon className="h-4 w-4 mr-2" />
                                                        Dark
                                                    </Button>
                                                    <Button
                                                        variant={theme === "system" ? "default" : "outline"}
                                                        onClick={() => setTheme("system")}
                                                    >
                                                        <div className="h-4 w-4 mr-2 relative">
                                                            <Sun className="h-4 w-4 absolute opacity-50" />
                                                            <Moon className="h-4 w-4 absolute opacity-50" />
                                                        </div>
                                                        Auto
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MessageSquare className="h-5 w-5" />
                                    <span className="sr-only">Comments</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle>Comments</SheetTitle>
                                </SheetHeader>
                                <div className="py-4">
                                    <Tabs defaultValue="chapter">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="chapter">Chapter Comments</TabsTrigger>
                                            <TabsTrigger value="all">All Comments</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="chapter" className="mt-4 space-y-4">
                                            {/* {chapter.comments.map((comment) => (
                                                <div key={comment.id} className="flex gap-3 pb-4 border-b">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                                        <div
                                                            className="w-full h-full bg-center bg-cover"
                                                            style={{ backgroundImage: `url(${comment.avatar})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium">{comment.user}</p>
                                                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                                        </div>
                                                        <p className="text-sm mt-1">{comment.content}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                                <ThumbsUp className="h-3 w-3 mr-1" />
                                                                {comment.likes}
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                                Reply
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))} */}
                                            <div className="pt-4">
                                                <Button className="w-full">Add Comment</Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="all" className="mt-4">
                                            <div className="text-center py-8 text-muted-foreground">Sign in to view all comments</div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Share2 className="h-5 w-5" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                                <DropdownMenuItem>Share to Facebook</DropdownMenuItem>
                                <DropdownMenuItem>Share to Twitter</DropdownMenuItem>
                                <DropdownMenuItem>Share to WhatsApp</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/">
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Home</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Chapter content */}
            <main className="container py-8 md:py-12 mx-auto">
                <article className="mx-auto max-w-prose">
                    <header className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <span>{wordCount} words</span>
                            <span>•</span>
                            <span>{readTime} min read</span>
                            <span>•</span>
                            <span>{new Date(chapter.createdAt).toLocaleDateString()}</span>
                        </div>
                    </header>

                    <div
                        className="prose dark:prose-invert mx-auto"
                        style={{
                            fontSize: `${fontSize}px`,
                            lineHeight: lineHeight,
                            fontFamily:
                                fontFamily === "serif"
                                    ? "Georgia, serif"
                                    : fontFamily === "sans"
                                        ? "system-ui, sans-serif"
                                        : "monospace",
                        }}
                        dangerouslySetInnerHTML={{ __html: chapter.content }}
                    />
                </article>
            </main>

            {/* Chapter navigation */}
            <div
                className={`sticky bottom-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur border-t transition-all duration-300 ${isScrolling ? "opacity-0 translate-y-[100%]" : "opacity-100 translate-y-0"
                    }`}
            >
                <div className="container py-4 mx-auto">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            className="gap-1"
                            disabled={!previousChapter}
                            asChild={!!previousChapter}
                        >
                            {previousChapter ? (
                                <Link href={`/novel/${novelSlug}/chapter/${previousChapter.slug}`}>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="hidden sm:inline">Previous:</span>
                                    <span className="truncate max-w-[100px] sm:max-w-[200px]">{previousChapter.title}</span>
                                </Link>
                            ) : (
                                <>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span>Previous</span>
                                </>
                            )}
                        </Button>

                        <div className="hidden sm:block text-center">
                            <Button variant="ghost" asChild>
                                <Link href={`/novel/${novelSlug}`}>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Back to Novel
                                </Link>
                            </Button>
                        </div>

                        <Button variant="outline" className="gap-1" disabled={!nextChapter} asChild={!!nextChapter}>
                            {nextChapter ? (
                                <Link href={`/novel/${novelSlug}/chapter/${nextChapter.slug}`}>
                                    <span className="truncate max-w-[100px] sm:max-w-[200px]">{nextChapter.title}</span>
                                    <span className="hidden sm:inline">:Next</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            ) : (
                                <>
                                    <span>Next</span>
                                    <ChevronRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
