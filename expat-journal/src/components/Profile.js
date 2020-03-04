import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


function Profile() {
    const userid = window.localStorage.getItem("id")
    const postid = window.localStorage.getItem("id")
    const [myStories, setMyStories] = useState([])

    // able to view your stories and edit/delete them
    useEffect(() => {
        axiosWithAuth()
        .get(`/users/${userid}/stories`, myStories)
        .then(response => {
          setMyStories(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }, [])

      //delete
      const deleteStory = () => {
          axiosWithAuth()
          .delete(`/stories/${postid}`)
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
          .put(`/stories/${postid}`, myStories)
          .then(response => {
            console.log("edit successful", response)
            setMyStories(response.data.id)
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
                    <div>
                    <h2>{mystuff.title}</h2>
                    <p>{mystuff.location}</p>
                    <p>{mystuff.story}</p>
                    
                    <button onClick={editStory}>Edit</button>
                    <button onClick={deleteStory}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile
