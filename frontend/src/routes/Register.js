import React, { useState, useEffect } from 'react'
import { NavLink } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../redux/slices/authSlice'


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
    if (isSuccess) {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      });
      setTimeout(() => {
        navigate('/login');
        dispatch(reset());
        
      }, 5000)
    }
  }, [isError, isSuccess])

  useEffect(() => {})

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const { first_name, last_name, email, password, confirm_password } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendFormData = {
    first_name,
    last_name,
    email,
    password
  }
  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      toast.error("Password does not match, please match the password");
      return false;
    } else {
      dispatch(register(sendFormData));
      dispatch(reset());
    }
    
  }

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  }
  const handleToggleConfirmPassword = () => {
    setToggleConfirmPassword(!toggleConfirmPassword);
  }
  const handleLogin = () => {
    navigate('/login');
    dispatch(reset());
  }

  return (
    <>
      <div className='login-bg'>
        <div className='container'>
          <div className='login-form'>
            <h1>Register</h1>
            <Form className='form' onSubmit={handleRegister}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      name="first_name"
                      placeholder="First Name"
                      type="text"
                      autoComplete='off'
                      value={first_name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      name="last_name"
                      placeholder="Last Name"
                      type="text"
                      autoComplete='off'
                      value={last_name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  autoComplete='off'
                  value={email}
                  onChange={handleChange}
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup className='password-group'>
                    <Input
                      name="password"
                      placeholder="Password"
                      type={togglePassword ? 'text' : 'password'}
                      autoComplete='off'
                      value={password}
                      onChange={handleChange}
                    />
                    <span className='toggle-password' onClick={handleTogglePassword}><i className={`fa ${togglePassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className='password-group'>
                    <Input
                      name="confirm_password"
                      placeholder="Confirm Password"
                      type={toggleConfirmPassword ? 'text' : 'password'}
                      autoComplete='off'
                      value={confirm_password}
                      onChange={handleChange}
                    />
                    <span className='toggle-password' onClick={handleToggleConfirmPassword}><i className={`fa ${toggleConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
                  </FormGroup>
                </Col>
              </Row>
              <Button color="danger" type='submit'>{isLoading ? 'Loading...' : 'Register'}</Button>
              <p className='already'>Already have an account?
                <NavLink href='/login'>Login</NavLink>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register