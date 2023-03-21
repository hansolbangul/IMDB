export const metadata = {
  title: "IMDB Clone",
  description: "The IMDB Clone coding",
};

type Props = {
  searchParams: any;
};

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }: Props) {
  const genre = searchParams.genre || "fetchTrending";
  const res = await fetch(`${BASE_URL}${genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"}?api_key=${API_KEY}&language=ko-KR&page=1`, {
    next: { revalidate: 10000 },
  });

  const data = await res.json();

  const results = data.results;

  return <h1 className="text-red-400">Home</h1>;
}
