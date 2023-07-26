import { actionTypes } from ".";

type initialState = {
  genres: Array<any>;
};

const initialState: initialState = {
  genres: [],
};

const genresReducers = (state = initialState, action: any) => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_ALL_GENRES: {
      newState = {
        ...state,
        genres: action.payload,
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
