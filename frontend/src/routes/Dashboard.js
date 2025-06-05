import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useFetcher, useNavigate } from 'react-router-dom'
import { fetchPosts } from '../redux/slices/postsSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { posts, isLoading } = useSelector((state) => state.posts);
    
    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user])
    useEffect(() => {
        if(user){
            dispatch(fetchPosts());
        }

    }, [])
    return (
        <>
            <h1>Welcome to OnTheGo!!!</h1>
            {
                isLoading ? <p>Loading....</p> : null
            }
            <ul>
                {
                    posts?.posts?.length > 0 ? posts.posts.map((post) => {
                        return (<li key={post._id}>{post.title}</li>)
                    }) : <p>No results found.</p>
                }
            </ul>
        </>
    )
}

export default Dashboard;