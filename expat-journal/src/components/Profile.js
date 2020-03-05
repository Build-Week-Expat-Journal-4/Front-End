import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { HomeContext } from "../contexts/HomeContext";


function Profile() {
    const myuserid = window.localStorage.getItem("id")

    const {stories, setStories, newStory, setNewStory, postid} = useContext(HomeContext)
    
    const [myStories, setMyStories] = useState([])
    const [editing, setEditing] = useState(false)



    const handleEdit = (mystuff) => {
        console.log(mystuff)
        setEditing(true)
        setNewStory(mystuff)
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
      const editStory = (e) => {
          e.preventDefault()
          console.log(newStory)
          axiosWithAuth()
          .put(`/stories/${newStory.id}`, newStory)
          .then(response => {
            console.log("edit successful", response)
            setNewStory(response.data)
            setEditing(false)
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
                    <img src={mystuff.img_link}/>
                    
                    <button onClick={() => handleEdit(mystuff)}>Edit</button>
                    <button onClick={() => deleteStory(mystuff.id)}>Delete</button>

                    </div>
                )
            })}

            {/* opens edit input boxes when edit button is clicked */}
            {console.log(newStory)}
            {editing && (
                    <form onSubmit={editStory}>
                        <h3>Edit Story</h3>
                        <label>
                            Title
                        <input onChange={e => 
                        setNewStory({...newStory, title:e.target.value})
                        }
                        value={newStory.title}
                        />
                        </label>

                        <label>
                            Location
                        <input onChange={e => 
                        setNewStory({...newStory, location: e.target.value})
                        }
                        value={newStory.location}
                        />
                        </label>

                        <label>
                            Story
                        <input onChange={e => 
                        setNewStory({...newStory, story:e.target.value})
                        }
                        value={newStory.story}
                        />
                        </label>
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </form>
                    )} 
        </div>
    )
}

export default Profile
