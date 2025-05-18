"use client"

import { deleteGenre, getGenres } from "@/actions/genre";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react";

export default function GenreList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    })
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteGenre,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["genres"] })
            toast.success(`Genre ${data.name} deleted successfully`)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete genre")
        }
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Gagal memuat genre.</div>

    if (!data || data.length === 0) {
        return <div>Tidak ada genre tersedia.</div>
    }

    return (
        <div className="flex flex-col gap-2">
            {data.map((genre) => (
                <div key={genre.id} className="flex justify-between items-center gap-4">
                    <span>{genre.name}</span>
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
                                    This action cannot be undone. This will permanently delete the genre.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                    variant="destructive"
                                    onClick={() => mutate(genre.id)}
                                    disabled={isPending}
                                >
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {/* <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => mutate(genre.id)}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button> */}
                </div>
            ))}
        </div>
    )
}
