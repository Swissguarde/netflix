import { DocumentData } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleClick = (direction: string) => {
    setIsScroll(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#E5E5E5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <HiChevronLeft
          className={`${!isScroll && "hidden"} rowIcon`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <HiChevronRight
          className="rowIconB"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};
export default Row;
