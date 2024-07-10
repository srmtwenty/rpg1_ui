import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function ItemList(){
    const [items, setItems]=useState([])
    const [currentPlayer, setCurrentPlayer]=useState(null)
    const [user, setUser]=useState(null)
    const [inventory, setInventory]=useState(null)
    const navigate=useNavigate();
    const currentUser=AuthService.getCurrentUser();

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const loadItem=()=>{
        axios.get("http://localhost:8080/items"
            , {headers:authHeader()})
            .then(res=>{
                setItems(res.data)
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
      const loadInventory=()=>{
        axios.get(`http://localhost:8080/users/${currentUser.id}/getInventory`
        , {headers:authHeader()})
            .then(res=>{
                setInventory(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
        }
    useEffect(()=>{
        loadItem();
        if(currentUser!=null){
            loadUser();
        }
    }, [])

    const deleteItem=(id)=>{
        axios.delete(`http://localhost:8080/items/${id}/delete`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/items")
            })
            .catch(err=>console.log(err))
    }

    const purchaseItem=(itemId)=>{
        axios.put(`http://localhost:8080/inventories/${inventory.id}/purchaseItem/${itemId}`
            , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/items`)
                console.log("Item has been purchased!")
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
                :<>No current user</>
            }
            
            <div className="profile_wrap2">
            <h2>Item List</h2>
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
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, index)=>(
                                    <tr key={index}>
                                        <td><Link to={`/items/${item.id}`}>{item.id}</Link></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.description}</td>
                               
                                        <td>
                                            {
                                                currentUser && user && inventory?
                                                <button onClick={()=>purchaseItem(item.id)}>Purchase</button>
                                                :<></>
                                            }
                                            <button onClick={()=>deleteItem(item.id)}>Delete</button>
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
                    <Link to="/items/create">Post Item</Link>
                </>
                :<></>
            }
            
        </>
    )
}
export default ItemList;