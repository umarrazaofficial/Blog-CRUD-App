import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const [user, setUser] = useState('');

  const auth = localStorage.getItem('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authObject = JSON.parse(auth);
        const email = authObject.email;
        const response = await axios.get(`http://localhost:5000/findaccount/${email}`);
        setUser(response.data[0]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {auth ? <>

        <nav className="navbar bg-primary navbar-expand-lg " data-bs-theme="dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" style={{ marginRight: "50px" }}>
              US-Dashboard
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/user">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/accounts">
                    Accounts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/postblog">
                    Post Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myblog">
                    My Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gallery">
                    Gallery
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search" data-bs-theme="light">
                <button className="btn btn-outline-light" style={{ display: 'flex', alignItems: 'center' }} onClick={() => { localStorage.clear('user') }}>
                  <LogoutIcon style={{ fontSize: 22 }} />Logout
                </button>
              </form>
            </div>
            <div className="me-2 ms-2 text-white ">
              <Link className="nav-link" to="/profile">
                <PersonIcon />
                {user?.name && user?.name}
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav></> : <>
        <nav className="navbar bg-primary navbar-expand-lg " data-bs-theme="dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/login" style={{ marginRight: "50px" }}>
              Welcome to US-Dashboard
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <form className="d-flex ms-auto" role="search" data-bs-theme="light">
                <button className="btn btn-outline-light">
                  <LoginIcon style={{ fontSize: 22 }} /> {"  "}Login
                </button>
              </form>
            </div>
            <div className="me-2 ms-2 text-white">
              {user?.name && user?.name}
            </div>
          </div>
        </nav></>}

    </>
  );
};

export default Navbar;
