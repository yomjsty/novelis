import { PublishedNovelsCard } from "../(app)/dashboard/published-novels-card";
import FeaturedNovels from "./featured-novels";
export default async function Homepage() {
  return (
    <>
      <div className="container mx-auto">
        Featured Novel
      </div>
      <FeaturedNovels />
      <PublishedNovelsCard />
    </>
  );
}
