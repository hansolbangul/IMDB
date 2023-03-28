export class Video {
  id: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_count: string;

  constructor({ id, title, name, poster_path, backdrop_path, release_date, first_air_date, overview, vote_count }: Video) {
    this.id = id;
    this.title = title;
    this.name = name;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.first_air_date = first_air_date;
    this.backdrop_path = backdrop_path;
    this.overview = overview;
    this.vote_count = vote_count;
  }
}

type Images = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type VideoDetailType = {
  video: Video;
  videoReview: VideoReview[];
  similarVideos: SimilarVideo[];
  videoKeyword: VideoKeyword[];
  videoImages: VideoImages;
};

export class VideoDetail {
  video: Video;
  videoReview: VideoReview[];
  similarVideos: SimilarVideo[];
  videoKeyword: VideoKeyword[];
  videoImages: VideoImages;
  constructor({ video, videoReview, similarVideos, videoKeyword, videoImages }: VideoDetailType) {
    this.video = video;
    this.videoReview = videoReview;
    this.similarVideos = similarVideos;
    this.videoKeyword = videoKeyword;
    this.videoImages = videoImages;
  }
}

export class VideoReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: null | string;
    rating: number;
  };
  content: string;
  create_at: string;
  id: string;
  updated_at: Date;
  url: string;
  constructor({ author, author_details, content, create_at, id, updated_at, url }: VideoReview) {
    this.author = author;
    this.author_details = author_details;
    this.content = content;
    this.create_at = create_at;
    this.id = id;
    this.updated_at = updated_at;
    this.url = url;
  }
}

export class VideoKeyword {
  id: number;
  name: string;
  constructor({ id, name }: VideoKeyword) {
    this.id = id;
    this.name = name;
  }
}

export class VideoImages {
  backdrops: Images[];
  icons: Images[];
  posters: Images[];
  constructor({ backdrops, icons, posters }: VideoImages) {
    this.backdrops = backdrops;
    this.icons = icons;
    this.posters = posters;
  }
}

export class SimilarVideo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  constructor({
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  }: SimilarVideo) {
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.genre_ids = genre_ids;
    this.id = id;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.title = title;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }
}
