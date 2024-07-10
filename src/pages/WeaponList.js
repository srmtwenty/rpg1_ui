import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function WeaponList(){
    const [weapons, setWeapons]=useState([])
    const [currentPlayer, setCurrentPlayer]=useState(null)
    const [user, setUser]=useState(null)
    const [inventory, setInventory]=useState(null)
    const navigate=useNavigate();
    const currentUser=AuthService.getCurrentUser();

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const loadWeapons=()=>{
        axios.get("http://localhost:8080/weapons"
        , {headers:authHeader()})
            .then(res=>{
                setWeapons(res.data)
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
    const loadPlayer=()=>{
        axios.get(`http://localhost:8080/users/${currentUser.id}/getPlayer`
        , {headers:authHeader()})
          .then(res=>{
            setCurrentPlayer(res.data)
            console.log(res.data)
            //loadInventory();
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
    const loadUser=()=>{
        axios.get(`http://localhost:8080/users/${currentUser.id}`, {headers:authHeader()})
            .then(res=>{
                setUser(res.data)
                setInventory(res.data.inventory)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    } 
    useEffect(()=>{
        loadWeapons();
        if(currentUser!=null){
            loadUser();
        }
    }, [])
    const deleteWeapon=(id)=>{
        axios.delete(`http://localhost:8080/weapons/${id}/delete`
            , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/weapons`)
                console.log("Weapon has been deleted!")
            })
            .catch(err=>console.log(err))
    }

    const purchaseWeapon=(weaponId)=>{
        axios.put(`http://localhost:8080/inventories/${inventory.id}/purchaseWeapon/${weaponId}`
            , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/weapons`)
                console.log("Weapon has been purchased!")
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            {
                currentUser?
                <>
                    <h4>Current User {
                        currentUser!=null?
                        <>: {currentUser.username}</>
                        :<>Current Player is null</>
                    }|
                    Inventory {
                        currentUser && user && inventory?
                        <><Link to={`/inventories/${inventory.id}`}>: {inventory.id} | Money:{inventory.money}</Link></>
                        :<>Inventory is null</>
                    }</h4>
                </>
                :<></>
            }
            
            <div className="profile_wrap2">
            <h2>Weapon List</h2>
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
                                <th>Strength</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                weapons.map((weapon, index)=>(
                                    <tr key={index}>
                                        <td><Link to={`/weapons/${weapon.id}`}>{weapon.id}</Link></td>
                                        <td><img src={`http://localhost:8080/files/${weapon.imageURL}`} style={{height:"100px"}}/></td>
                                        <td>{weapon.name}</td>
                                        <td>{weapon.strength}</td>
                                        <td>{weapon.price}</td>
                                        <td>
                                            {
                                                currentUser && user && inventory?
                                                <button onClick={()=>purchaseWeapon(weapon.id)}>Purchase</button>
                                                :<></>
                                            }
                                            <button onClick={()=>deleteWeapon(weapon.id)}>Delete Weapon</button>
                                        </td>
                                    </tr>
                                ))   
                            }
                        </tbody>
                    </table>
                
                </div>:
                <>
                    <h2>No Weapons</h2>
                </>
            }
            </>
            }
            </div>


            {
                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                <>
                    <Link to="/weapons/create">Post Weapon</Link>
                </>
                :<></>
            }
            
        </>
    )
}
export default WeaponList;