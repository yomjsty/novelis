"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookText, MoreVertical, Edit, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { getAuthorNovels } from "@/actions/novel"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

type PublishedNovelsCardProps = React.HTMLAttributes<HTMLDivElement>

export function PublishedNovelsCard({ className, ...props }: PublishedNovelsCardProps) {
    const { data: novels, isLoading, isError } = useQuery({
        queryKey: ["novels"],
        queryFn: () => getAuthorNovels(),
    })

    if (isLoading) return (<Card className={cn("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <BookText className="h-5 w-5" />
                    Published Novels
                </CardTitle>
                <CardDescription>Manage your published works</CardDescription>
            </div>
            <Button size="sm">New Novel</Button>
        </CardHeader>
        <CardContent className="py-8">
            <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading novels...
            </div>
        </CardContent>
    </Card>
    )

    if (!novels) return (<Card className={cn("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <BookText className="h-5 w-5" />
                    Published Novels
                </CardTitle>
                <CardDescription>Manage your published works</CardDescription>
            </div>
            <Button size="sm">New Novel</Button>
        </CardHeader>
        <CardContent className="py-8">
            <p className="text-muted-foreground text-center">No novels found</p>
        </CardContent>
    </Card>
    )

    if (isError) return (<Card className={cn("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <BookText className="h-5 w-5" />
                    Published Novels
                </CardTitle>
                <CardDescription>Manage your published works</CardDescription>
            </div>
            <Button size="sm">New Novel</Button>
        </CardHeader>
        <CardContent className="py-8">
            <p className="text-muted-foreground text-center">Error loading novels</p>
        </CardContent>
    </Card>
    )


    return (
        <Card className={cn("", className)} {...props}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <BookText className="h-5 w-5" />
                        Published Novels
                    </CardTitle>
                    <CardDescription>Manage your published works</CardDescription>
                </div>
                <Button size="sm">New Novel</Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {novels.map((novel) => (
                        <div key={novel.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                            <Image
                                src={novel.featuredImage || "/placeholder.svg"}
                                alt={novel.title}
                                className="h-24 w-16 object-cover rounded-md shadow-sm"
                                width={100}
                                height={100}
                            />
                            <div className="flex-1 space-y-1">
                                <div className="flex items-start justify-between">
                                    <h4 className="font-medium leading-none">{novel.title}</h4>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <Link href={`/dashboard/novels/${novel.id}`}>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Novel
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={novel.status === "cancelled" || novel.status === "hiatus" ? "destructive" : "default"} className="capitalize">{novel.status}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {novel.chapters.length ? novel.chapters.length : "No chapters yet"}
                                        {novel.chapters.length ? " chapters" : ""}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-muted-foreground">Views:
                                            {/* {novel.views} */}
                                            {" "}Soon
                                        </span>
                                        <span className="text-xs text-muted-foreground">Rating: ★
                                            {/* {novel.rating} */}
                                            {" "}Soon
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Updated: {formatDistanceToNow(new Date(novel.updatedAt), { addSuffix: true })}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
