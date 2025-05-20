import FetchData from "@/components/public/fetching/fetch-featured-novels";
import { LatestUpdates } from "@/components/public/homepage/latest-updates";
import { Suspense } from "react";
// import { NewArrivals } from "@/components/public/homepage/new-arrivals";

export default async function Homepage() {
  return (
    <>
      <div className="container mx-auto">
        Featured Novel
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FetchData />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LatestUpdates />
      </Suspense>
      {/* <NewArrivals /> */}
    </>
  );
}
