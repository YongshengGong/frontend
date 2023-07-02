import { Link } from 'react-router-dom'
import './Register.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [newUser, setNewUser] = useState({
        userName: '',
        password: '',
        rePassword: ''
    })

    let nav = useNavigate();

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const [error,setError]=useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password === newUser.rePassword) {
            try {
                const res = await axios.post('http://localhost:3001/Register', newUser);
                if (res.status === 201) {
                    nav('/ECommerce/SignIn');
                    console.log(res.data.message)
                    alert('Congrats! You have created your account. Now let\'s log in.')
                    setNewUser({ ...newUser, userName: '', password: "", rePassword: "" });
                }
                else {
                    console.log(res.data.message);
                }

            } catch (error) {
                setError(error.response.data.message);
            }
        }
        else {
            setError('password doesnt match!');
        }
    }

//     const drink = async() => {
//         return new Promise((resolve, reject) => {

//           setTimeout(() => {
//             resolve('drink');
//           }, 1000);
//         });
//       };
//    drink().then(data=>{console.log(data)});

// const drink=async()=>{
//     return 100;
// }
// drink().then(data=>{console.log(data)});

// const drink=async()=>{
//     return new Promise(res=>{setTimeout(()=>{res(100)},2000)});
// }
// drink().then(data=>{console.log(data)});


    return (
        <div className='RegisterContainer'>
            <div className='Error'><p>{error}</p></div>
            <div className='RegisterBox'>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>Sign Up</div>
                    <div>UserName:<input style={{ marginLeft: '71px' }} name='userName' value={newUser.userName} onChange={handleInputChange}></input></div>
                    <div>Password:<input style={{ marginLeft: '78px' }} type='password' name='password' value={newUser.password} onChange={handleInputChange}></input></div>
                    <div>Re-enter Password:<input style={{ marginLeft: '10px' }} type='password' name='rePassword' value={newUser.rePassword} onChange={handleInputChange}></input></div>
                    <input type='submit' value='Register Now!' />
                </form>
                <Link to='/ECommerce'>Back to Home</Link>
                <Link to='/ECommerce/SignIn'>Back to Sign In</Link>
            </div>
        </div>
    )
}

export default Register;