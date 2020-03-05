import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { HomeContext } from "../contexts/HomeContext";


function Profile() {
    const myuserid = window.localStorage.getItem("id")

    const {stories, setStories, newStory, setNewStory, postid} = useContext(HomeContext)
    
    const [myStories, setMyStories] = useState([])
    const [editing, setEditing] = useState(false)

    const handleEdit = post => {
        console.log(post)
        setEditing(true)
        setNewStory(post)
    }

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
           window.location.reload()
        })
          .catch(error => {
            console.log(error)
        })
        
      }

      //edit
      const editStory = (post) => {
          post.preventDefault()
          console.log(post)
          axiosWithAuth()
          .put(`/stories/${postid}`, newStory)
          .then(response => {
            console.log("edit successful", response)
            setNewStory(response.data)
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
                    
                    <button onClick={() => handleEdit(mystuff.id)}>Edit</button>
                    <button onClick={() => deleteStory(mystuff.id)}>Delete</button>

                    </div>
                )
            })}

            {/* opens edit input boxes when edit button is clicked */}
            {editing && (
                    <form onSubmit={editStory}>
                        <h3>Edit Story</h3>
                        <label>
                            Title
                        <input onChange={e => 
                        setNewStory({...stories, title:e.target.value})
                        }
                        value={myStories.title}
                        />
                        </label>

                        <label>
                            Location
                        <input onChange={e => 
                        setNewStory({...stories, location: e.target.value})
                        }
                        value={myStories.location}
                        />
                        </label>

                        <label>
                            Story
                        <input onChange={e => 
                        setNewStory({...stories, story:e.target.value})
                        }
                        value={myStories.story}
                        />
                        </label>
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </form>
                    )} 
        </div>
    )
}

export default Profile
