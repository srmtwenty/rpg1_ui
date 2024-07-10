import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';


function PlayerPost(){
    const [name, setName]=useState("");
    const [age, setAge]=useState(0);
    const [maxHp, setMaxHp]=useState(0);
    const [maxMp, setMaxMp]=useState(0);
    const [strength, setStrength]=useState(0);
    const [defense, setDefense]=useState(0);
    //const [gender, setGender]=useState(0);
    const [level, setLevel]=useState(0)
    const [exp, setExp]=useState(0)
    const [maxExp, setMaxExp]=useState(0)
    const [imageURL, setImageURL]=useState("")

    const navigate=useNavigate();
    const createPlayer=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/players/create", {
            name:name,
            age:age,
            maxHp:maxHp,
            hp:maxHp,
            maxMp:maxMp,
            mp:maxMp,
            strength:strength,
            defense:defense,
            //gender:gender,
            totalStrength:strength,
            totalDefense:defense,
            exp:exp,
            maxExp:maxExp,
            level:level,
            imageURL:imageURL,
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/players")
            })
            .catch(err=>console.log(err))
    }
    /*
    <select id="gender" name="gender" onChange={(e)=>setGender(e.target.value)}>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                    </select>*/
    return(
        <>
            <h2>Create Player</h2>
            <form onSubmit={createPlayer}>
                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Name:</label>
                    </div>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Age:</label>
                    </div>
                    <input type="number" onChange={(e)=>setAge(e.target.value)}/>
                </div>

                <div className="lineKeyVal">
                    <label>Gender:</label>
                    
                    
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
                        <label>Level:</label>
                    </div>
                    <input type="number" onChange={(e)=>setLevel(e.target.value)}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Exp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setExp(e.target.value)}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>Max Exp:</label>
                    </div>
                    <input type="number" onChange={(e)=>setMaxExp(e.target.value)}/>
                </div>

                <div className="lineKeyVal">
                    <div className="attributeContainer">
                        <label>ImageURL:</label>
                    </div>
                    <input type="text" onChange={(e)=>setImageURL(e.target.value)}/>
                </div>
                <input type="submit" value="Create Player"/>
            </form>
        </>
    )
}
export default PlayerPost;