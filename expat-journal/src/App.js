import React from 'react';
import './App.css';

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

import {Route, Switch, Link} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute'

function App() {
  return (
    <div className="App">
      <h1>Expat Journal</h1>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/">Sign Up</Link>
        <Switch>
          <Route exact path = "/login" component={Login}/>
          <Route exact path = "/" component={SignUp}/>
          <PrivateRoute exact path="/home" component={Home}/>
        </Switch>
    </div>
  );
}

export default App;
