import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function EnemyUpdate(){
    const [name, setName]=useState("");
    const [maxHp, setMaxHp]=useState(0);
    const [maxMp, setMaxMp]=useState(0);
    const [hp, setHp]=useState(0);
    const [mp, setMp]=useState(0);
    const [strength, setStrength]=useState(0);
    const [defense, setDefense]=useState(0);
    const [money, setMoney]=useState(0);
    const [description, setDescription]=useState("");
    const [exp, setExp]=useState(0)
    const [imageURL, setImageURL]=useState("")

    const {id}=useParams();
    const navigate=useNavigate();

    const loadEnemy=()=>{
        axios.get(`http://localhost:8080/enemies/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setMaxHp(res.data.maxHp)
                setMaxMp(res.data.maxMp)
                setHp(res.data.hp)
                setMp(res.data.mp)
                setStrength(res.data.strength)
                setDefense(res.data.defense)
                setMoney(res.data.money)
                setDescription(res.data.description)
                setExp(res.data.exp)
                setImageURL(res.data.imageURL)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
        
    }
    useEffect(()=>{
        loadEnemy();
    },[])
    const updateEnemy=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/enemies/${id}/update`, {
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
            <h2>Update Enemy</h2>
            <form onSubmit={updateEnemy}>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Name:</label>
                    </div>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Max Hp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMaxHp(e.target.value)} value={maxHp}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Max Mp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMaxMp(e.target.value)} value={maxMp}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Strength:</label>
                    </div>
                    <input type="number" onChange={(e)=>setStrength(e.target.value)} value={strength}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Defense:</label>
                    </div>
                    <input type="number" onChange={(e)=>setDefense(e.target.value)} value={defense}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Money:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMoney(e.target.value)} value={money}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Exp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setExp(e.target.value)} value={exp}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Description:</label>
                    </div>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Image URL:</label>
                    </div>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)} value={imageURL}/>
                </div>
                <input type="submit" value="Update Enemy"/>
            </form>  
        </>
    )
}
export default EnemyUpdate;