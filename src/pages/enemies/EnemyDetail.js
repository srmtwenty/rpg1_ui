import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function EnemyDetail(){
    const [name, setName]=useState("");

    const [maxHp, setMaxHp]=useState(0);
    const [hp, setHp]=useState(0);
    const [mp, setMp]=useState(0);
    const [maxMp, setMaxMp]=useState(0);
    
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
                setExp(res.data.exp)
                setDescription(res.data.description)
                setImageURL(res.data.imageURL)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
        
    }
    useEffect(()=>{
        loadEnemy();
    },[])
    return(
        <>
            <div>
                <h2>Name: {name}</h2>
                <img src={`http://localhost:8080/files/${imageURL}`} style={{width:"200px"}}/>
                
                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>HP:</label>
                    </div>
                    {hp}/{maxHp}
                </div>
                
                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>MP:</label>
                    </div>
                    {mp}/{maxMp}
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Strength:</label>
                    </div>
                    {strength}
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Defense:</label>
                    </div>
                    {defense}
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Money:</label>
                    </div>
                    {money}
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Exp:</label>
                    </div>
                    {exp}
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Description:</label>
                    </div>
                    {description}
                </div>

            </div>
            <Link to={`/enemies/${id}/update`}>Update Enemy</Link>
        </>
    )
}
export default EnemyDetail;