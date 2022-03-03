import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from 'react-bootstrap'
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import User from "./components/user";
import Admin from "./components/admin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

const App = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <img src="logo.png" style={{ height: "30px" }} alt="user" />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

              {showAdminBoard && (
                <div className="navbar-nav ml-auto">
                  <Link to={"/admin"} className="nav-link">
                    Admin
                  </Link>
                </div>
              )}

              {currentUser && (
                <div className="navbar-nav ml-auto">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </div>
              )}

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      Logout
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {currentUser && (
          <div className="container">
            <p style={{ textAlign: "right", margin: "auto", marginRight: "20px" }}><strong>Signed in as : </strong>{currentUser.email}</p>
          </div>
        )}
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};

export default App;