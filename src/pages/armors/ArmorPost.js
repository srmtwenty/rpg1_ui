import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ArmorPost(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [defense, setDefense]=useState(0);
    const [number, setNumber]=useState(1);
    const [price, setPrice]=useState(0);
    const [imageURL, setImageURL]=useState("")
    const navigate=useNavigate();
    const createArmor=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/armors/create", {
            name:name,
            description:description,
            defense:defense,
            number:number,
            price:price,
            imageURL:imageURL
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/armors")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <form onSubmit={createArmor}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Defense:</label>
                    <input type="number" onChange={(e)=>setDefense(e.target.value)}/>
                </div>
                <div>
                    <label>Number:</label>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)}/>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)}/>
                </div>
               
                <input type="submit" value="Create Armor"/>
            </form>
        </>
    )
}
export default ArmorPost;