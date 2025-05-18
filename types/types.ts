export interface CreateNovel {
    title: string;
    slug: string;
    synopsis: string;
    genres: string[];
    tags: string[];
    featuredImage: string | null;
}
