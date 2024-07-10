import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
function InventoryPost(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [money, setMoney]=useState(0);
    
    const navigate=useNavigate();
    const createInventory=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/inventories/create", {
            name:name,
            description:description,
            money:money
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/inventories")
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <form onSubmit={createInventory}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Money:</label>
                    <input type="number" onChange={(e)=>setMoney(e.target.value)}/>
                </div>
                
                <input type="submit" value="Create Inventory"/>
            </form>
        </>)
}
export default InventoryPost;