import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Game from './Components/Game/Game';
import Menu from './Components/Menu/Menu';

const App = () => {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/game/:id" component={Game}>
            </Route>
            <Route path="/" component={Menu}>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
