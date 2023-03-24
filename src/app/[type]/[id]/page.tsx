import MainDetail from "@/app/components/MainDetail/MainDetail";
import Reviews from "@/app/components/Review/Reviews";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { Metadata } from "next";

type Props = {
  params: {
    type: string;
    id: number;
  };
};

export async function generateMetadata({ params: { id, type } }: Props): Promise<Metadata> {
  const service = new VideoService(new VideoAPIService());
  const video = await service.getVideoDetails(id, type);
  const keywords = await service.getVideoKeywords(id, type);

  return {
    title: "IMDB | " + video.title || video.name,
    description: video.overview,
    openGraph: {
      images: [
        {
          url: `https://image.tmdb.org/t/p/original/${video.backdrop_path || video.poster_path}`,
          alt: video.title || video.name,
        },
      ],
    },
    keywords: keywords.map((item) => item.name),
  };
}

// const API_KEY = process.env.API_KEY;

// const getMovie = async (movieId: number): Promise<MovieDetail> => {
//   const res = await fetch(
//     `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
//   );

//   return await res.json();
// };

export default async function MoviePage({ params: { id, type } }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col p-4 md:pt-8">
        <MainDetail type={type} id={id} />
        <Reviews id={id} type={type} />
      </div>
    </div>
  );
}
