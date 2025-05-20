import { Suspense } from "react";
import FetchData from "./fetch-data";

export default async function Homepage() {
  return (
    <>
      <div className="container mx-auto">
        Featured Novel
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FetchData />
      </Suspense>
    </>
  );
}
