import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t py-6 md:py-0 bg-white dark:bg-gray-950 dark:border-gray-800">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24 px-4 md:px-6 mx-auto">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 rounded-lg p-1.5 dark:bg-blue-700">
                        <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm font-medium">Novelis © {new Date().getFullYear()}</p>
                </div>

                <nav className="flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4">
                        Terms
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4">
                        Privacy
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4">
                        Contact
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="#"
                        className="rounded-full bg-muted p-2 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </Link>
                    <Link
                        href="#"
                        className="rounded-full bg-muted p-2 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                    </Link>
                    <Link
                        href="#"
                        className="rounded-full bg-muted p-2 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
