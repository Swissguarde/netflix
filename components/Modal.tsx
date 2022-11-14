import MuiModal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/modalSlice";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Element, Genre, Movie } from "../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaPlus } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { selectMovie } from "../redux/movieSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const movieState = useSelector(selectMovie);
  const { movie } = movieState;
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  const truncateString = (str: string | undefined, num: number) => {
    if (str !== undefined) {
      if (str?.length > num) {
        return str?.slice(0, num) + "...";
      } else {
        return str;
      }
    }
  };

  useEffect(() => {
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);
  const handleClose = () => {
    dispatch(toggleModal());
  };
  return (
    <MuiModal
      open
      onClose={handleClose}
      className="fixed !top-10 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <AiOutlineClose size={26} />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-4 text-xl font-bold text-black transition hover:bg-[#e6e6e6] md:px-8">
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
              </button>

              <button className="modalButton">
                <FaPlus />
              </button>
              <button className="modalButton">
                <FiThumbsUp className="h-6 w-6" />
              </button>
            </div>

            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <BsFillMicFill className="h-6 w-6" />
              ) : (
                <BsFillMicMuteFill className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-full sm:w-5/6">
                {truncateString(movie?.overview, 300)}
              </p>
              <div className="flex flex-col space-y-3 text-sm">
                <span className="text-[gray]">Genres: </span>
                {genres.map((genre) => genre.name).join(", ")}
              </div>

              <div>
                <span className="text-[gray]">Language: </span>
                {movie?.original_language}
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};
export default Modal;
