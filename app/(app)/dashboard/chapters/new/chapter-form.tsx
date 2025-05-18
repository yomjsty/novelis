"use client"

import { createChapter } from "@/actions/chapter"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import NovelSelect from "./novel-select"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ChapterForm() {
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    const [novelId, setNovelId] = useState("")
    const [isFree, setIsFree] = useState(false)
    const [price, setPrice] = useState<number | null>(12)
    const router = useRouter();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createChapter,
        onSuccess: () => {
            toast.success(`Chapter ${title} created successfully`)
            queryClient.invalidateQueries({
                queryKey: ["chapters"]
            })
            router.push(`/dashboard/chapters`)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create chapter.")
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
                <Label htmlFor="name" className="text-right">
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
                <Label htmlFor="name" className="text-right">
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
                <Label htmlFor="name" className="text-right">
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
            <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-right">
                    Select Novel
                </Label>
                <NovelSelect onChange={setNovelId} />
            </div>
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
                            <Label htmlFor="isFree">
                                Free?{" "}
                            </Label>
                            <p id={`isFree-description`} className="text-muted-foreground text-xs">
                                You need to set a price if you uncheck this
                            </p>
                        </div>
                    </div>
                    {!isFree && (
                        <div className="flex gap-2">
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
            <Button type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                    </>
                ) : 'Create Chapter'}
            </Button>
        </form>
    )
}