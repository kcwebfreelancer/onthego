import axios from "axios";

const API_URL = 'https://onthego-backend-6nra.onrender.com/onthego/api/users';

const register = async (userData) => {
    const response = await axios.post(API_URL + '/register', userData);

    return response.data;
}

const login = async (loginData) => {
    const response = await axios.post(API_URL + '/login', loginData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}
const authService = {
    register,
    login
}

export default authService;