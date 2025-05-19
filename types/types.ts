export interface CreateNovel {
    title: string;
    slug: string;
    synopsis: string;
    genres: string[];
    tags: string[];
    featuredImage: string | null;
    status: string;
}

export interface CreateChapter {
    title: string;
    slug: string;
    content: string;
    novelId: string;
    isFree: boolean;
    price: number | null;
}
