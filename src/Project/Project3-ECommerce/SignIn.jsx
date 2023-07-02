import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import { notification } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'

function SignIn() {
    const [error,setError]=useState('');
    const [user, setUser] = useState({
        userName: '',
        password: '',
    })


    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    let nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post('http://localhost:3001/LogIn', user);
            if (res.status === 201) {
                const token=res.data.token;
                localStorage.setItem('token',token);
                nav(`/ECommerce/UserHomePage/${user.userName}`);
                setUser({ ...user, userName: '', password: ""});
            }
            else {
                console.log(res.data.message);
            }
        } catch (error) {
            //alert(error.response.data.message);
            // console.log(error);
            setError(error.response.data.message);
            openNotification();
        }
    }

    // Antd notification api
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        console.log("test")
        api.info({
            message: "Error",
            description: <Alert message="User name or password is incorrect" type="error" />,
            placement: "bottomRight",
            duration: 3,
            icon: <InfoCircleOutlined style={{ color: 'red' }} />
        });
    };


    return (
        <div className='SignInContainer'>
            {contextHolder}
            <div className='Error'>{error}!</div>
            <div className='LogInBox'>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>Sign In</div>
                    <div>UserName:<input style={{ marginLeft: '71px' }} name='userName' value={user.userName} onChange={handleInputChange}></input></div>
                    <div>Password:<input style={{ marginLeft: '78px' }} type='password' name='password' value={user.password} onChange={handleInputChange}></input></div>
                    <input type='submit' value='continue' />
                </form>
                <Link to='/ECommerce'>Back to Home</Link>
                <Link to='/ECommerce/Register' style={{ display: 'block' }}>Sign Up</Link>
            
            </div>
        </div>
    )
}

export default SignIn;