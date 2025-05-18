"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { CreateChapter } from "@/types/types"

export async function createChapter(chapter: CreateChapter) {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")

    if (user.role !== "author" && user.role !== "admin") {
        throw new Error("You are not authorized to create a chapter");
    }

    const existingChapterOnNovel = await db.chapter.findFirst({
        where: {
            novelId: chapter.novelId,
            slug: chapter.slug
        }
    })

    if (existingChapterOnNovel) {
        throw new Error("Chapter with this slug already exists on this novel");
    }

    const createdChapter = await db.chapter.create({
        data: {
            title: chapter.title,
            slug: chapter.slug,
            content: chapter.content,
            novelId: chapter.novelId,
            isFree: chapter.isFree,
            price: chapter.price
        }
    })

    return createdChapter
}

export async function getAuthorChapters() {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")

    const chapters = await db.chapter.findMany({
        where: {
            novel: {
                authorId: user.id
            }
        },
        orderBy: {
            title: "desc"
        }
    })

    return chapters
}