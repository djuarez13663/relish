import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import photosReducer from "./photosDucks";

const rootReducer = combineReducers({
    photoInfo: photosReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))