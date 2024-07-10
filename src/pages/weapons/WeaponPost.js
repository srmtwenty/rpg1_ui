import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function WeaponPost(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [strength, setStrength]=useState(0);
    const [price, setPrice]=useState(0);
    const [number, setNumber]=useState(1);
    const [imageURL, setImageURL]=useState("");

    const navigate=useNavigate();
    const createWeapon=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/weapons/create", {
            name:name,
            description:description,
            strength:strength,
            price:price,
            imageURL:imageURL
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/weapons")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Post Weapon</h2>
            <form onSubmit={createWeapon}>
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
                        <label>Strength:</label>
                    </div>
                    <input type="number" onChange={(e)=>setStrength(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Price:</label>
                    </div>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Number:</label>
                    </div>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Image URL:</label>
                    </div>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)}/>
                </div>
                <input type="submit" value="Create Strength"/>
            </form>
        </>
    )
}
export default WeaponPost;