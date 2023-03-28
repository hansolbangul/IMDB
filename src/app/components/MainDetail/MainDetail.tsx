import { Video } from "@/application/domain/video";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import Image from "next/image";
import React, { use } from "react";

type Props = {
  video: Video
};

export default function MainDetail({ video }: Props) {

  return (
    <div className="flex flex-col md:flex-row items-center content-center md:space-x-6">
      <Image
        className=" rounded-lg"
        placeholder="blur"
        blurDataURL="/spinner.svg"
        alt="Movie poster"
        src={`https://image.tmdb.org/t/p/original/${video.backdrop_path || video.poster_path}`}
        width={500}
        height={300}
        style={{
          maxWidth: "100%",
          height: "100%",
        }}
      ></Image>
      <div className="p-2">
        <h2 className="text-lg mb-3 font-bold">{video.title || video.name}</h2>
        <p className="text-lg mb-3">
          <span className="font-semibold mr-1">Overview: </span>
          {video.overview}
        </p>
        <p className="mb-3">
          <span className="font-semibold mr-1">Date Release: </span>
          {video.release_date || video.first_air_date}
        </p>
        <p className="mb-3">
          <span className="font-semibold mr-1">Rating: </span>
          {video.vote_count}
        </p>
      </div>
    </div>
  );
}
