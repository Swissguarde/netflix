import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { Movie } from "../typings";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface MovieState {
  movie: Movie | DocumentData | null;
}

const initialState: MovieState = {
  movie: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    storeMovie: (state, action: PayloadAction<Movie | DocumentData | null>) => {
      state.movie = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { storeMovie } = movieSlice.actions;
export const selectMovie = (state: RootState) => state.movie;
