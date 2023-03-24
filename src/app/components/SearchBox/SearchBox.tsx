"use client";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createQueryString } from "@/types/utils";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [videoType, setVideoType] = useState("movie");

  useEffect(() => {
    const params = searchParams.get("type") || "movie";
    setVideoType(params);
    setSearch("");
  }, [searchParams]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setVideoType(event.target.value);

    router.push(pathName + "?" + createQueryString("type", event.target.value, searchParams));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/search/${search}` + "?" + createQueryString("type", videoType, searchParams));
  };

  return (
    <div className="flex max-w-6xl mx-auto items-center px-5 space-x-2">
      <form onSubmit={handleSubmit} className="flex justify-between items-center flex-1">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search keywords..."
          className="w-full h-14 rounded-sm placeholder-gray-500 outline-none border-none bg-transparent flex-1"
        />
        <button disabled={!search} type="submit" className="text-amber-600 disabled:text-gray-400">
          Search
        </button>
      </form>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">{videoType}</InputLabel>
        <Select labelId="demo-select-small" id="demo-select-small" value={videoType} label="All" onChange={handleChange}>
          <MenuItem value={"movie"}>Movies</MenuItem>
          <MenuItem value={"tv"}>Tv</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
