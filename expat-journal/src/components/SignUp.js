import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axios from "axios"


function SignUp(props) {

    const { register, handleSubmit, errors } = useForm()

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
        // e.preventDefault()
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
      
<<<<<<< HEAD
        <form onClick={handleSubmit(submitSignUp)}>
=======
        <form onSubmit={handleSubmit(submitSignUp)}>
>>>>>>> dc9683cbdf726c072591d458f52fec9d3bd7355b
        <label>
          First Name:
          <input type="text" name="first_name" onChange={handleChanges} ref={register({ required: true})}/>
        </label>
    
        <label>
          Last Name:
<<<<<<< HEAD
          <input type="text" name="last_name" ref={register({ required: true})}/>
        </label>
=======
          <input type="text" name="last_name" onChange={handleChanges} ref={register({ required: true})}/>
          </label>

          <label>
             Username:
        <input type="text" name="username" onChange={handleChanges} ref={register({ required: true, minLength:{value: 5, message: "Username must be 5 or more characters"} })}/>
      </label>
         <p>{errors.username && errors.username.message}</p>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChanges} ref={register({ required: true, minLength:{value: 5, message: "Password must be 5 or more characters"} })}/>

      </label>
        <p>{errors.password && errors.password.message}</p>
>>>>>>> dc9683cbdf726c072591d458f52fec9d3bd7355b

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
          
          
        <button type="submit">Sign Up</button>
      </form>

    )
}

export default SignUp
