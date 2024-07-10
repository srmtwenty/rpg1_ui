import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ArmorDetail(){
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
                navigate(`/armors/${id}`)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadArmor()
    },[])
    return(
        <>
            <h2>Name: {name}</h2>
            <img src={`http://localhost:8080/files/${imageURL}`} style={{width:"200px"}}/>
            <div style={{margin:"auto"}}>

                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Description:</label>
                    </div>
                    {description} 
                </div>
                
                
                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Defense:</label>
                    </div>
                    {defense}
                </div>
                
                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Number:</label>
                    </div>
                    {number}
                </div>
                
                
                <div className="lineKeyVal">
                    <div className="attributeContainer2">
                        <label>Price:</label>
                    </div>
                    {price}
                </div>
            </div>
            <Link to={`/armors/${id}/update`}>Update Armor</Link>
        </>
    )
}
export default ArmorDetail;