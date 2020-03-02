import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';

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
        axiosWithAuth()
        .post('', login)
        .then(response => {
          window.localStorage.setItem('token', response.data.payload)
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
      <form onClick={submitLogin}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button>Submit</button>
    </form>
    )
}

export default Login
