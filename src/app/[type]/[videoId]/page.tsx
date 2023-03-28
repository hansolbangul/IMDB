import MainDetail from "@/app/components/MainDetail/MainDetail";
import Reviews from "@/app/components/Review/Reviews";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { Metadata } from "next";

type Props = {
  params: {
    type: string;
    videoId: number;
  };
};

export async function generateMetadata({ params: { videoId, type } }: Props): Promise<Metadata> {
  const service = new VideoService(new VideoAPIService());
  const video = await service.getVideoDetails(videoId, type);
  const keywords = await service.getVideoKeywords(videoId, type);

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

export default async function MoviePage({ params: { videoId, type } }: Props) {
  const service = new VideoService(new VideoAPIService());
  const {video, videoImages, videoKeyword, videoReview, similarVideos} = await service.getVideoDetailsView(videoId, type)
  
  
  return (
    <div className="w-full">
      <div className="flex flex-col p-4 md:pt-8">
        <MainDetail video={video} />
        <Reviews type={type} id={videoId} />
      </div>
    </div>
  );
}
