import React, { useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {Link} from "react-router-dom"
import { HomeContext } from "../contexts/HomeContext";

function Home(props) {
    //context
    const {stories, setStories, newStory, setNewStory, userid} = useContext(HomeContext)

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


    return (
        <div>
            <Link to="/profile" userid={userid}>Profile</Link>
            {/* <button onClick={signOut}>Sign Out</button> */}
            {/* main page - photos/stories will be here */}
            <h1>home page</h1>

            <form onSubmit={addStory}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChanges}/>

                    <label>Story</label>
                    <input type="text" name="story" onChange={handleChanges}/>

                    <label>Location</label>
                    <input type="text" name="location" onChange={handleChanges}/>

                    <label>Image</label>
                    <input type="text" name="img_link" onChange={handleChanges}/>
                <button type="submit">Post</button>
            </form>

            {stories.map(story => {
                return (
                    
                    <div>
                        <h2>{story.title}</h2>
                        <p>{story.location}</p>
                        <p>{story.story}</p>
                        
                        <img src="https://images.unsplash.com/photo-1562961857-b1ba8f9dbd5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1360&q=80" alt="photo of stuff"/>
                      

                    </div>
                )
            })}
        </div>
    )
}

export default Home
