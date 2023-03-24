import Result from "@/app/components/Result";
import { Video } from "@/application/domain/video";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    searchTerm: string;
  };
  searchParams: {
    type: string;
  };
};

// const getSearchMovie = async ({ params }: Props): Promise<Movie[]> => {
//   const res = await fetch(
//     `${BASE_URL}search/movie?api_key=${process.env.API_KEY}&query=${params.searchTerm}&language=ko-KR&page=1&include_adult=false`
//   );

//   if (!res.ok) {
//     throw new Error("Error fetching data");
//   }

//   const data = await res.json();

//   return data.results;
// };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const service = new VideoService(new VideoAPIService());
  const videos = await service.searchVideos(params.searchTerm, searchParams.type || "movie");
  return { title: "IMDB | " + params.searchTerm, description: videos.map((video) => video.title || video.name).join(", ") };
}

const getSearchMovie = async ({ params, searchParams }: Props): Promise<Video[]> => {
  const service = new VideoService(new VideoAPIService());
  const video = await service.searchVideos(params.searchTerm, searchParams.type || "movie");
  return video;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const movies = await getSearchMovie({ params, searchParams });

  return (
    <div>
      {movies && movies.length === 0 && <h1 className="text-center pt-6">No results found</h1>}
      {movies && <Result type={searchParams.type} results={movies} />}
    </div>
  );
}
