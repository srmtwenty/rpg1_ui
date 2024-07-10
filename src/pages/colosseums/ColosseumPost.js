import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ColosseumPost(){
    const [name, setName]=useState("");
    
    const navigate=useNavigate();
    const createColosseum=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/colosseums/create", {
            name:name
            
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/colosseums")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <form onSubmit={createColosseum}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                
                <input type="submit" value="Create Colosseum"/>
            </form>
        </>
    )
}
export default ColosseumPost;