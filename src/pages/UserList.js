import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import Pagination from 'materialui-pagination-component';
//import { TablePagination } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function UserList(){
    const [users, setUsers]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

   
    const loadUsers=()=>{
        axios.get("http://localhost:8080/users", 
            {headers:authHeader()})
            .then(res=>{
                
                setTotal(res.data)
       
                //window.location.reload();
            })
            .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        loadUsers();
        loadUsersPagination();
 
        //window.location.reload();
    },[])

    const deleteUser=(id)=>{
        axios.delete(`http://localhost:8080/users/${id}/delete`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/users")
                
            })

            .catch(err=>console.log(err))
    }


    const loadUsersByName=(field)=>{
        axios.get(`http://localhost:8080/users/sort/${field}`
        , {headers:authHeader()})
            .then(res=>{
                
                setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadUsersPagination=()=>{
        axios.get(`http://localhost:8080/users/${page}/${rowsPerPage}/${field}`
        , {headers:authHeader()})
            .then(res=>{   
                
                setUsers(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        loadUsersPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        loadUsersPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        loadUsersPagination();
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {users.length!=0?
            <>
            <h2>User List</h2>
            <div className="labelsPost">
                    <div className="rowTable">
            <table>
                <thead>
                    <tr>
                        <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                        <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>(
                        <tr>
                            <td><Link to={`/users/${user.id}`}>{user.id}</Link></td>
                            <td>{user.name}</td>
                            <td>
                                <div className="tdButtonWrapper">
                                    <div className="tdButtonContainer1">
                                        <Link className="link" to={`/users/${user.id}/update`}>Edit</Link>    
                                    </div>
                                    <div className="tdButtonContainer2">
                                        <button onClick={()=>deleteUser(user.id)}>Delete</button>
                                    </div>
                                </div>    
                            </td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            <TablePagination 
                rowsPerPageOptions={[10, 25, 50]} 
                component="div"
                count={total.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} 
                onRowsPerPageChange={handleChangeRowsPerPage} 
               
            />
            </div>
            </div>
            </>:
                    <h2>User List is Empty</h2>
            }
            <div className="createLink">
                <Link className="link" to="/users/create">Post User</Link>
            </div>
            
            </div>
            </div>
        </>
    )
}
export default UserList;