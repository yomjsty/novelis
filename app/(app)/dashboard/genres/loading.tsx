import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-sm text-gray-500">Loading genres...</p>
        </div>
    )
}
