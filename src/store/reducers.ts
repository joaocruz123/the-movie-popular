import { combineReducers } from "redux";
import moviesReducer from "./movies/moviesReducers";

const reducers = combineReducers({
  movies: moviesReducer,
});

export default reducers;
