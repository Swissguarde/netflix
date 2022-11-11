import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
interface Props {
  netflixOriginals: Movie[];
}
const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);
  const truncateString = (str: string | undefined, num: number) => {
    if (str !== undefined) {
      if (str?.length > num) {
        return str?.slice(0, num) + "...";
      } else {
        return str;
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        {/* <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="movie_poster"
          className="object-cover"
          width={100}
        /> */}
        <img
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="movie_poster"
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {truncateString(movie?.overview, 200)}
      </p>
      <div className="flex space-x-3">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>

        <button className="bannerBtn bg-[gray]/70">
          <HiInformationCircle className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
      </div>
    </div>
  );
};
export default Banner;
