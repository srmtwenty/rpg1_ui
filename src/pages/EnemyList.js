import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function EnemyList(){
    const [enemies, setEnemies]=useState([])
    const currentUser=AuthService.getCurrentUser();
    const navigate=useNavigate();

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const loadEnemies=()=>{
        axios.get("http://localhost:8080/enemies"
            , {headers:authHeader()})
            .then(res=>{
                setEnemies(res.data)
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
                setLoadComplete(true)
                console.log(loadComplete)
            })
    }
    useEffect(()=>{
        loadEnemies();
    }, [])

    const deleteEnemy=(id)=>{
        axios.delete(`http://localhost:8080/enemies/${id}/delete`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/enemies")
            })
            .catch(err=>console.log(err))
    }
    return(
        <>

            <div className="profile_wrap2">
            <h2>Enemy List</h2>
            {
                loadComplete!=true?
                <><h2>Now Loading</h2></>
                :<>
            {
                noData!=true?
                <div className="rowTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>HP</th>
                                <th>MP</th>
                                <th>Strength</th>
                                <th>Defense</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enemies.map((enemy, index)=>(
                                    <tr key={index}>
                                        <td><Link to={`/enemies/${enemy.id}`}>{enemy.id}</Link></td>
                                        <td><img src={`http://localhost:8080/files/${enemy.imageURL}`} style={{height:"100px"}}/></td>
                                        <td>{enemy.name}</td>
                                        <td>{enemy.hp}/{enemy.maxHp}</td>
                                        <td>{enemy.mp}/{enemy.maxMp}</td>
                                        <td>{enemy.strength}</td>
                                        <td>{enemy.defense}</td>
                                        <td>
                                            <button onClick={()=>deleteEnemy(enemy.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                
                </div>
                :<><h2>Loading</h2></>
            }
            :</>
            }

            {
                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                <>
                    <Link to="/enemies/create">Post Enemy</Link>
                </>
                :<></>
            }
            </div>
        </>
    )
}
export default EnemyList;