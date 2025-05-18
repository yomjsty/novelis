"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { CreateNovel } from "@/types/types"

export async function createNovel(novel: CreateNovel) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    // Ubah sesuai role yang diizinkan
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
