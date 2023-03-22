import { Movie } from "@/types/movie";
import Result from "./components/Result";
import { BASE_URL } from "@/utils/url";

export const metadata = {
  title: "IMDB Clone",
  description: "The IMDB Clone coding",
};

type Props = {
  searchParams: any;
};

const API_KEY = process.env.API_KEY;

const getFetch = async ({ searchParams }: Props): Promise<Movie[]> => {
  const genre = searchParams.genre || "fetchTrending";
  const res = await fetch(
    `${BASE_URL}${
      genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
    }?api_key=${API_KEY}&language=ko-KR&page=1`,
    {
      next: { revalidate: 10000 },
    }
  );

  const data = await res.json();

  return data.results;
};

export default async function Home({ searchParams }: Props) {
  const results = await getFetch({ searchParams });

  return (
    <div>
      <Result results={results} />
    </div>
  );
}
