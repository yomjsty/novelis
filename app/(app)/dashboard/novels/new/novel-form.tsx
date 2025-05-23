"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import GenreMultiselect from "./genre-multiselect"
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createNovel } from "@/actions/novel"
import { useRouter } from "next/navigation"
import { UploadDropzone } from "@/utils/uploadthing"
import Image from "next/image"
import TagsInput from "./tags-input"
import { Tag } from "emblor"
import { SelectNative } from "@/components/ui/select-native"

export default function NovelForm() {
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [genres, setGenres] = useState<string[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [status, setStatus] = useState("ongoing")
    const [featuredImage, setFeaturedImage] = useState<string | null>(null)
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: createNovel,
        onSuccess: () => {
            toast.success(`Novel ${title} created successfully`)
            queryClient.invalidateQueries({
                queryKey: ["novels"]
            })
            router.push(`/dashboard/novels`)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create novel.")
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ title, slug, synopsis, genres, tags: tags.map(tag => tag.text), featuredImage, status })
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
                <Label htmlFor="title">
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
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    value={slug}
                    readOnly
                    className="col-span-3 bg-muted text-muted-foreground"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="synopsis">
                    Synopsis
                </Label>
                <Textarea
                    id="synopsis"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    className="col-span-3"
                    required
                />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-4 md:col-span-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="status">Status</Label>
                        <SelectNative id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="hiatus">Hiatus</option>
                            <option value="cancelled">Cancelled</option>
                        </SelectNative>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="genres">
                            Genres
                        </Label>
                        <GenreMultiselect genres={genres} setGenres={setGenres} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tags">
                            Tags
                        </Label>
                        <TagsInput tags={tags} setTags={setTags} />
                        <p
                            className="text-muted-foreground text-xs"
                            role="region"
                            aria-live="polite"
                        >
                            Enter or comma-separate tags to add
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="featuredImage">
                            Featured Image
                        </Label>
                        <div className="space-y-4">
                            {featuredImage && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={featuredImage}
                                        alt="Featured Image"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )}

                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0]) {
                                        setFeaturedImage(res[0].ufsUrl)
                                        toast.success("Image uploaded successfully!")
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Upload failed: ${error.message}`)
                                }}
                            />
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
                        Creating...
                    </>
                ) : 'Create Novel'}
            </Button>
        </form>
    )
}
