import { Movie } from "@/types/movie";
import Result from "./components/Result";
import { BASE_URL } from "@/utils/url";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { Video } from "@/application/domain/video";

export const metadata = {
  title: "IMDB Clone",
  description: "The IMDB Clone coding",
};

type Props = {
  searchParams: {
    genre: string;
    type: string;
  };
};

export const dynamic = "force-dynamic";

// const getFetch = async ({ searchParams }: Props): Promise<Movie[]> => {
//   const genre = searchParams.genre || "fetchTrending";
//   const res = await fetch(
//     `${BASE_URL}${
//       genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
//     }?api_key=${API_KEY}&language=ko-KR&page=1`,
//     {
//       next: { revalidate: 10000 },
//     }
//   );

//   const data = await res.json();

//   return data.results;
// };

const getFetch = async ({ searchParams }: Props): Promise<Video[]> => {
  const service = new VideoService(new VideoAPIService());
  const type = searchParams.type || "movie";
  const genre = searchParams.genre || "fetchTrending";
  const fetchType = genre === "fetchTopRated" ? `${type}/top_rated` : `trending/${type}/week`;
  const data = await service.getVideos({ fetchType, page: 1 });
  return data;
};

export default async function Home({ searchParams }: Props) {
  const results = await getFetch({ searchParams });

  return (
    <div>
      <Result type={searchParams.type || "movie"} results={results} />
    </div>
  );
}
