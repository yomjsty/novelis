"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { CreateNovel } from "@/types/types"

export async function createNovel(novel: CreateNovel) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (user.role !== "author" && user.role !== "admin") {
        throw new Error("You are not authorized to create a novel");
    }

    const existingNovel = await db.novel.findUnique({ where: { slug: novel.slug } });
    if (existingNovel) {
        throw new Error("Novel with this slug already exists");
    }

    const createdNovel = await db.novel.create({
        data: {
            title: novel.title,
            slug: novel.slug,
            synopsis: novel.synopsis,
            status: novel.status,
            genres: {
                connect: novel.genres.map((genreId) => ({
                    id: genreId,
                })),
            },
            tags: {
                set: novel.tags,
            },
            featuredImage: novel.featuredImage,
            authorId: user.id,
        },
    });

    return createdNovel;
}

export async function getAuthorNovels() {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const novels = await db.novel.findMany({
        where: {
            authorId: user.id,
        },
        include: {
            genres: true,
            chapters: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return novels;
}

export async function getNovelById(id: string) {
    const novel = await db.novel.findUnique({
        where: { id },
        include: {
            genres: true,
        }
    });
    return novel;
}

export async function getNovelBySlug(slug: string) {
    const novel = await db.novel.findUnique({ where: { slug } });
    return novel;
}

export async function editNovel(id: string, novel: CreateNovel) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    if (user.role !== "author" && user.role !== "admin") {
        throw new Error("You are not authorized to edit this novel");
    }

    const novelToEdit = await db.novel.findUnique({
        where: { id },
        select: { authorId: true },
    });

    if (!novelToEdit) {
        throw new Error("Novel not found");
    }

    if (user.role !== "admin" && novelToEdit.authorId !== user.id) {
        throw new Error("You are not authorized to edit this novel");
    }

    const existingNovelWithSlug = await db.novel.findFirst({
        where: {
            slug: novel.slug,
            NOT: {
                id: id,
            },
        },
    });

    if (existingNovelWithSlug) {
        throw new Error("Novel with this slug already exists");
    }

    const updatedNovel = await db.novel.update({
        where: { id },
        data: {
            title: novel.title,
            slug: novel.slug,
            synopsis: novel.synopsis,
            status: novel.status,
            genres: {
                set: novel.genres.map((genreId) => ({
                    id: genreId,
                })),
            },
            tags: {
                set: novel.tags,
            },
            featuredImage: novel.featuredImage,
        },
    });

    return updatedNovel;
}

export async function deleteNovel(id: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    let whereCondition;

    if (user.role === "admin") {
        whereCondition = { id };
    } else if (user.role === "author") {
        whereCondition = { id, authorId: user.id };
    } else {
        throw new Error("You are not authorized to delete this novel");
    }

    const novel = await db.novel.findFirst({ where: whereCondition });
    if (!novel) {
        throw new Error("Novel not found or you are not authorized to delete it");
    }

    await db.novel.delete({ where: { id: novel.id } });
    return novel;
}
