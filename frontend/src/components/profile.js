import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const history = useNavigate()
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        history("/login");
    }

    return (
        <div className="container">
            <hr />
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <hr />
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 10)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>

            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <hr />
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
            <hr />
        </div>
    );
};

export default Profile;