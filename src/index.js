import React from 'react';
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import "./index.css"

import App from './App.jsx';
import {
  BrowserRouter
} from 'react-router-dom';
import * as Sentry from "@sentry/react";
import {
  BrowserTracing
} from "@sentry/tracing";


if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  console.log("Development mode")
} else {

  // Override console.log operations
  let console = {};
  console.log = function () { }
  window.console = console;

  // Sentry
  Sentry.init({
    dsn: "https://3541196f669c4d4aa91958963e365afc@o1187436.ingest.sentry.io/6307336",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.5
  });
}



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode >
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </React.StrictMode>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();