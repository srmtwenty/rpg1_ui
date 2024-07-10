import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function AddressDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [source, setSource]=useState("")
    const [url, setUrl]=useState("")
    const [people, setPeople]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allImages, setAllImages]=useState([])

    const [routine, setRoutine]=useState(1)
    const [allRoutines, setAllRoutines]=useState([])
    const navigate=useNavigate();
    const {id}=useParams();
    const user=AuthService.getCurrentUser();

    const loadAddress=()=>{
        axios.get(`http://localhost:8080/addresses/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setRoutine(res.data.routine)
                setSource(res.data.source)
                setUrl(res.data.url)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadPeople=()=>{
        axios.get(`http://localhost:8080/addresses/${id}/people`, {headers:authHeader()})
        .then(res=>{
            setPeople(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people")
            .then(res=>{
                setAllPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllRoutines=()=>{
        axios.get("http://localhost:8080/routines")
            .then(res=>{
                setAllRoutines(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllImages=()=>{
        axios.get("http://localhost:8080/files", {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setAllImages(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadAddress();
        loadPeople();
        loadAllPeople();
        loadAllRoutines();
    },[])

    const assignRoutine=(routineId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/setRoutine/${routineId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Routine has been added!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/addPerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Image Address Detail</h2>

            <p>Id: {id}</p>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>URL: {url}</p>
            <p>Source: {source}</p>
            <div className="row2">
                <span className="label">Routine: </span>
                <span className="value">
                {
                    routine?
                    <><Link to={`/routines/${routine.id}`}>{routine.name}</Link>
                        
                    </>:
                    <>Null</>
                }
                </span>
            </div>
            <img src={`http://localhost:8080/files/${url}`} style={{width:"500px"}}/>

            <div className="row2">
                <span className="label2">People:</span>  
            </div>
            <div className="rowTable">
                            {
                            people.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        people.map((p, i)=>(
                                        <tr key={i}>
                                            <td>
                                                <Link to={`/people/${p.id}`}>
                                                    {p.id}
                                                </Link></td>
                                            <td>{p.name}</td>
                                            
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>People List is Empty</p>
                            } 
                            </div> 

            
                            <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                                <div className="postDetail">
                                    <Link className="link" to="/people/create">Post Person</Link>
                                </div>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/people">Back to List</Link>  
                                    </div>
                                    <div className="backToDetail">
                                        <Link className="link" to={`/people/${id}/update`}>Update</Link>
                                    </div>
                                    
                                </div>
                            </>:
                            <>
                                <div className="backToDetail">
                                    <Link className="link" to="/people">Back to List</Link>  
                                </div>
                            </>
                        }    
                    </div>



                    <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                                <div className="postDetail">
                                    <Link className="link" to="/addresses/create">Post Address</Link>
                                </div>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/addresses">Back to List</Link>  
                                    </div>
                                    <div className="backToDetail">
                                        <Link className="link" to={`/addresses/${id}/update`}>Update</Link>
                                    </div>
                                </div>
                            </>:
                            <>
                                <div className="backToDetail">
                                    <Link className="link" to="/addresses">Back to List</Link>  
                                </div>
                            </>
                        }
                    </div>


            <div className="profile_grid1">
                    <h2>All People</h2>
                        <div className="labels">
                            <div className="rowTable">
                            {
                            allPeople.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allPeople.map((ap, i)=>(
                                        <tr key={i}>
                                            <td>{ap.id}</td>
                                            <td><Link to={`/people/${ap.id}`}>{ap.name}</Link></td>
                                        
                                            <td>
                                                <button onClick={()=>addPerson(ap.id)}>Add Person</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>All People List is Empty</p>
                            } 
                            </div>
                        </div>
                    </div>

                    

                    <div className="profile_grid1">
                    <h2>All Routines</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                            allRoutines.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRoutines.map((ar, i)=>(
                                        <tr key={i}>
                                            <td>{ar.id}</td>
                                            <td><Link to={`/routines/${ar.id}`}>{ar.name}</Link></td>
                                            <td>
                                                <button onClick={()=>assignRoutine(ar.id)}>Assign Routine</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>All Routine List is Empty</p>
                            } 
                            </div>
                        </div>
                    </div>    
        </>
    )
}
export default AddressDetail;