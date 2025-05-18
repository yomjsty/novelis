"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"

export async function createGenre(name: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")
    if (user.role !== "admin") throw new Error("You are not authorized to delete a genre")

    const isUnique = await db.genre.findFirst({
        where: { name }
    })

    if (isUnique) throw new Error("Genre already exists")

    const genre = await db.genre.create({
        data: { name }
    })

    return genre;
}

export async function getGenres() {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const genres = await db.genre.findMany({
        orderBy: {
            name: "asc"
        }
    });
    return genres;
}

export async function deleteGenre(id: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")
    if (user.role !== "admin") throw new Error("You are not authorized to delete a genre")

    return await db.genre.delete({ where: { id } })
}

