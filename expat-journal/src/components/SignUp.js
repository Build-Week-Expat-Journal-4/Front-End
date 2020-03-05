import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axios from "axios"
import signup from '../images/signup.jpeg'

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

      const BackgroundImage = styled.div`
        width:100%;
        height:100vh;
        background-image: url(${signup});
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 5%;
        box-sizing: border-box;
      `;

      const FormContainer = styled.div `
        background-color: rgba(65, 105, 225, 0.3);
        padding: 40px;
        border-radius: 1rem;
      `;

      const Names = styled.label `
        color: steelblue;
        font-family: 'Kalam', cursive;
      `;

      const Button = styled.button`
        display: inline-block;
        color: steelblue;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid cadetblue;
        border-radius: 3px;
        display: center;
        font-family: 'Kalam', cursive;
      `;

      const Attr = styled.div `
        display: flex;
        flex-direction: column;
        align-items: right;
      `;

    return (
      <BackgroundImage>
        <FormContainer>
          <form onSubmit={handleSubmit(submitSignUp)}>
            <Attr>
            <Names>
              First Name:
              <input type="text" name="first_name" onChange={handleChanges} ref={register({ required: true})}/>
            </Names>

            <Names>
              Last Name:
              <input type="text" name="last_name" onChange={handleChanges} ref={register({ required: true})}/>
            </Names>

            <Names>
              Username:
              <input type="text" name="username" onChange={handleChanges} ref={register({ required: true, minLength:{value: 5, message: "Username must be 5 or more characters"} })}/>
            </Names>
              <p>{errors.username && errors.username.message}</p>
            <Names>
              Password:
                <input type="password" name="password" onChange={handleChanges} ref={register({ required: true, minLength:{value: 5, message: "Password must be 5 or more characters"} })}/>

            </Names>
              <p>{errors.password && errors.password.message}</p>
            <Names>
              Email:
                <input type="text" name="email" ref={register({ required: true})}/>
            </Names>
          
          
            <Button type="submit">Sign Up</Button>
            </Attr>
          </form>
        </FormContainer>
      </BackgroundImage>
    )
}

export default SignUp
