import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import combineReducers from '../reducers/index';

let middleware = [thunkMiddleware, logger];

const createMiddleWare = applyMiddleware(...middleware);

export const store = createStore(
    combineReducers, createMiddleWare

)

store.subscribe(() => {
})
