import './App.css';
import {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Posts
  from './routes/Posts';
import Header from './components/Header';
import Dashboard from './routes/Dashboard';
import NotFound from './routes/NotFound';
import Register from './routes/Register';
import Login from './routes/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/posts' element={<Posts />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
