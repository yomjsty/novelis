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
import { editNovel } from "@/actions/novel"
import { useRouter } from "next/navigation"
import { UploadDropzone } from "@/utils/uploadthing"
import Image from "next/image"
import TagsInput from "./tags-input"
import { Tag } from "emblor"
import { Novel, Genre } from "@/lib/generated/prisma"
import { CreateNovel } from "@/types/types"
import { SelectNative } from "@/components/ui/select-native"

type NovelWithGenres = Novel & {
    genres: Genre[]
}

export default function EditNovelForm({ novel }: { novel: NovelWithGenres }) {
    const [title, setTitle] = useState(novel.title)
    const [slug, setSlug] = useState(novel.slug)
    const [synopsis, setSynopsis] = useState(novel.synopsis || "")
    const [genres, setGenres] = useState<string[]>(novel.genres.map((genre) => genre.id))
    const [tags, setTags] = useState<Tag[]>(novel.tags.map(tag => ({ id: tag, text: tag })))
    const [featuredImage, setFeaturedImage] = useState(novel.featuredImage || "")
    const [status, setStatus] = useState(novel.status)
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateNovel) => editNovel(novel.id, data),
        onSuccess: () => {
            toast.success(`Novel ${title} updated successfully`)
            queryClient.invalidateQueries({
                queryKey: ["novels"]
            })
            router.refresh();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update novel.")
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
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    value={slug}
                    readOnly
                    className="col-span-3 bg-muted text-muted-foreground"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Synopsis
                </Label>
                <Textarea
                    id="synopsis"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    className="col-span-3 lowercase"
                    required
                />
            </div>
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
                <Label htmlFor="name">
                    Genres
                </Label>
                <GenreMultiselect genres={genres} setGenres={setGenres} />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
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
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
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

            <Button type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                    </>
                ) : 'Update Novel'}
            </Button>
        </form>
    )
}
