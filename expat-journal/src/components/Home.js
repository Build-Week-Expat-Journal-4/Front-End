<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
=======
import React, { useContext, useEffect } from "react";
>>>>>>> dc9683cbdf726c072591d458f52fec9d3bd7355b
=======
import styled from 'styled-components';
import React, { useContext, useEffect } from "react";
>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813
import axiosWithAuth from "../utils/axiosWithAuth";
import {Link} from "react-router-dom"
import { HomeContext } from "../contexts/HomeContext";

function Home(props) {
    //context
    const {stories, setStories, newStory, setNewStory, userid} = useContext(HomeContext)

    //stories array
    

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813
    const Home = styled.h1`
        color: dodgerblue;
        border: 3px inset teal;
    `

    const Story1 = styled.h2 `
        color: red;
    `

    //gets all current stories
<<<<<<< HEAD
=======
=======

>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813
    const handleChanges = e => {
        setNewStory({
            ...newStory,
            [e.target.name]: e.target.value
        })
    }

    

    //gets current stories from all users
<<<<<<< HEAD
>>>>>>> dc9683cbdf726c072591d458f52fec9d3bd7355b
=======

>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813
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
<<<<<<< HEAD
<<<<<<< HEAD
            <Home>Home Page</Home>
=======
            <h1>home page</h1>
=======

            <Home>Home Page</Home>
>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813

            <form onSubmit={addStory}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChanges}/>

                    <label>Story</label>
                    <input type="text" name="story" onChange={handleChanges}/>

                    <label>Location</label>
                    <input type="text" name="location" onChange={handleChanges}/>
                <button type="submit">Post</button>
            </form>

<<<<<<< HEAD
>>>>>>> dc9683cbdf726c072591d458f52fec9d3bd7355b
=======

>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813
            {stories.map(story => {
                return (
                    
                    <div>
<<<<<<< HEAD
<<<<<<< HEAD
                        <Story1>{story.title}</Story1>
                        <p>{story.story}</p>
=======
                        <h2>{story.title}</h2>
>>>>>>> dc9683cbdf726c072591d458f52fec9d3bd7355b
=======

                        <Story1>{story.title}</Story1>
>>>>>>> c6cab8080ab740a6b17e19b0ba092b1395007813
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
