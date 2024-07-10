import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import Navbar from 'react-bootstrap/Navbar';
//import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

import PlayerList from './pages/PlayerList';
import PlayerDetail from './pages/players/PlayerDetail';
import PlayerPost from './pages/players/PlayerPost';
import PlayerUpdate from './pages/players/PlayerUpdate';

import InventoryList from './pages/InventoryList';
import InventoryDetail from './pages/inventories/InventoryDetail';
import InventoryPost from './pages/inventories/InventoryPost';
import InventoryUpdate from './pages/inventories/InventoryUpdate';

import ArmorList from './pages/ArmorList';
import ArmorDetail from './pages/armors/ArmorDetail';
import ArmorPost from './pages/armors/ArmorPost';
import ArmorUpdate from './pages/armors/ArmorUpdate';

import WeaponList from './pages/WeaponList';
import WeaponDetail from './pages/weapons/WeaponDetail';
import WeaponPost from './pages/weapons/WeaponPost';
import WeaponUpdate from './pages/weapons/WeaponUpdate';

import ItemList from './pages/ItemList';
import ItemDetail from './pages/items/ItemDetail';
import ItemPost from './pages/items/ItemPost';
import ItemUpdate from './pages/items/ItemUpdate';

import EnemyList from './pages/EnemyList';
import EnemyDetail from './pages/enemies/EnemyDetail';
import EnemyPost from './pages/enemies/EnemyPost';
import EnemyUpdate from './pages/enemies/EnemyUpdate';

import ImageList from './pages/ImageList';
import ImageDetail from './pages/images/ImageDetail';
import ImagePost from './pages/images/ImagePost';

import AddressList from './pages/AddressList';
import AddressDetail from './pages/addresses/AddressDetail'
import AddressPost from './pages/addresses/AddressPost';
import AddressUpdate from './pages/addresses/AddressUpdate';

import ColosseumList from './pages/ColosseumList';
import ColosseumDetail from './pages/colosseums/ColosseumDetail';
import ColosseumPost from './pages/colosseums/ColosseumPost';
import ColosseumUpdate from './pages/colosseums/ColosseumUpdate';

import MainPage from './pages/MainPage';

function App() {
  const [count, setCount]=useState(1);

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
  }, [count]);

  const handleClick=()=>{
    setCount(count+1)
  }

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="App">

<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container style={{backgroundImage:"linear-gradient(to right, rgba(217, 233, 252), rgba(242, 246, 250))", borderBottom:"1px solid", padding:"1em", fontSize:"1.2em", width:"90"}}>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

      <Nav defaultActiveKey="/">
            <Nav.Link href="/players">Players</Nav.Link>
            <Nav.Link href="/inventories">Inventories</Nav.Link>
            <Nav.Link href="/armors">Armors</Nav.Link>
            <Nav.Link href="/weapons">Weapons</Nav.Link>
            <Nav.Link href="/items">Items</Nav.Link>
            <Nav.Link href="/enemies">Enemies</Nav.Link>
            <Nav.Link href="/images">Images</Nav.Link>
            
            <Nav.Link href="/colosseums">Colosseums</Nav.Link>

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
      
      <div className="container mt-3">
        <Routes>
        
          <Route path="/" element={<MainPage/>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />

          <Route path="/players" element={<PlayerList/>}/>
          <Route exact path="/players/:id" element={<PlayerDetail/>}/>
          <Route exact path="/players/create" element={<PlayerPost/>}/>
          <Route exact path="/players/:id/update" element={<PlayerUpdate/>}/>

          <Route path="/inventories" element={<InventoryList/>}/>
          <Route exact path="/inventories/:id" element={<InventoryDetail/>}/>
          <Route exact path="/inventories/create" element={<InventoryPost/>}/>
          <Route exact path="/inventories/:id/update" element={<InventoryUpdate/>}/>

          <Route path="/armors" element={<ArmorList/>}/>
          <Route exact path="/armors/:id" element={<ArmorDetail/>}/>
          <Route exact path="/armors/create" element={<ArmorPost/>}/>
          <Route exact path="/armors/:id/update" element={<ArmorUpdate/>}/>

          <Route path="/weapons" element={<WeaponList/>}/>
          <Route exact path="/weapons/:id" element={<WeaponDetail/>}/>
          <Route exact path="/weapons/create" element={<WeaponPost/>}/>
          <Route exact path="/weapons/:id/update" element={<WeaponUpdate/>}/>

          <Route path="/items" element={<ItemList/>}/>
          <Route exact path="/items/:id" element={<ItemDetail/>}/>
          <Route exact path="/items/create" element={<ItemPost/>}/>
          <Route exact path="/items/:id/update" element={<ItemUpdate/>}/>


          <Route path="/enemies" element={<EnemyList/>}/>
          <Route exact path="/enemies/:id" element={<EnemyDetail/>}/>
          <Route exact path="/enemies/create" element={<EnemyPost/>}/>
          <Route exact path="/enemies/:id/update" element={<EnemyUpdate/>}/>

          <Route path="/images" element={<ImageList/>}/>
          <Route exact path="/images/:id" element={<ImageDetail/>}/>
          <Route exact path="/images/create" element={<ImagePost/>}/>
          
          <Route path="/addresses" element={<AddressList/>}/>
          <Route exact path="/addresses/:id" element={<AddressDetail/>}/>
          <Route exact path="/addresses/create" element={<AddressPost/>}/>
          <Route exact path="/addresses/:id/update" element={<AddressUpdate/>}/>

          <Route path="/colosseums" element={<ColosseumList/>}/>
          <Route exact path="/colosseums/:id" element={<ColosseumDetail/>}/>
          <Route exact path="/colosseums/create" element={<ColosseumPost/>}/>
          <Route exact path="/colosseums/:id/update" element={<ColosseumUpdate/>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
