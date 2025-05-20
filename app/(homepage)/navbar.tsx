"use client"

import Link from "next/link"
import {
    BookOpen,
    Menu,
    Search,
    Sun,
    Moon,
    ChevronDown,
    Bookmark,
    Trophy,
    Clock,
    Flame,
    Sparkles,
    BookMarked,
    Compass,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
    const { setTheme, theme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800 shadow-sm">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 rounded-lg p-1.5 dark:bg-blue-700 shadow-sm">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                        Novelis
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Home
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center text-sm font-medium gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                                Explore <ChevronDown className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                            <DropdownMenuLabel>Discover Content</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Browse</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Flame className="mr-2 h-4 w-4 text-red-500" /> Fantasy
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" /> Romance
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Compass className="mr-2 h-4 w-4 text-blue-500" /> Adventure
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Rankings</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Trophy className="mr-2 h-4 w-4 text-amber-500" /> Power Ranking
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <BookMarked className="mr-2 h-4 w-4 text-pink-500" /> Collection Ranking
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Flame className="mr-2 h-4 w-4 text-red-500" /> Trending Now
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Latest</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Clock className="mr-2 h-4 w-4 text-green-500" /> Today&apos;s Updates
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Sparkles className="mr-2 h-4 w-4 text-blue-500" /> New Releases
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Bookmarks</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Bookmark className="mr-2 h-4 w-4 text-blue-500" /> Reading List
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <BookMarked className="mr-2 h-4 w-4 text-green-500" /> Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Sparkles className="mr-2 h-4 w-4 text-purple-500" /> Favorites
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-4">
                    <form className="flex relative w-full max-w-[180px] md:max-w-[220px] lg:max-w-[280px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search novels..."
                            className="w-full pl-8 bg-muted/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </form>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hidden sm:flex">
                                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hidden lg:flex" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-sm hover:shadow transition-all"
                            asChild
                        >
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </div>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="sm:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetHeader hidden></SheetHeader>
                    <SheetTitle hidden></SheetTitle>
                    <SheetContent>
                        <div className="flex flex-col gap-6 mt-6">
                            <Link href="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Home
                            </Link>

                            <div className="space-y-4">
                                <p className="text-sm font-medium">Explore</p>
                                <div className="pl-4 border-l border-gray-200 dark:border-gray-800 space-y-6">
                                    <div className="space-y-3">
                                        <p className="text-xs font-medium text-muted-foreground">Browse</p>
                                        <div className="pl-2 space-y-2.5">
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Fantasy
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Romance
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Adventure
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-medium text-muted-foreground">Rankings</p>
                                        <div className="pl-2 space-y-2.5">
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Power Ranking
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Collection Ranking
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Trending Now
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-medium text-muted-foreground">Latest</p>
                                        <div className="pl-2 space-y-2.5">
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Today&apos;s Updates
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                New Releases
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-medium text-muted-foreground">Bookmarks</p>
                                        <div className="pl-2 space-y-2.5">
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Reading List
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Completed
                                            </Link>
                                            <Link href="#" className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Favorites
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <Button variant="outline" size="sm" className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" asChild>
                                    <Link href="/login">Sign In</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-sm hover:shadow transition-all"
                                    asChild
                                >
                                    <Link href="/register">Sign Up</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
