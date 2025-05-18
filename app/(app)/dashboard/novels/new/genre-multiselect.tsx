"use client"

import { getGenres } from "@/actions/genre"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { useQuery } from "@tanstack/react-query"

interface GenreMultiselectProps {
    genres: string[]
    setGenres: (val: string[]) => void
}

export default function GenreMultiselect({ genres, setGenres }: GenreMultiselectProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    })

    if (isLoading) return (<MultipleSelector placeholder="Loading genres..." />)
    if (isError) return <p>Error loading genres</p>

    const genreOptions: Option[] = data?.map(genre => ({
        value: genre.id,
        label: genre.name,
        searchValue: genre.name.toLowerCase(),
    })) || []

    const selectedOptions = genres.map(genreId => {
        const genre = data?.find(g => g.id === genreId)
        return {
            value: genreId,
            label: genre?.name || genreId,
            searchValue: genre?.name.toLowerCase() || genreId.toLowerCase(),
        }
    })

    return (
        <MultipleSelector
            commandProps={{
                label: "Select genres",
                filter: (value: string, search: string) => {
                    const option = genreOptions.find(opt => opt.value === value)
                    return option?.label.toLowerCase().includes(search.toLowerCase()) ? 1 : -1
                }
            }}
            defaultOptions={genreOptions}
            placeholder="Select genres"
            emptyIndicator={<p className="text-center text-sm">No results found</p>}
            value={selectedOptions}
            onChange={(options) => setGenres(options.map(o => o.value))}
        />
    )
}
