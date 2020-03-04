import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axiosWithAuth from "../utils/axiosWithAuth";

function Home() {

    const [stories, setStories] = useState([]) 

    const Home = styled.h1`
        color: dodgerblue;
        border: 3px inset teal;
    `

    const Story1 = styled.h2 `
        color: red;
    `

    //gets all current stories
    useEffect(() => {
        axiosWithAuth()
        .get('/stories/', stories)
        .then(response => {
            console.log(response)
          window.localStorage.setItem('token', response.data.token)
          setStories(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }, [])


    return (
        <div>
            {/* main page - photos/stories will be here */}
            <Home>Home Page</Home>
            {stories.map(story => {
                return (
                    <div>
                        <Story1>{story.title}</Story1>
                        <p>{story.story}</p>
                        <p>{story.location}</p>
                        {/* <img src={story.img-link}/>
                        <a href={story.img-link}>Photo</a> */}

                    </div>
                )
            })}
        </div>
    )
}

export default Home
