"use client";

import Link from "next/link";
import { BarChart3, Settings, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type User = {
    name: string;
    email: string;
    image?: string | null;
};

export default function Sidebar({ user }: { user: User }) {
    const pathname = usePathname();

    const SidebarContent = () => (
        <div className="flex flex-col h-full w-full">
            <div className="p-5 flex items-center gap-2">
                <div className="size-8 rounded-lg bg-black flex items-center justify-center">
                    <span className="text-white text-xs font-bold">LF</span>
                </div>
                <span className="font-bold text-lg">Novelis</span>
            </div>
            <Separator />
            <nav className="flex-1 overflow-auto px-4 py-4 space-y-1">
                <SidebarLink
                    href="/dashboard"
                    icon={<BarChart3 className="size-5" />}
                    label="Dashboard"
                    active={pathname === "/dashboard"}
                />
                <SidebarLink
                    href="/dashboard/novels"
                    icon={<BarChart3 className="size-5" />}
                    label="Novels"
                    active={pathname.startsWith("/dashboard/novels")}
                />
                <SidebarLink
                    href="/dashboard/genres"
                    icon={<BarChart3 className="size-5" />}
                    label="Genres"
                    active={pathname.startsWith("/dashboard/genres")}
                />
                <SidebarLink
                    href="/dashboard/chapters"
                    icon={<BarChart3 className="size-5" />}
                    label="Chapters"
                    active={pathname.startsWith("/dashboard/chapters")}
                />
                <SidebarLink
                    href="/settings"
                    icon={<Settings className="size-5" />}
                    label="Settings"
                    active={pathname === "/settings"}
                />
            </nav>
            <div className="p-4 flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback>
                        {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                        {user.email}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile sidebar */}
            <div className="md:hidden fixed top-[18px] left-4 z-50">
                <Sheet>
                    <SheetTrigger className="p-2 rounded-md">
                        <Menu className="size-4" />
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SheetTitle hidden></SheetTitle>
                        <SheetDescription hidden></SheetDescription>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden md:flex sticky top-0 h-screen border-r bg-white shadow-sm w-64">
                <SidebarContent />
            </aside>
        </>
    );
}

function SidebarLink({
    href,
    icon,
    label,
    active,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${active
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}
