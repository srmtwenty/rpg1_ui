import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

function Navbar(){
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

            if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
        logOut();
        });

        return () => {
        EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };
    return (
 
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          scott
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/competitions"} className="nav-link">
            Competitions
            </Link>
          </li>
 
          <li className="nav-item">
            <Link to={"/nationalTeams"} className="nav-link">
              Teams
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/nations"} className="nav-link">
              Nations
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/people"} className="nav-link">
              People
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/occupations"} className="nav-link">
              Occupations
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/routines"} className="nav-link">
              Routines
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/articles"} className="nav-link">
              Articles
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/broadcasts"} className="nav-link">
              Broadcasts
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/soundtracks"} className="nav-link">
              Soundtracks
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/musics"} className="nav-link">
              Musics
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/artists"} className="nav-link">
              Artists
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/tags"} className="nav-link">
              Tags
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
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
      </nav>)
}
export default Navbar;