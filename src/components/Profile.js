import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate,useParams} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const print=console.log(currentUser.email);
  const [inventory, setInventory]=useState(null)
  const [player, setPlayer]=useState(null)
  const [allPlayers, setAllPlayers]=useState([])
  const navigate=useNavigate();
  const [allInventories, setAllInventories]=useState([])  
  
  const loadUser=()=>{
    axios.get(`http://localhost:8080/users/${currentUser.id}`)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>console.log(err))
  }
  
  const loadPlayer=()=>{
    axios.get(`http://localhost:8080/users/${currentUser.id}/getPlayer`
    , {headers:authHeader()})
      .then(res=>{
        setPlayer(res.data)
        console.log(res.data)
        console.log(currentUser)
      })
      .catch(err=>console.log(err))
  }

  const loadInventory=()=>{
    axios.get(`http://localhost:8080/users/${currentUser.id}/getInventory`
    , {headers:authHeader()})
      .then(res=>{
        setInventory(res.data)
        console.log(res.data)
      })
      .catch(err=>console.log(err))
  }

  const loadAllInventories=()=>{
    axios.get("http://localhost:8080/inventories"
      , {headers:authHeader()})
      .then(res=>{
        setAllInventories(res.data)
        console.log(res.data)
      })
      .catch(err=>console.log(err))
  }

  const loadAllPlayers=()=>{
    axios.get("http://localhost:8080/players",
      {headers:authHeader()})
      .then(res=>{
        setAllPlayers(res.data)
        console.log(res.data)
      })
      .catch(err=>console.log(err))
  }

  useEffect(()=>{
    loadPlayer();
    loadUser();
    loadInventory();
    loadAllInventories();
    loadAllPlayers();
  },[])

  const assignInventory=(inventoryId)=>{
    axios.put(`http://localhost:8080/users/${currentUser.id}/assignInventory/${inventoryId}`
    , {headers:authHeader()})
        .then(res=>{
            window.location.reload();
            navigate(`http://localhost:8080/users/${currentUser.id}`)
        })
        .catch(err=>console.log(err))
}
const removeInventory=(inventoryId)=>{
    axios.put(`http://localhost:8080/users/${currentUser.id}/removeInventory/${inventoryId}`
    , {headers:authHeader()})
        .then(res=>{
            window.location.reload();
            navigate(`http://localhost:8080/users/${currentUser.id}`)
        })
        .catch(err=>console.log(err))
}

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
     
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Player:</strong> 
        {
          player?
          <><Link to={`/players/${player.id}`}>{player.name}</Link></>
          :<>No Player</>
        }
      <p>
        <strong>Inventory:</strong> 

        {
          inventory?
          <>{inventory.id}</>
          :<>null</>
        }
        
      </p>  
        
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      
      <h2>Player List</h2>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>User</th>
              <th>Inventory</th>
              
            </tr>
          </thead>
          <tbody>
            {
              allPlayers.map((p, i)=>(
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>
                  {
                      p.user?
                      <>{p.user.username}</>
                      :<>No User</>
                    }
                  </td>
                  <td>
                    {
                      p.user && p.user.inventory?
                      <>{p.user.inventory.id}</>
                      :<>No Inventory</>
                    }
                  </td>

                  
                </tr>
              ))
              
            }
            
          </tbody>
      </table>


      <h2>Inventory List</h2>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Player</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allInventories.map((inv, i)=>(
                <tr key={i}>
                  <td>{inv.name}</td>
                  <td>
                    {
                      inv.player?
                      <>{inv.player.name}</>
                      :<>No Player</>
                    }
                  </td>

                  <td>
                    <button onClick={()=>assignInventory(inv.id)}>Assign Inventory</button>
                  </td>
                </tr>
              ))
              
            }
            
          </tbody>
      </table>
      {
        player?
        <></>
        :<Link to={`/players/create`}>Create Player</Link>
      }
    </div>
  );
};

export default Profile;