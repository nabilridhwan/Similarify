import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import "./index.css"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './Pages/Search';
import LastFMResults from './Pages/LastFMResults';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import allReducers from './reducers/index.js';

let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lastfm" element={<LastFMResults />} />
        </Routes>

      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  ,


  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
