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

    const createdNovel = await db.novel.create({
        data: {
            title: novel.title,
            slug: novel.slug,
            synopsis: novel.synopsis,
            authorId: user.id,
            genres: {
                connect: novel.genres.map((genreId) => ({
                    id: genreId,
                })),
            },
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
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return novels;
}

export async function deleteAuthorNovel(id: string) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    // Tentukan kondisi 'where' berdasarkan peran
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
