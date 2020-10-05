import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reducerTable from './store/reducer/tableReducer';
import constructionReducer from './store/reducer/constructionReducer';
import contragentsReducer from './store/reducer/contragentsReducer';
import locationsReducer from './store/reducer/locationsReducer';
import locationReducer from './store/reducer/locationReducer';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://allbot.online/api/',
  cache: new InMemoryCache(),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  table: reducerTable,
  construction: constructionReducer,
  contragents: contragentsReducer,
  locations: locationsReducer,
  location: locationReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

const app = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
