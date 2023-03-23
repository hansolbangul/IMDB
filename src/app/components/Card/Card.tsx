import { Movie } from "@/types/movie";
import { FiThumbsUp } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Video } from "@/application/domain/video";

type Props = {
  result: Video;
};

export default function Card({ result }: Props) {
  return (
    <div className="cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:bolder-slate-400 sm:m-2 transition-shadow duration-200">
      <Link href={`/movie/${result.id}`}>
        <Image
          className="sm:rounded-t-lg hover:opacity-80 transition-opacity duration-200"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="image in not available"
          src={`https://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`}
          width={500}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        ></Image>
        <div className="p-2">
          <p className="line-clamp-2 text-md">{result.overview}</p>
          <h2 className="truncate text-lg font-bold">{result.title || result.name}</h2>
          <p className="flex items-center">
            {result.release_date || result.first_air_date}
            <FiThumbsUp className="h-5 mr-1 ml-3" />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
}
