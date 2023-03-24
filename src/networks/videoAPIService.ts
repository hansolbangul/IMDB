import { Video, VideoReview, VideoKeyword, SimilarVideo, VideoImages } from "@/application/domain/video";
import { getVideoReq } from "@/types/req";

export class VideoAPIService {
  private readonly API_BASE_URL = "https://api.themoviedb.org/3/";
  private readonly API_KEY = process.env.API_KEY;

  async getVideos({ fetchType, page }: getVideoReq): Promise<Video[]> {
    const url = `${this.API_BASE_URL}${fetchType}?api_key=${this.API_KEY}&language=ko-KR&page=${page}`;
    console.log("fetchType", url);
    const response = await fetch(url);
    const data = await response.json();
    const videosData = data.results;
    return videosData.map((videoData: any) => new Video(videoData));
  }

  async searchVideos(query: string, type: string): Promise<Video[]> {
    const url = `${this.API_BASE_URL}search/${type}?api_key=${this.API_KEY}&query=${query}&language=ko-KR&page=1&include_adult=false`;
    console.log("searchVideos", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    const videosData = data.results;

    return videosData.map((videoData: any) => new Video(videoData));
  }

  async getVideoDetails(videoId: number, type: string): Promise<Video> {
    if (typeof videoId === "string") [];
    const url = `${this.API_BASE_URL}/${type}/${videoId}?api_key=${this.API_KEY}&language=ko-KR`;
    console.log("getVideoDetails", url);
    const response = await fetch(url);
    const videosData = await response.json();
    return new Video(videosData);
  }

  async getVideoReviews(videoId: number, type: string): Promise<VideoReview[]> {
    if (typeof videoId !== "number") [];
    const url = `${this.API_BASE_URL}${type}/${videoId}/reviews?api_key=${this.API_KEY}`;
    console.log("getVideoReviews", url);
    const response = await fetch(url);
    const data = await response.json();
    const reviewsData = data.results;
    return reviewsData.map((reviewData: any) => new VideoReview(reviewData));
  }

  async getVideoImages(videoId: number, type: string): Promise<VideoImages> {
    if (typeof videoId === "string") [];
    const url = `${this.API_BASE_URL}${type}/${videoId}/images?api_key=${this.API_KEY}`;
    console.log("getVideoImages", url);
    const response = await fetch(url);
    const videoImages = await response.json();
    return new VideoImages(videoImages);
  }

  async getVideoKeywords(videoId: number, type: string): Promise<VideoKeyword[]> {
    if (typeof videoId === "string") [];
    const url = `${this.API_BASE_URL}${type}/${videoId}/keywords?api_key=${this.API_KEY}`;
    console.log("getVideoKeywords", url);
    const response = await fetch(url);
    const data = await response.json();

    let keywordsData;
    if (type === "movie") {
      keywordsData = data.keywords;
    } else {
      keywordsData = data.results;
    }

    return keywordsData.map((keywordData: VideoKeyword) => new VideoKeyword(keywordData));
  }

  async getSimilarVideos(videoId: number, type: string): Promise<SimilarVideo[]> {
    if (typeof videoId === "string") [];
    const url = `${this.API_BASE_URL}${type}/${videoId}/similar?api_key=${this.API_KEY}`;
    console.log("getSimilarVideos", url);
    const response = await fetch(url);
    const data = await response.json();
    const similarVideosData = data.results;
    return similarVideosData.map((similarVideoData: any) => new SimilarVideo(similarVideoData));
  }
}
