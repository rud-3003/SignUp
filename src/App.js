// import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp.js';
import Login from './Components/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
