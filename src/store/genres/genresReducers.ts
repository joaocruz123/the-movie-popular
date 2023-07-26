import { actionTypes } from ".";
let genres: any = null;

if (typeof window !== "undefined") {
  genres = JSON.parse(sessionStorage.getItem("genres") || "{}");
}

type initialState = {
  genres: Array<any>;
};

const initialState: initialState = {
  genres: [],
};

const genresReducers = (state = genres || initialState, action: any) => {
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
  if (newState && typeof window !== "undefined") {
    sessionStorage.setItem("genres", JSON.stringify(newState));
  } else {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("genres");
    }
  }
  return newState;
};

export default genresReducers;
