import axios from 'axios'

const API_URL = 'http://localhost:8000/api/auth/'


const signup = async (userData) => {
    const response = await axios.post(API_URL + "signup", userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    signup,
    logout,
    login
}

export default authService;