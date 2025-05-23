"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { CreateChapter } from "@/types/types"
import { revalidatePath } from "next/cache";

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

    await db.novel.update({
        where: { id: chapter.novelId },
        data: {
            updatedAt: new Date()
        }
    })

    revalidatePath("/");

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
        include: {
            novel: {
                select: {
                    title: true
                }
            }
        },
        orderBy: {
            title: "desc"
        }
    })

    return chapters
}

export async function getChapterById(id: string) {
    const chapter = await db.chapter.findUnique({
        where: { id },
        include: {
            novel: true
        }
    })
    return chapter
}

export async function deleteChapter(id: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")

    let whereCondition;

    if (user.role === "admin") {
        whereCondition = { id };
    } else if (user.role === "author") {
        whereCondition = { id, novel: { authorId: user.id } };
    } else {
        throw new Error("You are not authorized to delete this novel");
    }

    const chapter = await db.chapter.findFirst({ where: whereCondition });
    if (!chapter) {
        throw new Error("Chapter not found or you are not authorized to delete it");
    }

    await db.chapter.delete({
        where: {
            id: chapter.id
        }
    })

    revalidatePath("/");

    return chapter
}

export async function editChapter(id: string, chapter: CreateChapter) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (user.role !== "author" && user.role !== "admin") {
        throw new Error("You are not authorized to edit this novel");
    }

    const chapterToEdit = await db.chapter.findUnique({
        where: { id },
        select: { novelId: true },
    });

    if (!chapterToEdit) {
        throw new Error("Chapter not found");
    }

    if (user.role !== "admin" && chapterToEdit.novelId !== user.id) {
        throw new Error("You are not authorized to edit this chapter");
    }

    const existingChapterWithSlug = await db.chapter.findFirst({
        where: {
            slug: chapter.slug,
            NOT: {
                id: id,
            },
        },
    });

    if (existingChapterWithSlug) {
        throw new Error("Chapter with this slug already exists");
    }

    const updatedChapter = await db.chapter.update({
        where: { id },
        data: {
            title: chapter.title,
            slug: chapter.slug,
            content: chapter.content,
            isFree: chapter.isFree,
            price: chapter.price
        },
    });

    await db.novel.update({
        where: { id: chapterToEdit.novelId },
        data: {
            updatedAt: new Date()
        }
    })

    revalidatePath("/");

    return updatedChapter;
}

export async function getChapterBySlug(novelSlug: string, chapterSlug: string) {
    const chapter = await db.chapter.findFirst({
        where: {
            slug: chapterSlug,
            novel: {
                slug: novelSlug
            }
        },
        include: {
            novel: {
                include: {
                    author: true,
                    genres: true,
                    chapters: {
                        orderBy: {
                            createdAt: "asc"
                        }
                    }
                }
            }
        }
    });

    if (!chapter) {
        throw new Error("Chapter not found");
    }

    return chapter;
}
