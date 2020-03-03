import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

function Home() {

    const [stories, setStories] = useState([]) 

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
            <h1>home page</h1>
            {stories.map(story => {
                return (
                    <div>
                        <h2>{story.title}</h2>
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
