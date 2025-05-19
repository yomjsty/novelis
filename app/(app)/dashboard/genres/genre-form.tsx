"use client"

import { createGenre } from "@/actions/genre"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

export default function GenreForm() {
    const [name, setName] = useState("")
    const queryClient = useQueryClient()
    const dialogCloseRef = useRef<HTMLButtonElement>(null)

    const { mutate, isPending } = useMutation({
        mutationFn: createGenre,
        onSuccess: () => {
            toast.success(`Genre "${name}" created successfully`)
            queryClient.invalidateQueries({ queryKey: ["genres"] })
            setName("")
            dialogCloseRef.current?.click()
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create genre.")
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(name)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Genre</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Genre</DialogTitle>
                    <DialogDescription>
                        Add a new genre to help organize your novels.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Genre Name</Label>
                        <Input
                            id="name"
                            value={name}
                            placeholder="e.g. action"
                            onChange={(e) => setName(e.target.value)}
                            className="lowercase"
                            required
                        />
                    </div>

                    <DialogFooter className="flex justify-between gap-2 pt-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                ref={dialogCloseRef}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Genre"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
