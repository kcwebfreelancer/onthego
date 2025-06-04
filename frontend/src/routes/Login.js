import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Col, Row, NavLink } from 'reactstrap';
import { login, reset } from '../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const { isSuccess, isError, message, user, isLoading } = useSelector((state) => state.auth);
    const { email, password } = loginData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //let user = JSON.parse(localStorage.getItem('user'));
    const handleLogin = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Email is required');
            return false;
        }
        else if (!password) {
            toast.error('Password is required');
            return false;
        } else {
            dispatch(login(loginData));
        }
    }

    const handleChange = (e) => {
        setLoginData((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))

    };
    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
        }
        if (isError) {
            toast.error(message);
        }

    }, [isSuccess, isError])

    useEffect(() => {
        if (user && isSuccess) {
            setTimeout(() => {
                navigate('/');
                localStorage.setItem('isLoggedIn', true);
            }, 5000)
        }
    }, [user, isSuccess])

    const handleRegister = () => {
        navigate('/register');
        dispatch(reset());
    }

    return (
        <>
            <div className='login-bg'>
                <div className='container'>
                    <div className='login-form'>
                        <h1>Login</h1>
                        <Form className='form' onSubmit={handleLogin}>
                            <FormGroup>
                                <Input
                                    name="email"
                                    placeholder="Enter Email"
                                    type="email"
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={password}
                                />
                            </FormGroup>
                            <Button color="danger" type='submit'>{isLoading ? 'Loading...' : 'Login'}</Button>
                            <p className='already'>Don't have an account?
                                <NavLink href='/register'>Register</NavLink>
                            </p>
                        </Form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login