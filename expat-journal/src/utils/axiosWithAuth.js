import axios from 'axios'

function axiosWithAuth() {
    const token = window.localStorage.getItem('token')
    
    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: ''
    })
}

export default axiosWithAuth