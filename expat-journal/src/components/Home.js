import styled from 'styled-components';
import React, { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {Link} from "react-router-dom"
import { HomeContext } from "../contexts/HomeContext";

function Home(props) {
    //context
    const {stories, setStories, newStory, setNewStory, userid} = useContext(HomeContext)

    //stories array
    

    const Home = styled.h1`
        color: dodgerblue;
    `

    const Story1 = styled.h2 `
        color: red;
    `

    //gets all current stories
    const handleChanges = e => {
        setNewStory({
            ...newStory,
            [e.target.name]: e.target.value
        })
    }

    const signOut = () => {
        window.localStorage.removeItem("token");
      };
    

    //gets current stories from all users
    useEffect(() => {
        axiosWithAuth()
        .get('/stories/', stories)
        .then(response => {
            console.log(response)
        //   window.localStorage.setItem('token', response.data.token)
          setStories(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }, [])

      //adds new stories
      const addStory = e => {
        e.preventDefault()
        console.log(newStory)
        
        axiosWithAuth()
        .post(`/users/${userid}/stories/`, newStory)
        .then(response => {
           console.log(response)
           setNewStory(response.data)
           window.location.reload()
        })
        .catch(error => {
            console.log (error)
        })

    }

    const HomeContainer = styled.div `
        background-color: mistyrose;
    `;

    const StoriesContainer = styled.div `
        margin-right: 30%;
        margin-left: 30%;
    `;

    const StoryImg = styled.img `
        width: 100%;
        margin-bottom: -3px;
    `;

    const StoryCard = styled.div `
        border: 1px solid dodgerblue;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: white;
    `;

    const Descrip = styled.label `
    color: steelblue;
    font-family: 'Kalam', cursive;
    `;

    return (
        <HomeContainer>
            <Link to="/profile" userid={userid}>Profile</Link>
            {/* <button onClick={signOut}>Sign Out</button> */}
            {/* main page - photos/stories will be here */}

            <form onSubmit={addStory}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChanges}/>

                    <label>Story</label>
                    <input type="text" name="story" onChange={handleChanges}/>

                    <label>Location</label>
                    <input type="text" name="location" onChange={handleChanges}/>

                    <label>Image Url</label>
                    <input type="text" name="img_link" onChange={handleChanges}/>

                <button type="submit">Post</button>
            </form>

            <StoriesContainer>
                {stories.map(story => {
                    return (
                        
                        <StoryCard>

                            <Story1>{story.title}</Story1>
                            <p>{story.location}</p>
                            <p>{story.story}</p>
                            
                            <StoryImg src={story.img_link}/>
                        </StoryCard>
                    )
                })}
            </StoriesContainer>
        </HomeContainer>
    )
}

export default Home
