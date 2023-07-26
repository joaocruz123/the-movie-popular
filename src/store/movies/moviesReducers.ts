import { actionTypes } from ".";

type initialState = {
  movies: Array<any>;
};

const initialState: initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action: any) => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_ALL_MOVIES: {
      newState = {
        ...state,
        movies: action.payload,
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
