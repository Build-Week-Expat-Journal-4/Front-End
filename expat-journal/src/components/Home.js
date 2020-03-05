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

    return (
        <HomeContainer>
            <Link to="/profile" userid={userid}>Profile</Link>
            {/* main page - photos/stories will be here */}

            <form onSubmit={addStory}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChanges}/>

                    <label>Story</label>
                    <input type="text" name="story" onChange={handleChanges}/>

                    <label>Location</label>
                    <input type="text" name="location" onChange={handleChanges}/>
                <button type="submit">Post</button>
            </form>

            <StoriesContainer>
                {stories.map(story => {
                    return (
                        
                        <StoryCard>

                            <Story1>{story.title}</Story1>
                            <p>{story.location}</p>
                            <p>{story.story}</p>
                            
                            <StoryImg src="https://images.unsplash.com/photo-1562961857-b1ba8f9dbd5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1360&q=80" alt="photo of stuff"/>
                        </StoryCard>
                    )
                })}
            </StoriesContainer>
        </HomeContainer>
    )
}

export default Home
