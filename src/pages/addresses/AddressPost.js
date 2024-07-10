import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function AddressPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [source, setSource]=useState("")
    const [url, setUrl]=useState("")
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [images, setImages]=useState([])

    const postAddress=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/addresses/create", {
            name:name,
            description:description,
            source:source,
            url:url
        },{headers:authHeader()})
            .then(res=>{
                navigate(`/addresses/${res.data.id}`)
            })
            .catch(err=>console.log(err))
    }
    
    const loadImageList=()=>{
        axios.get("http://localhost:8080/files")
            .then(res=>{
                setImages(res.data)
            })
            .catch(err=>console.log(err))
    }

    const addAddress2=(imageId)=>{
        axios.post("http://localhost:8080/addresses/create",{
                
                url:imageId
            },{headers:authHeader()})
            .then(res=>
                {console.log("Image address has been added!")
                navigate(`/addresses/create`)}
            )
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadImageList();
    },[])

    return(
        <>
            <form onSubmit={postAddress}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Source:</label>
                    <input type="text" onChange={(e)=>setSource(e.target.value)}/>
                </div>
                <div>
                    <label>Url:</label>
                    <input type="text" onChange={(e)=>setUrl(e.target.value)}/>
                </div>
                <input type="submit" value="Post Address"/>
            </form>

            <div className="profile_wrap2">
                <div className="profile_grid1">
                <div className="labels">
                {images.length!=0?
                <>
                    <h2>Image List</h2>
         
                    <div className="rowTable">
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            {
                                images.map((image, i)=>(
                                <div key={i} style={{display:"block"}}>
                                    <Link to={`/images/${image.id}`}>
                                        <img style={{height:"150px", padding: "5px"}} src={image.url}/>
                                        </Link>
                                    
                                    <div>
                                        <button onClick={()=>addAddress2(image.id)}>Add Address2</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </>:
                <h2>Image List is Empty</h2>
            }
            {
                user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/images/create">Upload Image</Link>
                </div>:
                <></>
            }  
            </div>
            </div>
        </div>
        </>
    )
}
export default AddressPost;