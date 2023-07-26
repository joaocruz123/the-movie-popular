import { legacy_createStore as createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";
import axios from "axios";

const api = axios.create({
  responseType: "json",
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
  },
});

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk.withExtraArgument(api))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
