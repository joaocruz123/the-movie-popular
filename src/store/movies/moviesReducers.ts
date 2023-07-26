import { actionTypes } from ".";
let movies: any = null;

if (typeof window !== "undefined") {
  movies = JSON.parse(sessionStorage.getItem("movies") || "{}");
}

type initialState = {
  movies: Array<any>;
};

const initialState: initialState = {
  movies: [],
};

const moviesReducer = (state = movies || initialState, action: any) => {
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
  if (newState && typeof window !== "undefined") {
    sessionStorage.setItem("movies", JSON.stringify(newState));
  } else {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("movies");
    }
  }
  return newState;
};

export default moviesReducer;
