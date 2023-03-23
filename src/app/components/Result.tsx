import { Movie } from "@/types/movie";
import React from "react";
import Card from "./Card/Card";

type Props = {
  results: Movie[];
};

export default function Result({ results }: Props) {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-4">
      {results.map((result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  );
}
