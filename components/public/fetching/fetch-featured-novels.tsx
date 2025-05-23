import FeaturedNovels from "../homepage/featured-novels";
import { getFeaturedNovels } from "@/actions/novel";

export default async function FetchData() {
    const featuredNovels = await getFeaturedNovels();
    return (
        <>
            <FeaturedNovels featuredNovels={featuredNovels} />
        </>
    );
}
