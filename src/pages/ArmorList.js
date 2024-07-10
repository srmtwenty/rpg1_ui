import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function ArmorList(){
    const [armors, setArmors]=useState([])
    const [currentPlayer, setCurrentPlayer]=useState(null)
    const [user, setUser]=useState(null)
    const [inventory, setInventory]=useState(null)
    const navigate=useNavigate();
    const currentUser=AuthService.getCurrentUser();

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const loadArmor=()=>{
        axios.get("http://localhost:8080/armors"
            , {headers:authHeader()})
            .then(res=>{
                setArmors(res.data)
                setLoadComplete(true)
                console.log(loadComplete)
                console.log(res.data)
                console.log(currentUser)
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
        loadArmor();
        if(currentUser!=null){
            loadUser();
        }
    }, [])

    const deleteArmor=(id)=>{
        axios.delete(`http://localhost:8080/armors/${id}/delete`
            , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/armors`)
                console.log("Armor has been deleted!")
            })
            .catch(err=>console.log(err))
    }

    const purchaseArmor=(armorId)=>{
        axios.put(`http://localhost:8080/inventories/${inventory.id}/purchaseArmor/${armorId}`
            , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/armors`)
                console.log("Armor has been purchased!")
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
            {
                currentUser!=null?
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
                :<>No current user</>
            }
            
            <h2>Armor List</h2>
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
                                        <th>Defense</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        armors.map((armor, index)=>(
                                        <tr key={index}>
                                            <td><Link to={`/armors/${armor.id}`}>{armor.id}</Link></td>
                                            <td><img src={`http://localhost:8080/files/${armor.imageURL}`} style={{height:"100px"}}/></td>
                                            <td>{armor.name}</td>
                                            <td>{armor.defense}</td>
                                            <td>{armor.price}</td>
                                            <td>
                                                {
                                                    currentUser && user && inventory?
                                                    <button onClick={()=>purchaseArmor(armor.id)}>Purchase</button>
                                                    :<></>
                                                }
                                                <button onClick={()=>deleteArmor(armor.id)}>Delete Armor</button>
                                            </td>
                                        </tr>
                                    ))   
                                }
                            </tbody>
                        </table>
                    </div>
                    :<><h2>No Armors</h2></>
                    }
                </>
            }
            
            {
                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                <>
                    <Link to="/armors/create">Post Armor</Link>
                </>
                :<></>
            }



            </div>
        </>
    )
}
export default ArmorList;