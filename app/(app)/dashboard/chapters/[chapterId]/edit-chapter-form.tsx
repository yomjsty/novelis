"use client"

import { editChapter } from "@/actions/chapter"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import NovelSelect from "./novel-select"
import { Button } from "@/components/ui/button"
import { InfoIcon, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Chapter } from "@/lib/generated/prisma"
import { CreateChapter } from "@/types/types"

export default function EditChapterForm({ chapter }: { chapter: Chapter }) {
    const [title, setTitle] = useState(chapter.title)
    const [slug, setSlug] = useState(chapter.slug)
    const [content, setContent] = useState(chapter.content)
    const [novelId, setNovelId] = useState(chapter.novelId)
    const [isFree, setIsFree] = useState(chapter.isFree)
    const [price, setPrice] = useState<number | null>(chapter.price)
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateChapter) => editChapter(chapter.id, data),
        onSuccess: () => {
            toast.success(`Chapter ${title} updated successfully`)
            queryClient.invalidateQueries({
                queryKey: ["chapters"]
            })
            router.refresh();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update chapter.")
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ title, slug, content, novelId, isFree, price })
    }

    useEffect(() => {
        const newSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        setSlug(newSlug)
    }, [title])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Title
                </Label>
                <Input
                    id="title"
                    value={title}
                    placeholder="Enter the title of your novel"
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Slug
                </Label>
                <Input
                    id="slug"
                    value={slug}
                    placeholder="Enter the slug of your chapter"
                    onChange={(e) => setSlug(e.target.value)}
                    className="col-span-3 bg-muted text-muted-foreground"
                    required
                    readOnly
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Content
                </Label>
                <Textarea
                    id="content"
                    value={content}
                    placeholder="Enter the content of your chapter"
                    onChange={(e) => setContent(e.target.value)}
                    className="col-span-3"
                    required
                />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-4 md:col-span-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Select Novel
                        </Label>
                        <NovelSelect onChange={setNovelId} defaultValue={chapter.novelId} />
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Checkbox
                                    id="isFree"
                                    checked={isFree}
                                    onCheckedChange={(checked) => {
                                        setIsFree(checked === true);
                                        if (checked === true) {
                                            setPrice(null);
                                        } else {
                                            setPrice(12);
                                        }
                                    }}
                                    aria-describedby={`isFree-description`}
                                />
                                <div className="grid grow gap-2">
                                    <Label htmlFor="isFree" className="flex items-center gap-2">
                                        Free?{" "}
                                        <div className="flex items-center gap-1">
                                            <InfoIcon className="w-3 h-3 text-muted-foreground" />
                                            <p id={`isFree-description`} className="text-muted-foreground text-xs">
                                                You need to set a price if you uncheck this
                                            </p>
                                        </div>
                                    </Label>
                                </div>
                            </div>
                            {!isFree && (
                                <div className="flex items-center gap-2 pl-6">
                                    <Label htmlFor="price">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={price ?? ''}
                                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : null)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Button type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                    </>
                ) : 'Update Chapter'}
            </Button>
        </form >
    )
}