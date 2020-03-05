import React, {useState} from 'react';
import './App.css';

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from "./components/Profile"

import {Route, Switch, Link} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute'

import {HomeContext} from "./contexts/HomeContext"

function App() {

  const userid = window.localStorage.getItem("id")
  //all stories array
  const [stories, setStories] = useState([]) 
  
    const [newStory, setNewStory] = useState({
        
        title: "",
        story: "",
        id:"",
        img_link: "www.google.com",
        location:"",
        user_id: userid,
        date_pic_taken: "03-03-2020"   

    })


  return (
    <div className="App">
      <h1>Expat Journal</h1>
      <HomeContext.Provider value={{stories, setStories, newStory, setNewStory, userid}}>

      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/">Sign Up</Link>
        <Switch>
          <Route exact path = "/login" component={Login}/>
          <Route exact path = "/" component={SignUp}/>
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute exact path="/profile" component={Profile}/>
        </Switch>

        </HomeContext.Provider>
    </div>
  );
}

export default App;
