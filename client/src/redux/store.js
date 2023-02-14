import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducerRecipe from './reducer';

const store = createStore(reducerRecipe, composeWithDevTools(applyMiddleware(thunk)));

export default store;
