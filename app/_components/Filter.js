"use client";

import Button from "./Button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilterClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filter="all"
      >
        All cabins
      </Button>

      <Button
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filter="small"
      >
        1&mdash;3 guests
      </Button>

      <Button
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filter="medium"
      >
        4&mdash;7 guests
      </Button>

      <Button
        onClick={handleFilterClick}
        activeFilter={activeFilter}
        filter="large"
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
