import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Style/SingUp.css';

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Send the form data to the backend for login authentication
    axios.post('http://localhost:3000/user/login', {
      email: values.email,
      password: values.password
    })
      .then(response => {
        // Handle success
        console.log('Login successful:', response.data);
        // Redirect to another page or perform any necessary actions
        navigate('/chatPage');
      })
      .catch(error => {
        // Handle error
        console.error('Error during login:', error);
        // Display error message to the user
      });
  };

  return (
    <>
      <div className="container">
        <div className="image-container">
          <img src="login.jpeg" alt="" className="image" />
        </div>
        <div className="form-container">
          <h1>Login</h1>
          <Form onFinish={onFinish}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            <Link to="/signup"><p>Don't have an account? Sign up</p></Link>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
