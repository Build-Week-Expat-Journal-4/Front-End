import React, {useState} from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'

function Login() {

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
        axiosWithAuth()
        .post('/auth/login', login)
        .then(response => {
          window.localStorage.setItem('token', response.data.payload)
          e.history.push('/home')
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
            {/* <form onSubmit={submitLogin}>
                <input type="text" name="username" onChange={handleChanges}>

                </input>
                <input type="password" name="password" onChange={handleChanges}>
                    
                </input>
                <button type="submit">Login</button>
            </form> */}
        </div>
    )
}

export default Login
