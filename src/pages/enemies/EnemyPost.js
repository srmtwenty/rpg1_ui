import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function EnemyPost(){
    const [name, setName]=useState("");
    const [maxHp, setMaxHp]=useState(0);
    const [maxMp, setMaxMp]=useState(0);
    const [strength, setStrength]=useState(0);
    const [defense, setDefense]=useState(0);
    const [money, setMoney]=useState(0);
    const [description, setDescription]=useState("");
    const [exp, setExp]=useState(0);
    const [imageURL, setImageURL]=useState("")
    const navigate=useNavigate();
    const createEnemy=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/enemies/create", {
            name:name,
            maxHp:maxHp,
            hp:maxHp,
            maxMp:maxMp,
            mp:maxMp,
            strength:strength,
            defense:defense,
            money:money,
            description:description,
            exp:exp,
            imageURL:imageURL
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/enemies")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <form onSubmit={createEnemy}>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Name:</label>
                    </div>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Max Hp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMaxHp(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Max Mp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMaxMp(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Strength:</label>
                    </div>
                    <input type="number" onChange={(e)=>setStrength(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Defense:</label>
                    </div>
                    <input type="number" onChange={(e)=>setDefense(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Money:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMoney(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Exp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setExp(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Description:</label>
                    </div>
                    <textarea onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Image URL:</label>
                    </div>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)}/>
                </div>
                <input type="submit" value="Create Enemy"/>
            </form>
            
        
        </>
    )
}
export default EnemyPost;