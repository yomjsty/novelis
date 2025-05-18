import { getCurrentUser } from "@/lib/get-current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async () => {
    const user = await getCurrentUser();
    if (!user) throw new UploadThingError("Unauthorized");
    if (user.role !== "admin" && user.role !== "author")
        throw new UploadThingError("Unauthorized");
    return { userId: user.id };
}

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(auth)
        .onUploadComplete(() => {
            return { message: "Upload complete" };
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
