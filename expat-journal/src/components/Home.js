import styled from 'styled-components';
import React, { useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {Link} from "react-router-dom"
import { HomeContext } from "../contexts/HomeContext";

//styled components
const Story1 = styled.h2 `
color: black;
`

const HomeContainer = styled.div `
        background-color: #f1f3f4;
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
        border: 1px solid black;
        border-radius:14px;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: white;
        padding:20px;
    `;

    const Descrip = styled.label `
    color: steelblue;
    font-family: 'Kalam', cursive;
    `;

    const MenuLink = styled(Link) `
    text-decoration: none;
    color: steelblue;
    font-weight: bold;
    /* font-family: 'Indie Flower', cursive; */
    font-size: 1.5rem;
    margin:20px;

    &:hover{
        color:rgb(33, 102, 134);
        transition:all .25s ease-in
    }
    `;



function Home(props) {
    //context
    const {stories, setStories, newStory, setNewStory, userid} = useContext(HomeContext)


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
      const addStory = (e) => {
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

    

    return (
        <HomeContainer id="tophome">
            
            <div classname="homenav">
                <br></br>
            <MenuLink to="/profile" userid={userid}>Profile</MenuLink>
            <MenuLink onClick={signOut} userid={userid}>Sign Out</MenuLink>
            </div>
           
            <form className="storyform" onSubmit={addStory}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChanges}/>

                    <label>Story</label>
                    <textarea type="text" name="story" rows="6" cols="50" onChange={handleChanges}/>

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
                            <p className="location">{story.location}</p>
                            <p>By: {story.first_name} {story.last_name}</p>
                            <p>{story.story}</p>
                            
                            <StoryImg src={story.img_link}/>
                        </StoryCard>
                    )
                })}
                <a href="#tophome">Back To Top</a>
            </StoriesContainer>
        </HomeContainer>
    )
}

export default Home
