import { getCurrentUser } from "@/lib/get-current-user";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { notFound } from "next/navigation";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    if (!user) return notFound();

    return (
        <div className="flex flex-col mx-auto">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
