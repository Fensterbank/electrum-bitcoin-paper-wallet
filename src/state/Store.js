import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const composeEnhancers = composeWithDevTools({
    name: 'paper-wallet',
    serialize: true,
});

const middleware = [];

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

export default store;
