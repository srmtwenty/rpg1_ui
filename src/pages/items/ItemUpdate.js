import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ItemUpdate(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [number, setNumber]=useState(0);
    const [price, setPrice]=useState(0);

    const {id}=useParams();
    const navigate=useNavigate();
    const loadItem=()=>{
        axios.get(`http://localhost:8080/items/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setNumber(res.data.number)
                setPrice(res.data.price)
            })
            .catch(err=>console.log(err))
    }
    
    const updateItem=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/items/${id}/update`, {
            name:name,
            description:description,
            number:number,
            price:price
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/items/${id}`)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadItem();
    },[])
    return(
        <>
            <h2>Update Item</h2>
            <form onSubmit={updateItem}>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Name:</label>
                    </div>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Description:</label>
                    </div>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Number:</label>
                    </div>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)} value={number}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Price:</label>
                    </div>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price}/>
                </div>
               
                <input type="submit" value="Update Item"/>
            </form>
        </>
    )
}
export default ItemUpdate;