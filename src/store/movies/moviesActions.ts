import axios from "axios";
import { Dispatch } from "redux";
import { actionTypes } from ".";
import {
  Casts,
  Movie,
  Movies,
  Trailer,
  mapCastData,
  mapMovieDataId,
  mapMoviesAllData,
  mapTrailerData,
} from "@/domain/movies";

export const getAllMovies = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}movie/popular?page=${page}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
      },
    });
    const result: Array<Movies> = mapMoviesAllData(response.data.results);
    if (response.data.results && response.data.results.length > 0) {
      dispatch({
        type: actionTypes.GET_ALL_MOVIES,
        payload: {},
      });
      dispatch(
        setPagination({
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
        })
      );
      dispatch(setAllMovies(result));
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.warn(e);
  }
};

export const getMovieId = (id: String) => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}movie/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
      },
    });
    const result: Movie = mapMovieDataId(response.data);
    if (response.data) {
      dispatch({
        type: actionTypes.GET_MOVIE_ID,
        payload: {},
      });
      dispatch(setMovieId(result));
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.warn(e);
  }
};

export const getCreditsMovieId = (id: String) => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/credits`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
      },
    });
    const result: Array<Casts> = mapCastData(response.data.cast);
    if (response.data && response.data.cast) {
      dispatch({
        type: actionTypes.GET_MOVIE_CREDITS,
        payload: {},
      });
      dispatch(setCasts(result));
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.warn(e);
  }
};

export const getTrailerMovieId = (id: String) => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/videos`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
      },
    });
    const result: Trailer = mapTrailerData(response.data.results);
    if (response.data && response.data.results) {
      dispatch({
        type: actionTypes.GET_MOVIE_TRAILER,
        payload: {},
      });
      dispatch(setTrailer(result));
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.warn(e);
  }
};

export const setAllMovies = (allMovies: Array<Movies>) => ({
  type: actionTypes.SET_ALL_MOVIES,
  payload: allMovies,
});

export const setPagination = (data: any) => ({
  type: actionTypes.SET_PAGINATION,
  payload: data,
});

export const setMovieId = (movie: Movie) => ({
  type: actionTypes.SET_MOVIE_ID,
  payload: movie,
});

export const setCasts = (casts: Array<Casts>) => ({
  type: actionTypes.SET_MOVIE_CREDITS,
  payload: casts,
});

export const setTrailer = (trailer: Trailer) => ({
  type: actionTypes.SET_MOVIE_TRAILER,
  payload: trailer,
});
