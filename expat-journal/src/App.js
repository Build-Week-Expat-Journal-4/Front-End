import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components';

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from "./components/Profile"

import {Route, Switch, Link} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute'

import {HomeContext} from "./contexts/HomeContext"

function App() {

  const userid = window.localStorage.getItem("id")
  const [stories, setStories] = useState([]) 

    const [newStory, setNewStory] = useState({
        
        title: "",
        story: "",
        img_link: "www.google.com",
        location:"",
        user_id: userid,
        date_pic_taken: "03-03-2020"   

    })
    
    const TopBar = styled.div `
      background-color: seashell;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-right: 5%;
      padding-left: 5%;
    `;

    const MenuDiv = styled.div `
      display: flex;
      align-items: center;
      flex-basis: 20%;
      justify-content: space-between;
    `;

    const MenuLink = styled(Link) `
      text-decoration: none;
      color: steelblue;
      font-weight: bold;
      font-family: 'Indie Flower', cursive;
      font-size: 1.5rem;
    `;

    const Logo = styled.h1 `
      color: steelblue;
    `;


  return (
    <div className="App">
      
      <HomeContext.Provider value={{stories, setStories, newStory, setNewStory, userid}}>
      <TopBar>
        <div>
          <Logo>Expat Journal</Logo>
        </div>
        
        <MenuDiv>
          <MenuLink to="/home">Home</MenuLink>
          <MenuLink to="/login">Login</MenuLink>
          <MenuLink to="/">Sign Up</MenuLink>
        </MenuDiv>
      </TopBar>
        
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
