import { VideoAPIService } from "@/networks/videoAPIService";
import { getVideoReq } from "@/types/req";
import { SimilarVideo, Video, VideoDetail, VideoImages, VideoKeyword, VideoReview } from "../domain/video";

export class VideoService {
  constructor(private readonly videoAPIService: VideoAPIService) {}

  async getVideos({ fetchType = "trending/all/week", page = 1 }: getVideoReq): Promise<Video[]> {
    return await this.videoAPIService.getVideos({ fetchType, page });
  }

  async searchVideos(query: string, type: string): Promise<Video[]> {
    return await this.videoAPIService.searchVideos(query, type);
  }

  async getVideoDetailsView(videoId: number, type: string): Promise<VideoDetail> {
    const [video, videoReview, videoImages, videoKeyword, similarVideos] = await Promise.all([
      this.videoAPIService.getVideoDetails(videoId, type),
      this.videoAPIService.getVideoReviews(videoId, type),
      this.videoAPIService.getVideoImages(videoId, type),
      this.videoAPIService.getVideoKeywords(videoId, type),
      this.videoAPIService.getSimilarVideos(videoId, type),
    ]);

    const videoDetail = {
      video,
      videoReview,
      videoImages,
      videoKeyword,
      similarVideos,
    };

    return videoDetail;
  }

  async getVideoDetails(videoId: number, type: string): Promise<Video> {
    return await this.videoAPIService.getVideoDetails(videoId, type);
  }

  async getVideoReviews(videoId: number, type: string): Promise<VideoReview[]> {
    return await this.videoAPIService.getVideoReviews(videoId, type);
  }

  async getVideoImages(videoId: number, type: string): Promise<VideoImages> {
    return await this.videoAPIService.getVideoImages(videoId, type);
  }

  async getVideoKeywords(videoId: number, type: string): Promise<VideoKeyword[]> {
    return await this.videoAPIService.getVideoKeywords(videoId, type);
  }

  async getSimilarVideo(videoId: number, type: string): Promise<SimilarVideo[]> {
    return await this.videoAPIService.getSimilarVideos(videoId, type);
  }
}
