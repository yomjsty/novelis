import type React from "react"
import { cn } from "@/lib/utils"

interface HeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
    className?: string
}

export function Header({ heading, text, children, className }: HeaderProps) {
    return (
        <div className={cn("flex flex-col gap-2 pb-5", className)}>
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="grid gap-1">
                    <h1 className="font-heading text-3xl font-bold md:text-4xl">{heading}</h1>
                    {text && <p className="text-muted-foreground">{text}</p>}
                </div>
                {children}
            </div>
        </div>
    )
}
