import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userTokenReducer from './userToken.js';

const rootReducer = combineReducers({
    userToken: userTokenReducer,
});

export default configureStore({ reducer: rootReducer });