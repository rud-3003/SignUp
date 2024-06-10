import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar() {
    return (
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">App</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/">About</Link>
                        </li>

                    </ul>
                    <div className="d-flex" role="search">
                        <Link to="/login">
                            <button className="SUbtn btn-dark mx-2">LogIn</button>
                        </Link>
                        <Link to="/signup">
                            <button className="SUbtn btn-dark mx-2">SignUp</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
