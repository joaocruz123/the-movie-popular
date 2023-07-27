import { Movies } from "@/domain/movies";
import { actionTypes } from ".";

type initialState = {
  page: number;
  totalPages: number;
  movies: Array<Movies>;
  totalResults: number;
  selectedMovie: Object;
};

const initialState: initialState = {
  page: 1,
  totalPages: 1,
  totalResults: 1,
  movies: [],
  selectedMovie: {},
};

const moviesReducer = (state: initialState = initialState, action: any) => {
  let newState: initialState = state;
  switch (action.type) {
    case actionTypes.SET_ALL_MOVIES: {
      newState = {
        ...state,
        movies: action.payload,
      };
      break;
    }
    case actionTypes.SET_PAGINATION: {
      newState = {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
      };
      break;
    }
    case actionTypes.SET_MOVIE_ID: {
      newState = {
        ...state,
        selectedMovie: action.payload,
      };
      break;
    }
    default: {
      newState = state;
      break;
    }
  }

  return newState;
};

export default moviesReducer;
