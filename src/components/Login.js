import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous error messages

        try {
            console.log(API_URL); // Log the API URL
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });

            if (response.status === 200) { // Check if the login was successful
                localStorage.setItem('token', response.data.token);
                navigate('/home'); // Redirect to the home page
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            // Set an appropriate error message
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password. Please try again.');
            } else {
                setError(error.response?.data?.message || 'An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div>
                <p>Don't have an account?</p>
                <Link to="/register" className="register-link">
                    <button className="register-button">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
