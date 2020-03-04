import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {Link} from "react-router-dom"

function Home(props) {

    const userid = window.localStorage.getItem("id")

    //stories array
    const [stories, setStories] = useState([]) 

    const [newStory, setNewStory] = useState({
        
        title: "",
        story: "",
        img_link: "www.google.com",
        location:"",
        user_id: userid,
        date_pic_taken: "03-03-2020"
        

    })

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


    return (
        <div>
            <Link to="/profile" userid={userid}>Profile</Link>
            {/* main page - photos/stories will be here */}
            <h1>home page</h1>

            <form onSubmit={addStory}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChanges}/>

                    <label>Story</label>
                    <input type="text" name="story" onChange={handleChanges}/>

                    <label>Location</label>
                    <input type="text" name="location" onChange={handleChanges}/>
                <button type="submit">Post</button>
            </form>

            {stories.map(story => {
                return (
                    
                    <div>
                        <h2>{story.title}</h2>
                        <p>{story.location}</p>
                        <p>{story.story}</p>
                        
                        <img src="https://images.unsplash.com/photo-1562961857-b1ba8f9dbd5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1360&q=80" alt="sbsdf"/>
                      

                    </div>
                )
            })}
        </div>
    )
}

export default Home
