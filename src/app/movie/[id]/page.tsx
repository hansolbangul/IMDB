import { MovieDetail } from "@/types/movie";
import { BASE_URL } from "@/utils/url";
import Image from "next/image";

type Props = {
  params: {
    id: number;
  };
};

const API_KEY = process.env.API_KEY;

const getMovie = async (movieId: number): Promise<MovieDetail> => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );

  return await res.json();
};

export default async function MoviePage({ params: { id } }: Props) {
  const movieId = id;
  const movie = await getMovie(movieId);

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          className=" rounded-lg"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview: </span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Release: </span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating: </span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
