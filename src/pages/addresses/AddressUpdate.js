import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function AddressUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [url, setUrl]=useState("")
    const [source, setSource]=useState("")
    
    const [swimsuits, setSwimsuits]=useState([])
    const navigate=useNavigate();
    const {id}=useParams();

    const updateAddress=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/addresses/${id}/update`,{
            name:name,
            description:description,
            source:source,
            url:url
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const loadAddress=()=>{
        axios.get(`http://localhost:8080/addresses/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setSource(res.data.source)
                setUrl(res.data.url)
            })
            .catch(err=>console.log(err))
    }

    const loadImages=()=>{
        axios.get("http://localhost:8080/files", {headers:authHeader()})
            .then(res=>
                setSwimsuits(res.data)
            )
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadAddress();
        loadImages();
    },[])
    return(
        <>
            <form onSubmit={updateAddress}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div>
                    <label>Source:</label>
                    <input type="text" onChange={(e)=>setSource(e.target.value)} value={source}/>
                </div>
                <div>
                    <label>Url:</label>
                    <input type="text" onChange={(e)=>setUrl(e.target.value)} value={url}/>
                </div>
                <input type="submit" value="Post Address"/>
            </form>
            
            <div className="profile_grid1">
            {
                swimsuits.length!=0?
                <>
                <h2>Swimsuit List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Content</th>
                                
                              
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    swimsuits.map((ss, i)=>
                                    <tr key={i}>
                                        <td><Link to={`/swimsuits/${ss.id}`}>{ss.id}</Link></td>
                                        <td>{ss.name}</td>
                                        <td>
                                        <img src={`http://localhost:8080/files/${ss.name}`} style={{width:"300px"}}/>
                                        </td>
                                        
                                    </tr>    
                                    )
                                }
                            </tbody>
                        </table>
                        
                </div>
            </>:
            
                    <h2>Swimsuit List is Empty</h2>
            
            }
            
            
            
            </div>
        </>
    )
}
export default AddressUpdate;