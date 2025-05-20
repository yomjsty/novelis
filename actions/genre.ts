"use server"

import db from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"

export async function createGenre(name: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")
    if (user.role !== "admin") throw new Error("You are not authorized to create a genre")

    try {
        const genre = await db.genre.create({
            data: { name: name.toLowerCase() }
        })

        revalidatePath("/");

        return genre;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error(`Genre "${name}" already exists`)
        }
        throw error;
    }
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

    const deletedGenre = await db.genre.delete({ where: { id } })

    revalidatePath("/");

    return deletedGenre;
}

