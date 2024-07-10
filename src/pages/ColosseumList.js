import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function ColosseumList(){
    const [colosseums, setColosseums]=useState([])
    const [currentPlayer, setCurrentPlayer]=useState(null)
    const navigate=useNavigate();
    const currentUser=AuthService.getCurrentUser();

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const loadColosseums=()=>{
        axios.get("http://localhost:8080/colosseums"
        , {headers:authHeader()})
            .then(res=>{
                setColosseums(res.data)
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
                setLoadComplete(true)
                console.log(loadComplete)
            })
    }
    
      
    useEffect(()=>{
        loadColosseums();
        
    }, [])
    const deleteColosseum=(id)=>{
        axios.delete(`http://localhost:8080/colosseums/${id}/delete`
            , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/colosseums`)
                console.log("Colosseum has been deleted!")
            })
            .catch(err=>console.log(err))
    }

    
    return(
        <>
            <div className="profile_wrap2">
            <h2>Colosseum List</h2>
            {
                loadComplete!=true?
                <><h2>Now Loading</h2></>
                :<>
                    
            {
                noData!=true?
                <div className="rowTable">
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
                                colosseums.map((col, index)=>(
                                    <tr key={index}>
                                        <td><Link to={`/colosseums/${col.id}`}>{col.id}</Link></td>
                                        
                                        <td>{col.name}</td>
                                      
                                        <td>
                                            
                                            <button onClick={()=>deleteColosseum(col.id)}>Delete Colosseum</button>
                                        </td>
                                    </tr>
                                ))   
                            }
                        </tbody>
                    </table>
                
                </div>
                :<><h2>Loading</h2></>
                }
                </>
            }

            {
                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                <>
                    <Link to="/colosseums/create">Post Colosseum</Link>
                </>
                :<></>
            }
            </div>
        </>
    )
}
export default ColosseumList;