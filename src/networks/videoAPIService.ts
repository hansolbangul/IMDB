import { Video, VideoReview, VideoKeyword, SimilarVideo, VideoImages } from "@/application/domain/video";
import { getVideoReq } from "@/types/req";

export class VideoAPIService {
  private readonly API_BASE_URL = "https://api.themoviedb.org/3/";
  private readonly API_KEY = process.env.API_KEY;

  async getVideos({ fetchType, page }: getVideoReq): Promise<Video[]> {
    const response = await fetch(`${this.API_BASE_URL}${fetchType}?api_key=${this.API_KEY}&language=ko-KR&page=${page}`, { next: { revalidate: 10000 } });
    const data = await response.json();
    const videosData = data.results;
    return videosData.map((videoData: any) => new Video(videoData));
  }

  async searchVideos(query: string): Promise<Video[]> {
    const response = await fetch(`${this.API_BASE_URL}search/movie?api_key=${this.API_KEY}&query=${query}&language=ko-KR&page=1&include_adult=false`);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    const videosData = data.results;

    return videosData.map((videoData: any) => new Video(videoData));
  }

  async getVideoDetails(videoId: number): Promise<Video> {
    const response = await fetch(`${this.API_BASE_URL}/movie/${videoId}?api_key=${this.API_KEY}&language=ko-KR`);
    const videosData = await response.json();
    return new Video(videosData);
  }

  async getVideoReviews(videoId: number): Promise<VideoReview[]> {
    const response = await fetch(`${this.API_BASE_URL}movie/${videoId}/reviews?api_key=${this.API_KEY}`);
    const data = await response.json();
    const reviewsData = data.results;
    console.log("reviewsData", reviewsData);
    return reviewsData.map((reviewData: any) => new VideoReview(reviewData));
  }

  async getVideoImages(videoId: number): Promise<VideoImages> {
    const response = await fetch(`${this.API_BASE_URL}movie/${videoId}/images?api_key=${this.API_KEY}`);
    const videoImages = await response.json();
    return new VideoImages(videoImages);
  }

  async getVideoKeywords(videoId: number): Promise<VideoKeyword[]> {
    const response = await fetch(`${this.API_BASE_URL}movie/${videoId}/keywords?api_key=${this.API_KEY}`);
    const data = await response.json();
    const keywordsData = data.keywords;
    return keywordsData.map((keywordData: VideoKeyword) => new VideoKeyword(keywordData));
  }

  async getSimilarVideos(videoId: number): Promise<SimilarVideo[]> {
    const response = await fetch(`${this.API_BASE_URL}movie/${videoId}/similar?api_key=${this.API_KEY}`);
    const data = await response.json();
    const similarVideosData = data.results;
    return similarVideosData.map((similarVideoData: any) => new SimilarVideo(similarVideoData));
  }
}
