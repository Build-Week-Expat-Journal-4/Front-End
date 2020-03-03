import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';

function SignUp() {

    const { register, handleSubmit, watch, errors } = useForm()

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

    return (
        <form onClick={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" ref={register({ required: true})}/>
        </label>
    
        <label>
          Last Name:
          <input type="text" name="last_name" ref={register({ required: true})}/>
          </label>

          <label>
             Username:
        <input type="text" name="username" ref={register({ required: true, minLength:{value: 6, message: "Your Username is too Short!"} })}/>
      </label>
         <p>{errors.username && errors.username.message}</p>
      <label>
        Password:
        <input type="password" name="password" ref={register({ required: true, minLength:{value: 6, message: "Your Password is too Short!"} })}/>

      </label>
        <p>{errors.password && errors.password.message}</p>

        <label>
          Email:
          <input type="text" name="email" ref={register({ required: true})}/>
        </label>
          
          
        <button>Sign Up</button>
      </form>
    )
}

export default SignUp
