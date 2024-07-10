import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ArmorUpdate(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [defense, setDefense]=useState(0);
    const [number, setNumber]=useState(0);
    const [price, setPrice]=useState(0);
    const [imageURL, setImageURL]=useState("");
    const {id}=useParams();
    const navigate=useNavigate();
    const loadArmor=()=>{
        axios.get(`http://localhost:8080/armors/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setDefense(res.data.defense)
                setNumber(res.data.number)
                setPrice(res.data.price)
                setImageURL(res.data.imageURL)
            })
            .catch(err=>console.log(err))
    }
    
    const updateArmor=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/armors/${id}/update`, {
            name:name,
            description:description,
            defense:defense,
            number:number,
            price:price,
            imageURL:imageURL
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/armors/${id}`)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadArmor();
    },[])
    return(
        <>
            <h2>Update Armor</h2>
            <form onSubmit={updateArmor}>
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
                        <label>Defense:</label>
                    </div>
                    <input type="number" onChange={(e)=>setDefense(e.target.value)} value={defense}/>
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
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Image URL:</label>
                    </div>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)} value={imageURL}/>
                </div>
               
                <input type="submit" value="Update Armor"/>
            </form>
        </>
    )
}
export default ArmorUpdate;