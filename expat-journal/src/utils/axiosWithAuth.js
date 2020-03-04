import axios from 'axios'

function axiosWithAuth() {
    const token = window.localStorage.getItem('token')
    
    console.log(token)
    
    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'https://expat-journal4.herokuapp.com/api'
    })
}

export default axiosWithAuth