import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
export default function configureStore() {

var preloadedState = {};

if(typeof window !== 'undefined') {
	preloadedState = window.__PRELOADED_STATE__
	delete window.__PRELOADED_STATE__
}

 return createStore(
   rootReducer,
   preloadedState,
   applyMiddleware(thunk)
 );
}