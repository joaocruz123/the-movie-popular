import axios from "axios";
import { Dispatch } from "redux";
import { actionTypes } from ".";
import { Genres } from "@/domain/genres";

export const getAllGenres = () => async (dispatch: Dispatch) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}genre/movie/list`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_KEY}`,
      },
    });
    const result: Array<Genres> = response.data.genres;
    if (response.data.genres && response.data.results.genres > 0) {
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
