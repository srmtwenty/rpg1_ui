import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ColosseumUpdate(){
    const [name, setName]=useState("");
    
    const {id}=useParams();
    const navigate=useNavigate();
    const loadColosseum=()=>{
        axios.get(`http://localhost:8080/colosseums/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                
            })
            .catch(err=>console.log(err))
    }
    
    const updateColosseum=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/colosseums/${id}/update`, {
            name:name
            
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/colosseums/${id}`)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadColosseum();
    },[])
    return(
        <>
            <form onSubmit={updateColosseum}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <input type="submit" value="Update Colosseum"/>
            </form>
        </>
    )
}
export default ColosseumUpdate;