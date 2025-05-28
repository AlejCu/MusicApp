import { createStore, combineReducers } from 'redux';
import libraryReducer from '../reducers/libraryReduce';

const rootReducer = combineReducers({
  library: libraryReducer,
});

export const store = createStore(rootReducer);