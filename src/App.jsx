import { Route, Routes } from 'react-router-dom'

// Pages
import Search from './Pages/Search';
import Recommendation from './Pages/Recommendation';
import NotFound from './Pages/NotFound';
import Error from './Pages/Error';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import allReducers from './reducers/index.js';
import { AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import AuthenticationFailed from './Pages/AuthenticationFailed';
import Authenticate from './Pages/Authenticate';



let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
function App() {
  return (
    <Provider store={store}>
      <AnimatePresence>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/authenticate" element={<Authenticate/>} />

          <Route path="/error" element={<Error />} />
          <Route path="/authenticationfailed" element={<AuthenticationFailed/>} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </AnimatePresence>
    </Provider >
  )
}

export default App;
