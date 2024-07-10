import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ItemPost(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [number, setNumber]=useState(1);
    const [price, setPrice]=useState(0);

    const navigate=useNavigate();
    const createItem=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/items/create", {
            name:name,
            description:description,
            number:number,
            price:price
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/items")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Post Item</h2>
            <form onSubmit={createItem}>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Name:</label>
                    </div>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Description:</label>
                    </div>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Number:</label>
                    </div>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Price:</label>
                    </div>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)}/>
                </div>
               
                <input type="submit" value="Create Item"/>
            </form>
        </>
    )
}
export default ItemPost;