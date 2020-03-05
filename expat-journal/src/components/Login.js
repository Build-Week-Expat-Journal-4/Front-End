import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import axios from "axios"
import loginpage from "../images/loginpage.jpeg"


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

    const BackgroundImage = styled.div`
      width:100%;
      height:100vh;
      background-image: url(${loginpage});
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

      const UserName = styled.label `
        color: mediumblue;
        font-family: 'Kalam', cursive;
      `;

      const PassWord = styled.label `
        color: mediumblue;
        font-family: 'Kalam', cursive;
      `;

      const Button = styled.button`
        display: inline-block;
        color: palevioletred;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid palevioletred;
        border-radius: 3px;
        display: center;
      `;

    return (
      <BackgroundImage>
        <FormContainer>
          <form onSubmit={handleSubmit(submitLogin)}>
            <UserName>
              Username:
              <input type="text"
              name="username"
              onChange={handleChanges}
              ref={register({ required: true, minLength:{value: 5, message: "Username must be 5 or more characters"} })}/>
            </UserName>
              <p>{errors.username && errors.username.message}</p>

            <PassWord>
              Password:
              <input type="password" name="password"
              onChange={handleChanges}
              ref={register({ required: true, minLength:{value: 5, message: "Password must be 5 or more characters"} })}/>
            </PassWord>
              <p>{errors.password && errors.password.message}</p>
              
            <Button type="submit">Login</Button>
        </form>
      </FormContainer>
    </BackgroundImage>
    )
}

export default Login
