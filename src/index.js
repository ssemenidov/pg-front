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
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  uri: 'https://allbot.online/api/',
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       {
//         allCities {
//           title
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

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
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
