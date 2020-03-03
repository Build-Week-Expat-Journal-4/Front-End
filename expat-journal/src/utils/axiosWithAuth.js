import axios from 'axios'

function axiosWithAuth() {
    const token = window.localStorage.getItem('token')
    
    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'https://expat-journal4.herokuapp.com/api'
    })
}

export default axiosWithAuth