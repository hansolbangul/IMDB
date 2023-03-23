import { VideoReview } from "@/application/domain/video";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { IMG_BASE_URL } from "@/utils/url";
import Image from "next/image";
import React, { use } from "react";

type Props = { videoId: number };

const getReviews = async (videoId: number): Promise<VideoReview[]> => {
  const service = new VideoService(new VideoAPIService());
  const res = await service.getVideoReviews(videoId);
  return res;
};

export default function Reviews({ videoId }: Props) {
  const reviews = use(getReviews(videoId));
  console.log(reviews);
  return (
    <div>
      {reviews.map((review) => (
        <>
          <div className="flex items-center">
            {review.author_details.avatar_path}
            <Image
              className="rounded-full"
              width={50}
              height={50}
              alt="profile"
              placeholder="blur"
              blurDataURL="/spinner.svg"
              src={
                review.author_details?.avatar_path
                  ? review.author_details.avatar_path?.includes("https")
                    ? review.author_details.avatar_path.substring(1)
                    : IMG_BASE_URL + review.author_details.avatar_path
                  : "/default-img.png"
              }
            />
            <>
              <span>
                {review.author_details?.username || review.author_details?.name}
              </span>
            </>
          </div>
        </>
      ))}
    </div>
  );
}
