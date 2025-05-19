"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon, ArrowUpDown, Trash2 } from "lucide-react"
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
import { formatDistanceToNow } from "date-fns"
import { deleteChapter } from "@/actions/chapter"
import { Badge } from "@/components/ui/badge"

export type Chapter = {
    id: string
    title: string
    createdAt: Date
    updatedAt: Date
    novel: {
        title: string
    }
    isFree: boolean
    price: number | null;
}

function ActionCell({ chapter }: { chapter: Chapter }) {
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteChapter(chapter.id)
                toast.success("Chapter deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["chapters"] })
            } catch (error) {
                toast.error("Failed to delete chapter.")
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
                    <Link href={`/dashboard/chapters/${chapter.id}`}>
                        <DropdownMenuItem className="cursor-pointer">View Chapter</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AlertDialog>
                            <AlertDialogTrigger className="text-destructive flex items-center justify-center gap-2 cursor-pointer">
                                <Trash2 size={16} className="text-destructive" /> Delete Chapter
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete chapter &ldquo;{chapter.title}&rdquo;?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the chapter. This action cannot be undone.
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

export const columns: ColumnDef<Chapter>[] = [
    {
        id: "novel.title",
        accessorFn: (row) => row.novel.title,
        header: () => (
            <div className="flex items-center gap-1">
                Novel
            </div>
        ),
        cell: ({ row }) => {
            const novelTitle = row.original.novel.title
            return (
                <div className="font-medium">{novelTitle}</div>
            )
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Chapter Title
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            const title = row.original.title
            return (
                <div className="font-medium">{title}</div>
            )
        },
    },
    {
        accessorKey: "isFree",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Free
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => {
            const isFree = getValue() as boolean
            return (
                <Badge
                    variant={
                        isFree
                            ? "default"
                            : "secondary"
                    }
                >
                    {isFree ? "Free" : "Paid"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
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
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Updated
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
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
        cell: ({ row }) => <ActionCell chapter={row.original} />
    },
]
