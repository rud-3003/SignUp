import './styles.css';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/login", { email, password });

            if (res.status === 200) {
                alert("Successfully Logged In");
                localStorage.setItem("authToken", res.data.authToken);
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while logging in. Please try again.");
            }
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={submit}>
                    <div className="emailID mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="emailID" className="form-label me-2">Email</label>
                        <input type="email" className="form-control ip" id="emailID" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="password mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="password" className="form-label me-2">Password</label>
                        <input type="password" id="password" className="form-control ip" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelpBlock" placeholder="Password" />
                    </div>
                    <div className="LoginBtn">
                        <button type="submit" className="SUbtn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
