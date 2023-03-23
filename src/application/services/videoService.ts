import { VideoAPIService } from "@/networks/videoAPIService";
import { getVideoReq } from "@/types/req";
import {
  SimilarVideo,
  Video,
  VideoDetail,
  VideoImages,
  VideoKeyword,
  VideoReview,
} from "../domain/video";

export class VideoService {
  constructor(private readonly videoAPIService: VideoAPIService) {}

  async getVideos({
    fetchType = "trending/all/week",
    page = 1,
  }: getVideoReq): Promise<Video[]> {
    return await this.videoAPIService.getVideos({ fetchType, page });
  }

  async searchVideos(query: string): Promise<Video[]> {
    return await this.videoAPIService.searchVideos(query);
  }

  // async getVideoDetails(videoId: number): Promise<VideoDetail> {
  //   const [video, videoReview, videoImages, videoKeyword, similarVideos] = await Promise.all([
  //     this.videoAPIService.getVideoDetails(videoId),
  //     this.videoAPIService.getVideoReviews(videoId),
  //     this.videoAPIService.getVideoImages(videoId),
  //     this.videoAPIService.getVideoKeywords(videoId),
  //     this.videoAPIService.getSimilarVideos(videoId),
  //   ]);

  //   const videoDetail = {
  //     ...video,
  //     videoReview,
  //     videoImages,
  //     videoKeyword,
  //     similarVideos,
  //   };

  //   return videoDetail;
  // }

  async getVideoDetails(videoId: number): Promise<Video> {
    return await this.videoAPIService.getVideoDetails(videoId);
  }

  async getVideoReviews(videoId: number): Promise<VideoReview[]> {
    return await this.videoAPIService.getVideoReviews(videoId);
  }

  async getVideoImages(videoId: number): Promise<VideoImages> {
    return await this.videoAPIService.getVideoImages(videoId);
  }

  async getVideoKeywords(videoId: number): Promise<VideoKeyword[]> {
    return await this.videoAPIService.getVideoKeywords(videoId);
  }

  async getSimilarVideo(videoId: number): Promise<SimilarVideo[]> {
    return await this.videoAPIService.getSimilarVideos(videoId);
  }
}
