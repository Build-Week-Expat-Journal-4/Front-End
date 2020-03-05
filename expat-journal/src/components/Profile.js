import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


function Profile() {
    const myuserid = window.localStorage.getItem("id")
    const postid = window.localStorage.getItem("id")
    
    const [myStories, setMyStories] = useState([])

    // able to view stories you've posted
    useEffect(() => {
        axiosWithAuth()
        .get(`/users/${myuserid}/stories`, myStories)
        .then(response => {
            console.log(response)
          setMyStories(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }, [])

      //delete
      const deleteStory = (id) => {
          axiosWithAuth()
          .delete(`/stories/${id}`)
          .then(response => {
            console.log("delete successful", response)
           
        })
          .catch(error => {
            console.log(error)
        })
      }

      //edit
      const editStory = () => {
          axiosWithAuth()
          .put(`/stories/${myStories.id}`, myStories)
          
          .then(response => {
            console.log("edit successful", response)
            setMyStories(response.data)
        })
          .catch(error => {
            console.log(error)
        })
      }
    

    return (
        <div>
            <h1>Profile</h1>
            {myStories.map (mystuff => {
                return (
                    <div value={mystuff.id}>
                    <h2>{mystuff.title}</h2>
                    <p>{mystuff.location}</p>
                    <p>{mystuff.story}</p>
                    
                    <button onClick={editStory}>Edit</button>
                    <button onClick={() => deleteStory(mystuff.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile
