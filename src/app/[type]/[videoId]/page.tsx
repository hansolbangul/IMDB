import Card from "@/app/components/Card/Card";
import MainDetail from "@/app/components/MainDetail/MainDetail";
import Result from "@/app/components/Result";
import Reviews from "@/app/components/Review/Reviews";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { Metadata } from "next";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  params: {
    type: string;
    videoId: number;
  };
};

export async function generateMetadata({
  params: { videoId, type },
}: Props): Promise<Metadata> {
  const service = new VideoService(new VideoAPIService());
  const video = await service.getVideoDetails(videoId, type);
  const keywords = await service.getVideoKeywords(videoId, type);

  return {
    title: "IMDB | " + video.title || video.name,
    description: video.overview,
    openGraph: {
      images: [
        {
          url: `https://image.tmdb.org/t/p/original/${
            video.backdrop_path || video.poster_path
          }`,
          alt: video.title || video.name,
        },
      ],
    },
    keywords: keywords.map((item) => item.name),
  };
}

export default async function MoviePage({ params: { videoId, type } }: Props) {
  const service = new VideoService(new VideoAPIService());
  const { video, videoImages, videoKeyword, videoReview, similarVideos } =
    await service.getVideoDetailsView(videoId, type);

  return (
    <div className="w-full">
      <div className="flex flex-col p-4 md:pt-8">
        {videoImages.backdrops.length > 0 && (
          <div
            className={"overflow-x-scroll flex space-x-3 " + styles.scrollhide}
          >
            {videoImages.backdrops.map((v) => (
              <div className="w-80" style={{ minWidth: "20rem" }}>
                <Image
                  // className="sm:rounded-t-lg hover:opacity-80 transition-opacity duration-200"
                  placeholder="blur"
                  blurDataURL="/spinner.svg"
                  alt="image in not available"
                  src={`https://image.tmdb.org/t/p/original/${v.file_path}`}
                  width={500}
                  height={300}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                ></Image>
              </div>
            ))}
          </div>
        )}
        <MainDetail video={video} />
        {videoReview.length > 0 && <Reviews reviews={videoReview} />}
        {similarVideos.length > 0 && (
          <div className={"overflow-x-scroll flex " + styles.scrollhide}>
            {similarVideos.map(
              (v) =>
                v.backdrop_path && (
                  <div className="w-80" style={{ minWidth: "20rem" }}>
                    <Card type={type} result={v} />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
