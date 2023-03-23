import Result from "@/app/components/Result";
import { Video } from "@/application/domain/video";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import React from "react";

type Props = {
  params: {
    searchTerm: string;
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


const getSearchMovie = async ({ params }: Props): Promise<Video[]> => {
  const service = new VideoService(new VideoAPIService());
  const video = await service.searchVideos(params.searchTerm)
  return video
};

export default async function SearchPage({ params }: Props) {
  const movies = await getSearchMovie({ params });

  return (
    <div>
      {movies && movies.length === 0 && (
        <h1 className="text-center pt-6">No results found</h1>
      )}
      {movies && <Result results={movies} />}
    </div>
  );
}
