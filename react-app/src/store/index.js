import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import itemsReducer from './items';
import reviewsReducer from './reviews';
import ordersReducer from './orders';
import cartReducer from './cart';
import listsReducer from './lists';

const rootReducer = combineReducers({
  session,
  allItems: itemsReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  cart: cartReducer,
  lists: listsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
