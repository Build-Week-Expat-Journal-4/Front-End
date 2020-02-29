import React from 'react';
import './App.css';

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

import {Route, Switch} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute'

function App() {
  return (
    <div className="App">
      <h1>Expat Journal</h1>
        <Switch>
          <Route exact path = "/" component={Login}/>
          <Route exact path = "/register" component={SignUp}/>
          <PrivateRoute exact path="/home" component={Home}/>
        </Switch>
    </div>
  );
}

export default App;
