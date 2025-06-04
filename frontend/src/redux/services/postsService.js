import axios from "axios";
import { useSelector } from 'react-redux'

const API_URL = 'https://onthego-backend-6nra.onrender.com/onthego/api'

const posts = async () => {

    const fetchToken = JSON.parse(localStorage.getItem('user'));
    const { token } = fetchToken.user_details;
    if (token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await axios.get(API_URL+'/posts', config);
        if (response.data) {
            return response.data
        }
    }
}

const postsService = {
    posts,
}

export default postsService;