import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Home from './pages/Home.js';
import Detail from './pages/Detail.js';
import Kehadiran from './pages/Kehadiran.js';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/attendance" component={Kehadiran}/>
          <Route path="/detail/:id" component={Detail}/>
        </Switch>
    </Router>
  );
}

export default App;
