import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function WeaponDetail(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [strength, setStrength]=useState(0);
    const [price, setPrice]=useState(0);
    const [number, setNumber]=useState(0);
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
    useEffect(()=>{
        loadWeapon()
    },[])
    return(
        <>
            <h2>Name: {name}</h2>
            <img src={`http://localhost:8080/files/${imageURL}`} style={{width:"200px"}}/>
            
            <div style={{display:"flex", margin:"auto",width:"300px"}}>
                <div className="attributeContainer">
                    Description:
                </div>
                {description}
            </div>
            
            <div style={{display:"flex", margin:"auto",width:"300px"}}>
                <div className="attributeContainer">
                    Strength:
                </div>
                {strength}
            </div>
            
            <div style={{display:"flex", margin:"auto",width:"300px"}}>
                <div className="attributeContainer">
                    Price:
                </div>
                {price}
            </div>
            
            <div style={{display:"flex", margin:"auto",width:"300px"}}>
                <div className="attributeContainer">
                    Number:
                </div>
                {number}
            </div>
           
            <Link to={`/weapons/${id}/update`}>Update Weapon</Link>
        </>
    )
}
export default WeaponDetail;