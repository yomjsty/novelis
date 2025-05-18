"use client"

import { useId, useState, useEffect } from "react"
import { Tag, TagInput } from "emblor"

type TagsInputProps = {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
}

export default function TagsInput({ tags, setTags }: TagsInputProps) {
  const id = useId()
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const [internalTags, setInternalTags] = useState(tags)

  useEffect(() => {
    setInternalTags(tags)
  }, [tags])

  return (
    <TagInput
      id={id}
      tags={internalTags}
      setTags={(newTags) => {
        setInternalTags(newTags)
        setTags(Array.isArray(newTags) ? newTags : [])
      }}
      placeholder="Add a tag"
      styleClasses={{
        tagList: {
          container: "gap-1",
        },
        input:
          "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        tag: {
          body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
          closeButton:
            "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
        },
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      inlineTags={false}
      inputFieldPosition="top"
    />
  )
}
