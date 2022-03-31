import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import "./index.css"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './Pages/Search';
import Recommendation from './Pages/Recommendation';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import allReducers from './reducers/index.js';
import Error from './Pages/Error.js';
import { AnimatePresence } from 'framer-motion';
import NotFound from './Pages/NotFound.js';

let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AnimatePresence>

          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recommendation" element={<Recommendation />} />

            <Route path="/error" element={<Error />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

        </AnimatePresence>
      </BrowserRouter>
    </React.StrictMode>
  </Provider >
  ,


  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
