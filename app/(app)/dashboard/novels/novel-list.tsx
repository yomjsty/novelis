"use client"

import { getAuthorNovels } from "@/actions/novel"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function NovelList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["novels"],
        queryFn: getAuthorNovels,
    })

    if (isLoading) return (
        <div>
            <div className="py-4">
                <div className="relative flex-1">
                    <Skeleton className="h-9 w-full" />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-5">
                                <Skeleton className="h-4 w-[100px]" />
                            </TableHead>
                            <TableHead className="p-5">
                                <Skeleton className="h-4 w-[100px]" />
                            </TableHead>
                            <TableHead className="p-5">
                                <Skeleton className="h-4 w-[100px]" />
                            </TableHead>
                            <TableHead className="p-5">
                                <Skeleton className="h-4 w-[100px]" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="px-5 py-4">
                                    <Skeleton className="h-4 w-[200px]" />
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Skeleton className="h-4 w-[100px]" />
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Skeleton className="h-4 w-[100px]" />
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Skeleton className="h-4 w-[50px]" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

    if (isError) return <div>Failed to load novels.</div>

    if (!data || data.length === 0) {
        return null
    }

    return (
        <DataTable columns={columns} data={data} />
    )
}
