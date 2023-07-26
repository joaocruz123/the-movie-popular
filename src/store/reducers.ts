import { combineReducers } from "redux";
import { genresReducers } from "./genres";
import { moviesReducer } from "./movies";

const reducers = combineReducers({
  movies: moviesReducer,
  genres: genresReducers,
});

export default reducers;
