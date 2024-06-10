import './styles.css';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [myFile, setMyFile] = useState('');


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5 MB limit
            const base64 = await convertToBase64(file);
            setMyFile(base64);
        } else {
            alert("File size should be less than 5 MB");
        }
    }

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/signup", {
                fname, lname, uname, email, password, myFile
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("User already exists");
                    } else if (res.data === "notexist") {
                        navigate("/home", { state: { id: email } });
                    }

                    // Clear the form data after successful submission
                    setFname('');
                    setLname('');
                    setUname('');
                    setEmail('');
                    setPassword('');
                    setMyFile('');
                    alert("Form Submitted");
                })
                .catch(e => {
                    alert("Wrong details");
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={submit}>
                    <div className="name mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="firstName" className="form-label me-2">Name</label>
                        <input type="text" className="form-control me-2 ip" id="firstName" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First Name" />
                        <input type="text" className="form-control ip" id="lastName" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last Name" />
                    </div>
                    <div className="userName mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="userName" className="form-label me-2">Username</label>
                        <input type="text" className="form-control ip" id="userName" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="Username" />
                    </div>
                    <div className="emailID mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="emailID" className="form-label me-2">Email</label>
                        <input type="email" className="form-control ip" id="emailID" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="password mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="password" className="form-label me-2">Password</label>
                        <input type="password" id="password" className="form-control ip" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelpBlock" placeholder="Password" />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text-1 mx-2 my-1">Upload</label>
                        <input type="file" label="Image" accept=".jpeg, .png, .jpg" onChange={handleFileUpload} className="form-control" id="inputGroupFile02" />
                    </div>
                    <div className="SignUpBtn">
                        <button type="submit" className="SUbtn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
