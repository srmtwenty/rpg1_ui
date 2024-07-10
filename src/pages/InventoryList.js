import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function InventoryList(){
    const [allInventories, setAllInventories]=useState([]);
    const currentPlayer=AuthService.getCurrentUser();
    const navigate=useNavigate();
    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const loadAllInventories=()=>{
        axios.get("http://localhost:8080/inventories"
        , {headers:authHeader()})
            .then(res=>{
        
                setAllInventories(res.data);
                console.log(res.data)
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

    const deleteInventory=(id)=>{
        axios.delete(`http://localhost:8080/inventories/${id}/delete`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/inventories")
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadAllInventories()
    },[])

    return(
        <>
            <div className="profile_wrap2">
            <h2>Inventories</h2>
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
                                <th>Inventory Id</th>
                                <th>Inventory Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allInventories.map((inv, i)=>(
                                <tr key={i}>
                                    <td><Link to={`/inventories/${inv.id}`}>{inv.id}</Link></td>
                                    <td>{inv.name}</td>

                                    <td><button onClick={()=>deleteInventory(inv.id)}>Delete</button></td>
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
                </>
            }
            </div>

            
            {
                currentPlayer?
                <>
                    <Link to="/inventories/create">Post Inventory</Link>
                </>
                :<></>
            }
            
        </>
    )
}
export default InventoryList;