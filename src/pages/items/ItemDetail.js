import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ItemDetail(){
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
                navigate(`/items/${id}`)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadItem()
    },[])
    return(
        <>
            <h2>Name: {name}</h2>
            <div className="lineKeyVal">
                <div className="attributeContainer">
                    <label>Description:</label>
                </div>
                {description}
            </div>

            <div className="lineKeyVal">
                <div className="attributeContainer">
                    <label>Number:</label>
                </div>
                {number}
            </div>

            <div className="lineKeyVal">
                <div className="attributeContainer">
                    <label>Price:</label>
                </div>
                {price}
            </div>

            <Link to={`/items/${id}/update`}>Update Item</Link>
        </>
    )
}
export default ItemDetail;