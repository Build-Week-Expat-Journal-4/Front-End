import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axios from "axios"


function Login(props) {

  const { register, handleSubmit, errors } = useForm()

    const [login, setLogin] = useState({
        username: '',
        password: '',
        id:""
    })

    const handleChanges = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    //axios call to login
    const submitLogin = e => {
        // e.preventDefault()
        axios
        .post('https://expat-journal4.herokuapp.com/api/auth/login', login)
        .then(response => {
            console.log(response)
          window.localStorage.setItem("token", response.data.token)
          window.localStorage.setItem("id", response.data.id)
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

      <form onSubmit={handleSubmit(submitLogin)}>
      <label>
        Username:
        <input type="text"
        name="username"
        onChange={handleChanges}
        ref={register({ required: true, minLength:{value: 5, message: "Username must be 5 or more characters"} })}/>
      </label>
        <p>{errors.username && errors.username.message}</p>

      <label>
        Password:
        <input type="password" name="password"
        onChange={handleChanges}
        ref={register({ required: true, minLength:{value: 5, message: "Password must be 5 or more characters"} })}/>
      </label>
        <p>{errors.password && errors.password.message}</p>
        
      <button type="submit">Login</button>
    </form>
    )
}

export default Login
