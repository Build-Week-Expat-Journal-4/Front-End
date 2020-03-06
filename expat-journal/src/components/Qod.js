import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from "axios"
import qod from '../images/qod.jpeg'

function Qod(props) {

    const [quote, setQuote] = useState('');
    
    useEffect(() => {
        axios
        .get('http://quotes.rest/qod.json')
        .then(response => {
            console.log(response.data.contents.quotes[0].quote)
            setQuote(
                response.data.contents.quotes[0].quote
            )
        })
        .catch(error => {
          console.log(error)
        })
      }, [])
      
    const BackgroundImage = styled.div`
      width:100%;
      height:100vh;
      background-image: url(${qod});
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 5%;
      box-sizing: border-box;
    `;

    const P = styled.p `
        color: dodgerblue;
        font-family: 'Pacifico', cursive;
        font-size: 2rem;
        flex-basis: 10%;
        text-shadow: 5px 5px 5px crimson;
    `;

    return (
        <BackgroundImage>
            <P>-- "{quote}"</P>
        </BackgroundImage>
    )
}

export default Qod