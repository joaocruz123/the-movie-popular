import axios from "axios";
import { Dispatch } from "redux";
import { actionTypes } from ".";
import { Movies, mapMoviesAllData } from "@/domain/movies";

export const getAllMovies = () => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}movie/popular`;
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
      dispatch(setAllMovies(result));
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.warn(e);
  }
};

export const setAllMovies = (allMovies: any) => ({
  type: actionTypes.SET_ALL_MOVIES,
  payload: allMovies,
});
