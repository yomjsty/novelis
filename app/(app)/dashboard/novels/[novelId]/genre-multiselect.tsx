"use client"

import { useEffect, useState } from "react"
import { getGenres } from "@/actions/genre"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { Input } from "@/components/ui/input"

interface GenreMultiselectProps {
    genres: string[]
    setGenres: (val: string[]) => void
}

export default function GenreMultiselect({ genres, setGenres }: GenreMultiselectProps) {
    const [options, setOptions] = useState<Option[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres()
                const opts: Option[] = data.map(genre => ({
                    value: genre.id,
                    label: genre.name,
                    searchValue: genre.name.toLowerCase(),
                }))
                setOptions(opts)
            } catch (err) {
                console.error("Failed to fetch genres", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchGenres()
    }, [])

    if (loading) {
        return <Input
            placeholder="Loading genres..."
            className="py-[18px] placeholder:text-muted-foreground/70"
        />
    }

    if (error) {
        return <p>Error loading genres</p>
    }

    const selectedOptions = genres.map(genreId => {
        const genre = options.find(g => g.value === genreId)
        return {
            value: genreId,
            label: genre?.label || genreId,
            searchValue: genre?.searchValue || genreId.toLowerCase(),
        }
    })

    return (
        <MultipleSelector
            commandProps={{
                label: "Select genres",
                filter: (value: string, search: string) => {
                    const option = options.find(opt => opt.value === value)
                    return option?.label.toLowerCase().includes(search.toLowerCase()) ? 1 : -1
                }
            }}
            defaultOptions={options}
            placeholder="Select genres"
            emptyIndicator={<p className="text-center text-sm">No results found</p>}
            value={selectedOptions}
            onChange={(selected) => setGenres(selected.map(o => o.value))}
        />
    )
}
