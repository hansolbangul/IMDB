import { Video } from "@/application/domain/video";
import { Movie } from "@/types/movie";
import React from "react";
import Card from "./Card/Card";

type Props = {
  results: Video[];
  type: string;
};

export default function Result({ results, type }: Props) {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4">
      {results.map((result) => (
        <Card type={type} key={result.id} result={result} />
      ))}
    </div>
  );
}
