import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function InventoryUpdate(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [money, setMoney]=useState(0);
    const navigate=useNavigate();
    const {id}=useParams();
    const loadInventory=()=>{
        axios.get(`http://localhost:8080/inventories/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setMoney(res.data.money)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadInventory();
    },[])
    const updateInventory=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/inventories/${id}/update`, {
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
            <form onSubmit={updateInventory}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div>
                    <label>Money:</label>
                    <input type="number" onChange={(e)=>setMoney(e.target.value)} value={money}/>
                </div>
                
                <input type="submit" value="Update Inventory"/>
            </form>
        </>)
}
export default InventoryUpdate;