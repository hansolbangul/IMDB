import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import Image from "next/image";
import React, { use } from "react";

type Props = {
  id: number;
  type: string;
};

export default function MainDetail({ id, type }: Props) {
  const service = new VideoService(new VideoAPIService());
  const movie = use(service.getVideoDetails(id, type));

  return (
    <div className="flex flex-col md:flex-row items-center content-center md:space-x-6">
      <Image
        className=" rounded-lg"
        placeholder="blur"
        blurDataURL="/spinner.svg"
        alt="Movie poster"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
        width={500}
        height={300}
        style={{
          maxWidth: "100%",
          height: "100%",
        }}
      ></Image>
      <div className="p-2">
        <h2 className="text-lg mb-3 font-bold">{movie.title || movie.name}</h2>
        <p className="text-lg mb-3">
          <span className="font-semibold mr-1">Overview: </span>
          {movie.overview}
        </p>
        <p className="mb-3">
          <span className="font-semibold mr-1">Date Release: </span>
          {movie.release_date || movie.first_air_date}
        </p>
        <p className="mb-3">
          <span className="font-semibold mr-1">Rating: </span>
          {movie.vote_count}
        </p>
      </div>
    </div>
  );
}
