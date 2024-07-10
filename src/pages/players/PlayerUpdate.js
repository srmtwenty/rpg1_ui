import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function PlayerUpdate(){
    const [name, setName]=useState("");
    const [age, setAge]=useState(0);
    const [maxHp, setMaxHp]=useState(0);
    const [maxMp, setMaxMp]=useState(0);

    const [strength, setStrength]=useState(0);
    const [defense, setDefense]=useState(0);

    const [gender, setGender]=useState(0);
    const [imageURL, setImageURL]=useState("");
    const {id}=useParams();
    const navigate=useNavigate();
    const user=AuthService.getCurrentUser();
    const updatePlayer=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/players/${id}/update`, {
            name:name,
            age:age,
            gender:gender,
            maxHp:maxHp,
            hp:maxHp,
            maxMp:maxMp,
            mp:maxMp,
            strength:strength,
            defense:defense,
            imageURL:imageURL,
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/players/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const loadPlayer=()=>{
        axios.get(`http://localhost:8080/players/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setAge(res.data.age)
                setGender(res.data.gender)
                setMaxHp(res.data.maxHp)
                setMaxMp(res.data.maxMp)
                setStrength(res.data.strength)
                setDefense(res.data.defense)
                setImageURL(res.data.imageURL)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPlayer();
    },[])
    return(
        <>
            <form onSubmit={updatePlayer}>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Name:</label>
                    </div>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Age:</label>
                    </div>
                    <input type="number" onChange={(e)=>setAge(e.target.value)} value={age}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Gender:</label>
                    </div>
                    <select id="gender" name="gender" onChange={(e)=>setGender(e.target.value)}>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                    </select>
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
                        <label>ImageURL:</label>
                    </div>
                    
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)} value={imageURL}/>
                </div>
                <input type="submit" value="Update Player"/>
            </form>
            
        
        </>
    )
}
export default PlayerUpdate;