import React, {useState} from 'react'
import axios from "axios"
import axiosWithAuth from '../utils/axiosWithAuth'

function Login(props) {

    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const handleChanges = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    //axios call to login
    const submitLogin = e => {
        e.preventDefault()
        axios
        .post('https://expat-journal4.herokuapp.com/api/auth/login', login)
        .then(response => {
            console.log(response)
          window.localStorage.setItem("token", response.data.token)
          props.history.push('/home')
        })
        .catch(error => {
          console.log(error)
        })
        setLogin({
          username: "",
          password: ""
        })
      }

    return (
        <div>
            {/* insert form here */}
            <form onSubmit={submitLogin}>
                <input type="text" name="username" onChange={handleChanges} value={login.username}>

                </input>
                <input type="password" name="password" onChange={handleChanges} value={login.password}>
                    
                </input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
