import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

function Navbar1() {
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
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container style={{backgroundColor:"#7df4ff", padding:"2em", fontSize:"1.2em"}}>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

      <Nav defaultActiveKey="/home">
            <Nav.Link href="/nationalTeams">Teams</Nav.Link>
            <Nav.Link href="/nations">Nations</Nav.Link>
            
            <NavDropdown title="Competitions" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/competitions">Competitions</NavDropdown.Item>
              <NavDropdown.Item href="/routines">
                Routines
              </NavDropdown.Item>
            </NavDropdown>

            {currentUser ? (
            <NavDropdown title="People" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/people">People</NavDropdown.Item>
              <NavDropdown.Item href="/occupations">
                Occupations
              </NavDropdown.Item>
            </NavDropdown>)
            :(<></>)}

            <NavDropdown title="Media" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/articles">Articles</NavDropdown.Item>
              <NavDropdown.Item href="/broadcasts">
                Broadcasts
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Music" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/soundtracks">Soundtracks</NavDropdown.Item>
              <NavDropdown.Item href="/musics">
                Musics
              </NavDropdown.Item>
              <NavDropdown.Item href="/artists">
                Artists
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/tags">Tags</Nav.Link>

            <Nav.Link href={"/public"}>
                Public
              </Nav.Link> 

            {showModeratorBoard && (
              <Nav.Link href={"/mod"}>
                Moderator Board
              </Nav.Link>
            )}

            {showAdminBoard && (
              <Nav.Link href={"/admin"}>
                Admin Board
              </Nav.Link>
            )}

          {currentUser && (
              <Nav.Link href={"/user"}>
                User
              </Nav.Link>
          )}
     

        {currentUser ? (
            <>
              <Nav.Link href={"/profile"}>
                {currentUser.username}
              </Nav.Link>  
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </>
        ) : (
            <>
              <Nav.Link href={"/login"}>
                Login
              </Nav.Link>
              <Nav.Link href={"/register"}>
                Sign Up
              </Nav.Link>
            </>
        )}
       
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
  
  export default Navbar1;