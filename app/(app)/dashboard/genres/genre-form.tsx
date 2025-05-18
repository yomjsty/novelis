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
    const [name, setName] = useState("");
    const queryClient = useQueryClient();
    const dialogCloseRef = useRef<HTMLButtonElement>(null)

    const { mutate, isPending } = useMutation({
        mutationFn: createGenre,
        onSuccess: () => {
            toast.success(`Genre ${name} created successfully`)
            queryClient.invalidateQueries({
                queryKey: ["genres"]
            })
            setName("")
            dialogCloseRef.current?.click()
        },
        onError: (error: Error) => {
            toast.error(error.message || "Gagal membuat genre.")
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(name)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Create Genre
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Genre</DialogTitle>
                    <DialogDescription>
                        Create a new genre to categorize your novels.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Genre Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            placeholder="action"
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3 lowercase"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" ref={dialogCloseRef}>
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : 'Create Version'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
