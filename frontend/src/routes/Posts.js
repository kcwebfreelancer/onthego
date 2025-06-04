import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        const API_URL = 'http://localhost:8000/onthego/api'
        
        const bodyData = {
            "email" : "johndoe@gmail.com",
            "password": "123"
        }
        const loginResponse = await axios.post(API_URL+'/users/login', bodyData);
        //console.log("login---------", data);

        const token = loginResponse.data.user_details.token;
        //console.log("token--------", token);
        const postsResponse = await axios.get('http://localhost:8000/onthego/api/posts', 
            { headers: {"Authorization" : `Bearer ${token}`} }
        );
        console.log('posts....', postsResponse)

        try {
            setTimeout(()=>{
                setLoading(false);
            }, 5000)
            
             setPosts(postsResponse.data.posts);
        } catch (error) {
            console.log(error);
        }

    }

    //console.log('posts....', posts);
    return (
        <>
            <h2>Posts</h2>
            {
                loading ? <p>Loading....</p> : <ul>
                    {
                        (posts.length > 0) ? posts.map((post) => {
                            return (<li key={post._id}>{post.title}</li>)
                        }) : <li>No results found</li>
                    }
                </ul>
            }

        </>
    )
}

export default Users;