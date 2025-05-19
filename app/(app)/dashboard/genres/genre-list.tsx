"use client"

import { deleteGenre, getGenres } from "@/actions/genre";
import { Button } from "@/components/ui/button";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function GenreList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteGenre,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["genres"] });
            toast.success(`Genre "${data.name}" deleted successfully`);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete genre");
        }
    });

    if (isLoading) return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="border p-8 shadow-sm hover:shadow-md transition-all" />
            ))}
        </div>
    );
    if (!data || data.length === 0) return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            <div className="flex items-center justify-between rounded-xl border bg-white dark:bg-muted p-4 shadow-sm hover:shadow-md transition-all">
                <p className="text-muted-foreground">No genres available</p>
            </div>
        </div>
    );;
    if (isError) return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            <div className="flex items-center justify-between rounded-xl border bg-white dark:bg-muted p-4 shadow-sm hover:shadow-md transition-all">
                <p className="text-red-500">Failed to load genres.</p>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {data.map((genre) => (
                <div
                    key={genre.id}
                    className="flex items-center justify-between rounded-xl border bg-white dark:bg-muted p-4 shadow-sm hover:shadow-md transition-all"
                >
                    <span className="text-sm font-medium capitalize">{genre.name}</span>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete the genre &quot;{genre.name}&quot; and cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                    variant="destructive"
                                    onClick={() => mutate(genre.id)}
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Deleting...
                                        </>
                                    ) : (
                                        "Delete"
                                    )}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ))}
        </div>
    );
}
