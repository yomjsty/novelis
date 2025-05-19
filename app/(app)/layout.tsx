import { getCurrentUser } from "@/lib/get-current-user";
import { notFound } from "next/navigation";
import Sidebar from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "@/components/logout-button";
import { Suspense } from "react";
import Coins from "@/components/coins";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    if (!user) return notFound();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar user={user} />
            <div className="flex-1">
                <header className="bg-white border-b sticky top-0 z-10">
                    <div className="flex items-center justify-between p-4 pl-[60px] md:pl-0">
                        <div className="md:hidden flex items-center gap-2 font-bold text-xl">
                            <div className="size-8 rounded-lg bg-black flex items-center justify-center">
                                <span className="text-white text-xs">N</span>
                            </div>
                            <span>Novelis</span>
                        </div>

                        <div className="flex w-full justify-end items-center gap-3">
                            <Avatar className="md:hidden">
                                <AvatarImage src={user.image || ""} />
                                <AvatarFallback>
                                    {user.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <Suspense fallback={<div>Coins: </div>}>
                                <Coins />
                            </Suspense>
                            <LogoutButton />
                        </div>
                    </div>
                </header>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
