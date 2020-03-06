import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { HomeContext } from "../contexts/HomeContext";
import styled from 'styled-components';


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

      const All = styled.div `
          background-color: lavenderblush;
      `;

      const Profile = styled.h1 `
          color: royalblue;
          font-family: 'Indie Flower', cursive;
      `;

      const Location = styled.p `
        color: dodgerblue;
        font-weight: bold;
        font-family: 'Indie Flower', cursive;
        font-size: 1.45rem;
    `;

      const Descrip = styled.p `
        color: dodgerblue;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
      `;

      const Img = styled.img `
        width:100%;
        height:100vh;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 5%;
        box-sizing: border-box;
        border-radius: 100px;
      `;

      const Button = styled.button `
        display: inline-block;
        color: royalblue;
        font-size: 1em;
        font-weight:bold;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid deepskyblue;
        border-radius: 3px;
        display: center;
        font-family: 'Kalam', cursive;
      `;

    return (
        <All>
            <Profile>My Trips!</Profile>
            {myStories.map (mystuff => {
                return (
                    <div value={mystuff.id}>
                    <Location>{mystuff.title}</Location>
                    <Location>{mystuff.location}</Location>
                    <Descrip>{mystuff.story}</Descrip>
                    <Img src={mystuff.img_link}/>
                    
                    <Button onClick={() => handleEdit(mystuff)}>Edit</Button>
                    <Button onClick={() => deleteStory(mystuff.id)}>Delete</Button>

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
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </form>
                    )} 
        </All>
    )
}

export default Profile
