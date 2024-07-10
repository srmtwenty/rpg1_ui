import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';            
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function ImageList(){
    const [images, setImages]=useState([]);

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const [file, setFile]=useState(null);
    //const [description, setDescription]=useState("");
    const navigate=useNavigate()

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    let axiosConfig={
        headers: {
            
            'content-type': 'multipart/form-data'
        }
    }
    const onFormSubmit=(e)=>{
        e.preventDefault();
        //file.description=description;
        var postData=new FormData();
        //var input = document.querySelector('input[type="file"]')

        postData.append('file', file)
        console.log(postData)
        //var data = new FormData()
        //data.append('file', input.files[0])
        //console.log(data);
        
        axios.post("http://localhost:8080/files/upload", postData, {headers:authHeader()},axiosConfig)
            .then(res=>{
                setFile(res.data)
                window.location.reload();
                console.log(res.data)
                navigate("/images")
            })
            .catch(err=>console.log(err))
    }

    const loadImages=()=>{
        axios.get('http://localhost:8080/files',{headers:authHeader()})
            .then(res=>{
                setImages(res.data)
                console.log(res.data)
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
        loadImages()
        //loadImagesPagination()
    },[])

    const deleteImage=(id)=>{
        axios.delete(`http://localhost:8080/files/${id}/delete`,{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/images")
            })
            .catch(err=>console.log(err))
    }
    const loadImagesPagination=()=>{
        axios.get(`http://localhost:8080/files/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setImages(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadRoutinesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadRoutinesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }
    return(
        <>
            <div className="profile_wrap2">
            <h2>Image List</h2>
            

            {
                loadComplete!=true?
                <><h2>Now Loading</h2></>
                :<>

            <div className="profile_grid1">
                <div className="labels">
                {
                    noData!=true?
                    <>
                        
                        <div className="rowTable">
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {
                                    images.map((image, i)=>(
                                    <div key={i} style={{display:"block"}}>
                                        <Link to={`/images/${image.id}`}>
                                            <img style={{height:"150px", padding: "5px"}} src={image.url}/>
                                            </Link>
                                        
                                        <div>
                                            <button onClick={()=>deleteImage(image.id)}>Delete Image</button>
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
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="profile_grid1">
                    <h2>Upload Image</h2>
                    <div className="labelsPost">
                        <form onSubmit={onFormSubmit} className="form">
                            <div className="row2">
                                
                                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Upload File"/>
                                </div>
                            </div>
                        
                        </form>
                    </div>
                </div>
                :<></>
            }
                {
                    user && user.roles.includes("ROLE_ADMIN")?
                    <div className="createLink">
                        <Link className="link" to="/images/create">Upload Image</Link>
                    </div>:
                    <></>
                }  
                </div>
            </div>
            </>
            }
            
        </div>
        </>
    )
}

export default ImageList;