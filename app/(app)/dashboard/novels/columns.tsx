"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon, ArrowUpDown, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { toast } from "sonner"
import { useTransition } from "react"
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { deleteNovel } from "@/actions/novel"

export type Novel = {
    id: string
    title: string
    status: string
    featuredImage: string | null
    createdAt: Date
    updatedAt: Date
}

function ActionCell({ novel }: { novel: Novel }) {
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteNovel(novel.id)
                toast.success("Novel deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["novels"] })
            } catch (error) {
                toast.error("Failed to delete novel.")
                console.error(error)
            }
        })
    }

    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/dashboard/novels/${novel.id}`}>
                        <DropdownMenuItem className="cursor-pointer">View Novel</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AlertDialog>
                            <AlertDialogTrigger className="text-destructive flex items-center justify-center gap-2 cursor-pointer">
                                <Trash2 size={16} className="text-destructive" /> Delete Novel
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete novel &ldquo;{novel.title}&rdquo;?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the novel and all its chapters. This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Deleting..." : "Delete"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export const columns: ColumnDef<Novel>[] = [
    {
        accessorKey: "title",
        header: () => (
            <div className="flex items-center gap-1">
                Title
            </div>
        ),
        cell: ({ row }) => {
            const title = row.original.title
            return (
                <div>
                    <div className="font-medium">{title}</div>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => {
            const status = getValue() as string
            return (
                <Badge
                    variant={
                        status === "cancelled" || status === "hiatus"
                            ? "destructive"
                            : "default"
                    }
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            )
        },
    },
    {
        accessorKey: "featuredImage",
        header: () => (
            <div className="flex items-center gap-1">
                Featured Image
            </div>
        ),
        cell: ({ row }) => {
            const featuredImage = row.original.featuredImage
            return (
                <Image
                    src={featuredImage || "/placeholder.svg"}
                    alt={row.original.title}
                    className="h-24 w-16 object-cover rounded-md shadow-sm"
                    width={100}
                    height={100}
                />
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt)
            return (
                <div>
                    {date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </div>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            const date = new Date(row.original.updatedAt)
            return (
                <div>
                    {formatDistanceToNow(date, { addSuffix: true })}
                </div>
            )
        }
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => <ActionCell novel={row.original} />
    },
]
