import React, {useState} from 'react'
import axios from "axios"

function SignUp(props) {

    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        username:'',
        password:'',
        email: ''
    })

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    
    const submitSignUp = e => {
        e.preventDefault()
        axios
        .post('https://expat-journal4.herokuapp.com/api/auth/register/', newUser)
        .then(response => {
          console.log(response)
          props.history.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
        setNewUser({
            first_name: '',
            last_name: '',
            username:'',
            password:'',
            email: ''
        })
      }

    return (
        
        <form onSubmit={submitSignUp}>
            <input type="text" name="first_name" onChange={handleChanges}></input>
            <input type="text" name="last_name" onChange={handleChanges}></input>
            <input type="text" name="username" onChange={handleChanges}></input>
            <input type="text" name="password" onChange={handleChanges}></input>
            <input type="text" name="email" onChange={handleChanges}></input>
            <button>Sign Up</button>
        </form>
    )
}

export default SignUp
