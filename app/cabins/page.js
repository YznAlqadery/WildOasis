import CabinList from "./CabinList";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: "Luxury Cabins",
  description:
    "Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine waking up to beautiful mountain views, spending your days exploring the dark forests around, or just relaxing in your private hot tub under the stars. Enjoy nature's beauty in your own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to paradise.",
};

//Setting the page to dynamically revalidate every hour and not statically generate
//We no longer need the revalidate because we are using searchParams which is a dynamic route
//export const revalidate = 3600;

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Suspense is used to show a loading spinner while the data is being fetched */
      /* The key prop is used to force the component to re-render when the filter changes */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
