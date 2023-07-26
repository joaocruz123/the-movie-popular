import { Genres } from "@/domain/genres";
import { actionTypes } from ".";

type initialState = {
  genres: Array<Genres>;
  favorites: Array<any>;
};

const initialState: initialState = {
  genres: [],
  favorites: [],
};

const genresReducers = (state: initialState = initialState, action: any) => {
  let newState: initialState = state;
  switch (action.type) {
    case actionTypes.SET_ALL_GENRES: {
      newState = {
        ...state,
        genres: action.payload,
      };
      break;
    }
    case actionTypes.SET_FAVORITES: {
      newState = {
        ...state,
        favorites: action.payload,
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

export default genresReducers;
