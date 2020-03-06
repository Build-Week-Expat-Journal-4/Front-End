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
    `;

    const Story1 = styled.h2 `
        color: mediumturquoise;
        font-family: 'Indie Flower', cursive;
        font-size: 2.7rem;
    `;

    const Title = styled.label `
        color: royalblue;
        font-weight: bold;
        font-family: 'Indie Flower', cursive;
        font-size: 1.5rem;

    `;

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
        display: flex;
    `;

    const StoriesContainer = styled.div `
        margin-right: 30%;
        margin-left: 20%;
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
    
    const FormContainer = styled.div `
        margin-left: 5%;
    `;

    const Form = styled.form `
        display: flex;
        flex-direction: column;
    `;

    const Button = styled.button`
        display: inline-block;
        color: steelblue;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid cadetblue;
        border-radius: 3px;
        display: center;
        font-family: 'Kalam', cursive;
        transition-duration: 0.4s;
    `;

    const Location = styled.p `
        color: dodgerblue;
        font-weight: bold;
        font-family: 'Indie Flower', cursive;
        font-size: 1.45rem;
    `;

    const Story = styled.p `
        font-family: 'Montserrat', sans-serif;
    `;


    return (
        <HomeContainer>
            {/*<Link to="/profile" userid={userid}>Profile</Link>*/}
            {/* <button onClick={signOut}>Sign Out</button> */}
            {/* main page - photos/stories will be here */}
            <FormContainer>
                <Form onSubmit={addStory}>
                        <Title>Title</Title>
                        <input type="text" name="title" onChange={handleChanges}/>

                        <Title>Story</Title>
                        <input type="text" name="story" onChange={handleChanges}/>

                        <Title>Location</Title>
                        <input type="text" name="location" onChange={handleChanges}/>

                        <Title>Image Url</Title>
                        <input type="text" name="img_link" onChange={handleChanges}/>

                    <Button type="submit">Post</Button>
                </Form>
            </FormContainer>

            <StoriesContainer>
                {stories.map(story => {
                    return (
                        
                        <StoryCard>

                            <Story1>{story.title}</Story1>
                            <Location>{story.location}</Location>
                            <Story>{story.story}</Story>
                            
                            <StoryImg src={story.img_link}/>
                        </StoryCard>
                    )
                })}
            </StoriesContainer>
        </HomeContainer>
    )
}

export default Home
