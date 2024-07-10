import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate,useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function WeaponUpdate(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [strength, setStrength]=useState(0);
    const [price, setPrice]=useState(0);
    const [number, setNumber]=useState(1);
    const [imageURL, setImageURL]=useState("");
    const {id}=useParams();
    const navigate=useNavigate();
    const loadWeapon=()=>{
        axios.get(`http://localhost:8080/weapons/${id}`
            , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setStrength(res.data.strength)
                setPrice(res.data.price)
                setNumber(res.data.number)
                setImageURL(res.data.imageURL)
            })
            .catch(err=>console.log(err))
    }

    const updateWeapon=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/weapons/${id}/update`, {
            name:name,
            description:description,
            strength:strength,
            price:price,
            number:number,
            imageURL:imageURL
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/weapons/${id}`)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadWeapon();
    },[])
    return(
        <>
            <h2>Update Weapon</h2>
            <form onSubmit={updateWeapon}>
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
                        <label>Strength:</label>
                    </div>
                    <input type="number" onChange={(e)=>setStrength(e.target.value)} value={strength}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Price:</label>
                    </div>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Number:</label>
                    </div>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)} value={number}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Image URL:</label>
                    </div>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)} value={imageURL}/>
                </div>
                <input type="submit" value="Update Weapon"/>
            </form>
        </>
    )
}
export default WeaponUpdate;