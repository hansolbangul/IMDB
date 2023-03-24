import { VideoReview } from "@/application/domain/video";
import { VideoService } from "@/application/services/videoService";
import { VideoAPIService } from "@/networks/videoAPIService";
import { IMG_BASE_URL } from "@/utils/url";
import Image from "next/image";
import React, { use } from "react";

type Props = { id: number; type: string };

export default function Reviews({ id, type }: Props) {
  const service = new VideoService(new VideoAPIService());
  const reviews = use(service.getVideoReviews(id, type));

  return (
    <div className="p-2">
      <span className=" font-bold">{reviews.length} 개의 리뷰</span>
      {reviews.map((review) => (
        <div className=" py-3 my-2 border-y border-slate-400 space-y-2" key={review.id}>
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 flex justify-center items-center overflow-hidden rounded-full">
              <Image
                width={56}
                height={56}
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
            </div>
            <div>
              <p>{review.author_details?.username || review.author_details?.name}</p>
              <p className=" text-sm">{Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date(review.updated_at))}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: review.content }} />
        </div>
      ))}
    </div>
  );
}
