import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type QuickActionsCardProps = React.HTMLAttributes<HTMLDivElement>

export function QuickActionsCard({ className, ...props }: QuickActionsCardProps) {
    return (
        <Card className={cn("", className)} {...props}>
            <CardHeader className="">
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Quick Actions
                </CardTitle>
                <CardDescription>Common author tasks</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <Link href="/dashboard/novels/new">
                        <Button variant="outline" className="justify-start w-full">
                            <PenLine className="mr-2 h-4 w-4" />
                            Create New Novel
                        </Button>
                    </Link>
                    <Link href="/dashboard/chapters/new">
                        <Button variant="outline" className="justify-start w-full">
                            <PenLine className="mr-2 h-4 w-4" />
                            Create New Chapter
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
