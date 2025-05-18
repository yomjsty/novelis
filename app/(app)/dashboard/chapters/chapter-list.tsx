"use client"

import { deleteNovel } from "@/actions/novel"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { getAuthorChapters } from "@/actions/chapter";

export default function ChapterList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["chapters"],
        queryFn: getAuthorChapters,
    })
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteNovel,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["novels"] })
            toast.success(`Novel ${data.title} deleted successfully`)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete novel")
        }
    })
    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Failed to load chapters.</div>

    if (!data || data.length === 0) {
        return <div>No chapters available.</div>
    }

    return (
        <div className="flex flex-col gap-2">
            {data.map((chapter) => (
                <div key={chapter.id} className="flex justify-between items-center gap-4">
                    <span>{chapter.title}</span>
                    <Link href={`/dashboard/chapters/${chapter.id}`}>
                        <Button size="sm"><Pencil className="w-4 h-4" /></Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the novel.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                    variant="destructive"
                                    onClick={() => mutate(chapter.id)}
                                    disabled={isPending}
                                >
                                    {isPending ? <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting
                                    </> : "Delete"}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ))}
        </div>
    )
}
