"use client";

import Link from "next/link";
import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/types/utils";

type Props = {
  title: string;
  param: string;
};

export default function NavbarItem({ title, param }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const genre = searchParams.get("genre") || "fetchTrending";

  const navQuery = () => {
    router.push(pathName + "?" + createQueryString("genre", param, searchParams));
  };

  return (
    <div>
      <div
        className={`m-4 hover:text-amber-600 font-semibold p-2 ${
          genre && genre === param && "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"
        }`}
        onClick={navQuery}
      >
        {title}
      </div>
    </div>
  );
}
