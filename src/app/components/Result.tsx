import { Movie } from "@/types/movie";
import React from "react";

type Props = {
  result: Movie[];
};

export default function Result({ result }: Props) {
  return (
    <div>
      {result.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}
