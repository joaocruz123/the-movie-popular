import axios from "axios";
import { Dispatch } from "redux";
import { actionTypes } from ".";
import { Genres } from "@/domain/genres";
import { Movies, mapMoviesAllData } from "@/domain/movies";
import { setAllMovies, setPagination } from "../movies/moviesActions";

export const getAllGenres = () => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}genre/movie/list`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
      },
    });
    const result: Array<Genres> = response.data && response.data.genres;
    if (response.data.genres && response.data.genres.length > 0) {
      dispatch({
        type: actionTypes.GET_ALL_GENRES,
        payload: {},
      });
      dispatch(setAllGenres(result));
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.warn(e);
  }
};

export const setAllGenres = (allGenres: any) => ({
  type: actionTypes.SET_ALL_GENRES,
  payload: allGenres,
});

export const getGenreId =
  (ids: Array<any>, page: any) => async (dispatch: Dispatch) => {
    try {
      const url = `${
        process.env.NEXT_PUBLIC_API_URL
      }discover/movie?page=${page}&with_genres=${ids.join(",")}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
        },
      });
      const result: Array<Movies> = mapMoviesAllData(response.data.results);
      if (response.data.results && response.data.results.length > 0) {
        dispatch({
          type: actionTypes.GET_GENRE_ID,
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

export const setFavorites = (favorites: Array<any>) => ({
  type: actionTypes.SET_FAVORITES,
  payload: favorites,
});
