"use client"

import { useEffect, useId, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getAuthorNovels } from "@/actions/novel"
import { Input } from "@/components/ui/input"

interface NovelOption {
  value: string
  label: string
  searchValue: string
}

interface NovelSelectProps {
  onChange: (novelId: string) => void
  defaultValue?: string
}

export default function NovelSelect({ onChange, defaultValue }: NovelSelectProps) {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(defaultValue || "")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<NovelOption[]>([])

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const data = await getAuthorNovels()
        const opts = data.map(novel => ({
          value: novel.id,
          label: novel.title,
          searchValue: novel.title.toLowerCase(),
        }))
        setOptions(opts)
      } catch (err) {
        console.error("Failed to fetch novels", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNovels()
  }, [])

  if (loading) {
    return <Input
      placeholder="Loading novels..."
      className="py-[18px] placeholder:text-muted-foreground/70"
    />
  }

  if (error) {
    return <p>Error loading novels</p>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? options.find((novel) => novel.value === value)?.label
              : "Select novel"}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search novels..." />
          <CommandList>
            <CommandEmpty>No novels found.</CommandEmpty>
            <CommandGroup>
              {options.map((novel) => (
                <CommandItem
                  key={novel.value}
                  value={novel.searchValue}
                  onSelect={(currentValue) => {
                    const selectedNovel = options.find(n => n.searchValue === currentValue)
                    if (selectedNovel) {
                      setValue(selectedNovel.value)
                      onChange(selectedNovel.value)
                    }
                    setOpen(false)
                  }}
                >
                  {novel.label}
                  {value === novel.value && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
