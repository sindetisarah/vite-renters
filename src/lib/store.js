import { init } from "@rematch/core";
import loadingPlugin from "@rematch/loading";
import { thunk } from "redux-thunk";

// Initial state of the store
const initialState = {};

// Initialize the store using Rematch
const store = init({
  global: true, // Make the store globally accessible
  redux: {
    initialState: initialState, // Set the initial state of the Redux store
    middlewares: [thunk], // Use Redux thunk middleware for handling asynchronous actions
  },
});

export default store;
