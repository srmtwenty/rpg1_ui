import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './style.css'
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function PlayerList(){
    const [players, setPlayers]=useState([])
    const currentUser=AuthService.getCurrentUser();
    const navigate=useNavigate();
    const loadPlayer=()=>{
        axios.get("http://localhost:8080/players"
        , {headers:authHeader()})
            .then(res=>{
                setPlayers(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPlayer();
    }, [])

    const deletePlayer=(id)=>{
        axios.delete(`http://localhost:8080/players/${id}/delete`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/players")
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <h2>Player List</h2>

            {
                players?
                <div className="rowTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>HP</th>
                                <th>MP</th>
                                <th>User</th>
                                <th>Inventory</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                players.map((player, index)=>(
                                    <tr key={index}>
                                        <td><Link to={`/players/${player.id}`}>{player.id}</Link></td>
                                        <td><img src={`http://localhost:8080/files/${player.imageURL}`} style={{height:"100px"}}/></td>
                                        <td>{player.name}</td>
                                        <td>{player.age}</td>
                                        <td>{player.hp}/{player.maxHp}</td>
                                        <td>{player.mp}/{player.maxMp}</td>
                                        <td>
                                            {
                                                player.user?
                                                <>{player.user.username}</>
                                                :<>No User</>
                                            }
                                        </td>
                                        <td>
                                            {
                                                player.user && player.user.inventory?
                                                <>{player.user.inventory.id}</>
                                                :<>No Inventory</>
                                            }
                                        </td>
                                        
                                        <td>
                                            <button onClick={()=>deletePlayer(player.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                                
                            }
                            
                        </tbody>
                    </table>
                
                </div>:
                <>
                    <h2>Loading</h2>
                </>
            }
        
            {
                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                <>
                    <Link to="/players/create">Post Player</Link>
                </>
                :<></>
            }
        </>
    )
}
export default PlayerList;