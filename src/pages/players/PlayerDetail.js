import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function PlayerDetail(){
    const [name, setName]=useState("");
    const [age, setAge]=useState(0);
    const [gender, setGender]=useState(0);
    const [maxHp, setMaxHp]=useState(0);
    const [hp, setHp]=useState(0);
    const [mp, setMp]=useState(0);
    const [maxMp, setMaxMp]=useState(0);
    const [strength, setStrength]=useState(0);
    const [defense, setDefense]=useState(0);
    const [allArmors, setAllArmors]=useState([]);
    const [allWeapons, setAllWeapons]=useState([]);
    const [allItems, setAllItems]=useState([]);
    const [armor, setArmor]=useState(null);
    //const [armorId, setArmorId]=useState(-1);
    const [weapon, setWeapon]=useState(null);
    //const [weaponId, setWeaponId]=useState(-1);
    const [totalStrength, setTotalStrength]=useState(0);
    const [totalDefense, setTotalDefense]=useState(0);
    const [level, setLevel]=useState(0);
    const [exp, setExp]=useState(0);
    const [maxExp, setMaxExp]=useState(0);
    const [inventory, setInventory]=useState(null)
    const [inventoryId, setInventoryId]=useState(0)
    const [user, setUser]=useState(null)
    const [userId, setUserId]=useState(-1)
    const [allEnemies, setAllEnemies]=useState([]);
    const [allUsers, setAllUsers]=useState([])
    const [data, setData]=useState([])
    const [imageURL, setImageURL]=useState("")
    const [allPlayers, setAllPlayers]=useState([]);

    const {id}=useParams();
    const navigate=useNavigate();
    const currentUser=AuthService.getCurrentUser();
    const loadPlayer=()=>{
        axios.get(`http://localhost:8080/players/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setAge(res.data.age)
                setGender(res.data.gender)
                setMaxHp(res.data.maxHp)
                setMaxMp(res.data.maxMp)
                setHp(res.data.hp)
                setMp(res.data.mp)
                setStrength(res.data.strength)
                setDefense(res.data.defense)
                setArmor(res.data.armor)
                //setArmorId(res.data.armor.id)
                setWeapon(res.data.weapon)
                //setWeaponId(res.data.weapon.id)
                setTotalStrength(res.data.totalStrength)
                setTotalDefense(res.data.totalDefense)
                setLevel(res.data.level)
                setExp(res.data.exp)
                setMaxExp(res.data.maxExp)
                setUser(res.data.user)
                setUserId(res.data.user.id)
                //setUserId(res.data.user.id)
                setImageURL(res.data.imageURL)
                console.log(res.data)
                //setData(res)
                console.log(data)

            })
            .catch(err=>console.log(err))
    }

    const loadArmors=()=>{
        axios.get(`http://localhost:8080/inventories/${inventoryId}/armors`
        , {headers:authHeader()})
            .then(res=>{
                setAllArmors(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadWeapons=()=>{
        axios.get(`http://localhost:8080/inventories/${inventoryId}/weapons`
        , {headers:authHeader()})
            .then(res=>{
                setAllWeapons(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadItems=()=>{
        axios.get(`http://localhost:8080/inventories/${inventoryId}/items`
        , {headers:authHeader()})
            .then(res=>{
                setAllItems(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadEnemies=()=>{
        axios.get("http://localhost:8080/enemies"
        , {headers:authHeader()})
            .then(res=>{
                setAllEnemies(res.data)
            })
            .catch(err=>console.log(err))
    }
    
    const loadInventory=()=>{
        axios.get(`http://localhost:8080/users/${userId}/getInventory`
        , {headers:authHeader()})
            .then(res=>{
                setInventory(res.data)
                setInventoryId(res.data.id)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    
    const loadAllUsers=()=>{
        axios.get("http://localhost:8080/users"
        , {headers:authHeader()})
            .then(res=>{
                setAllUsers(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllPlayers=()=>{
        axios.get("http://localhost:8080/players"
            ,{headers:authHeader()})
                .then(res=>{
                    setAllPlayers(res.data)
                    console.log(res.data)
                })
                .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadPlayer()
        loadInventory()
        loadArmors() 
        loadEnemies()
        loadAllUsers()
        loadWeapons()
        loadItems()
        loadAllPlayers()
    },[userId, inventoryId])

    const equipWeapon=(weaponId)=>{
        axios.put(`http://localhost:8080/players/${id}/equipW/${weaponId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Weapon has been equipped!")
                window.location.reload();
                navigate(`/players/${id}`)
            }) 
            .catch(err=>console.log(err))
    }
    const removeWeapon=(weaponId)=>{
        axios.put(`http://localhost:8080/players/${id}/removeW/${weaponId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Weapon has been removed!")
                window.location.reload();
                navigate(`/players/${id}`)
            }) 
            .catch(err=>console.log(err))
    }

    const equipArmor=(armorId)=>{
        axios.put(`http://localhost:8080/players/${id}/equipA/${armorId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Armor has been equipped!")
                window.location.reload();
                navigate(`/players/${id}`)
            }) 
            .catch(err=>console.log(err))
    }
    const removeArmor=(armorId)=>{
        axios.put(`http://localhost:8080/players/${id}/removeA/${armorId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Armor has been removed!")
                window.location.reload();
                navigate(`/players/${id}`)
            }) 
            .catch(err=>console.log(err))
    }

    const betting=()=>{
        axios.put(`http://localhost:8080/players/${id}/betting`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/players/${id}`)
                console.log("wanna bet again?")
            })
            .catch(err=>console.log(err))
    }
    
    const recovery=()=>{
        axios.put(`http://localhost:8080/players/${id}/recovery`
        , {headers:authHeader()})
            .then(res=>{
                //window.location.reload();
                navigate(`/players/${id}`)
                setData([...data, "Ahh, slept well!", `${name} has been recovered!`, `${hp}`])
                //setData([...data, `${name}'s HP has been recovered!`])
                console.log(data)
            })
            .catch(err=>console.log(err))
    }
    
    const assignUser=(userId)=>{
        axios.put(`http://localhost:8080/players/${id}/assignUser/${userId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/players/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeUser=(userId)=>{
        axios.put(`http://localhost:8080/players/${id}/removeUser/${userId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/players/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div style={{border:"2px solid",display:"flex", justifyContent:"flex-start"}}>
            <div style={{width:"50%", border:"blue solid 2px", borderRadius:"10px", margin:"5px", padding:"10px"}}>
                <h2>{name} (LV: {level})</h2>

                {
                    inventoryId?
                    <>{inventoryId}</>
                    :<></>
                }
                <img src={`http://localhost:8080/files/${imageURL}`} style={{height:"200px"}}/>
                
                
                <div style={{margin:"auto", width:"60%", display:"flex", border:"2px none solid", padding:"10px"}}>
                    <div style={{textAlign:"left"}}>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Age:
                            </div>
                            {age}
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Gender:
                            </div>
                            {gender}
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Exp:
                            </div>
                            {exp}/{maxExp}
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                HP:
                            </div>
                            {hp}/{maxHp}
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                MP:
                            </div>
                            {mp}/{maxMp}
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Inventory:
                            </div>
                            <div className="attributeContainer">
                            {
                                inventory!=null?
                                    
                                        <Link to={`/inventories/${inventoryId}`}>
                                            {inventory.name} | money:{inventory.money}
                                        </Link>  
                                    
                                :<>Inventory is Empty</>
                            }</div>
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                User:
                            </div>
                            {
                                user!=null?
                                    <>
                                        <div className="attributeContainer">
                                            {user.username}(id:{user.id})
                                        </div>
                                        {
                                            currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                                            <>
                                                <button onClick={()=>removeUser(user.id)}>Remove</button>
                                            </>
                                            :<></>
                                        }
                                    </>
                                :<>User is empty</>
                            }
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Strength:
                            </div>
                            <div className="attributeContainer">
                                {totalStrength} 
                                ({strength} + 
                                    {
                                        weapon?
                                        <>{weapon.strength}</>:
                                        <>0</>
                                    }
                                )
                            </div>
                        </div>


                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Defense: 
                            </div>
                            <div className="attributeContainer">
                            {totalDefense} 
                                ({defense} + 
                                    {
                                        armor?    
                                        <>{armor.defense}</>:
                                        <>0</>
                                    })
                            </div>
                        </div>
                        
                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Weapon: 
                            </div>
                            
                            {
                                weapon?
                                <>
                                <div className="attributeContainer">
                                    {weapon.name} 
                                </div>
                                <button onClick={()=>removeWeapon(weapon.id)}>Un-Equip</button></>:
                                <>Un-equipped</>
                            }
                            
                        </div>

                        <div style={{display:"flex", margin:"auto",width:"300px"}}>
                            <div className="attributeContainer">
                                Armor:
                            </div>
                            
                            {
                                armor?
                                <>
                                    <div className="attributeContainer">
                                        {armor.name} 
                                    </div>
                                    <button onClick={()=>removeArmor(armor.id)}>Un-Equip</button>
                                </>:
                                <>Un-equipped</>
                            } 
                            
                        </div>
                        

                        <div style={{display:"flex", justifyContent:"space-between", margin:"auto", paddingTop:"50px"}}>
                            <div>
                                <button style={{backgroundColor:"cyan", borderRadius:"15px", padding:"10px"}} onClick={()=>betting()}>Betting(costs 200)</button>
                            </div>
                            <div>
                                <button style={{backgroundColor:"rgba(69, 181, 230)", borderRadius:"15px", padding:"10px"}} onClick={()=>recovery()}>Take a rest</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div style={{margin:"center",border:"blue solid 2px", borderRadius:"10px", padding:"10px",width:"50%", margin:"5px"}}>
            <div style={{padding:"10px"}}>  
                    <h2>Player List</h2>
                    {
                        allPlayers.length!=0?
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allPlayers.map((p, i)=>(
                                <tr key={i}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>
                                        {
                                            p.user?
                                            <>
                                                {p.user.username}(id:{p.user.id})
                                            </>
                                            :<>No User</>
                                        }
                                    </td>
                                    
                                    <td>
                                       
                                    </td>
                                </tr>    
                                ))
                            }
                            
                        </tbody>
                    </table>
                    </>:
                    <>Player List is Empty</>
                    }
                </div>
                
                
                
                <div style={{padding:"10px"}}>  
                    <h2>User List</h2>
                    {
                        allUsers.length!=0?
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Player?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers.map((au, i)=>(
                                <tr key={i}>
                                    <td>{au.id}</td>
                                    <td>{au.username}</td>
                                    <td>
                                        {
                                            au.player?
                                            <>
                                                {au.player.id}
                                            </>
                                            :<>null</>
                                        }
                                        
                                        
                                    
                                    </td>
                                    <td>
                                        {
                                            au.player!=null?
                                            <>Has player</>
                                            :<>No Player</>
                                        }
                                    </td>
                                    <td>
                                        {
                                            currentUser!=null && user!=null?
                                            <>
                                            {
                                                user.id!=au.id?
                                                <button onClick={()=>assignUser(au.id)}>Assign User</button>
                                                :<>Assigned</>
                                            }
                                            </>
                                            :<button onClick={()=>assignUser(au.id)}>Assign User</button> 
                                            
                                        }    
                                    </td>
                                </tr>    
                                ))
                            }
                            
                        </tbody>
                    </table>
                    </>:
                    <>User List is Empty</>
                    }
                </div>
                
                
                <div style={{padding:"10px"}}>
                
                    <h2>Weapon List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Strength</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allWeapons.map((aw, i)=>(
                                <tr key={i}>
                                    <td>{aw.id}</td>
                                    <td>{aw.name}</td>
                                    <td>{aw.strength}</td>
                                    <td>{aw.price}</td>
                                    <td>
                                        {
                                            weapon!=null?
                                            <>{
                                                weapon.id!=aw.id?
                                                <button onClick={()=>equipWeapon(aw.id)}>Equip</button>
                                                :<>Equipped</>
                                            }
                                            </>
                                            :<button onClick={()=>equipWeapon(aw.id)}>Equip</button>
                                            
                                        }
                                    </td>
                                </tr>    
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
                

                <div style={{padding:"10px"}}>
                <h2>Armor List</h2>
                {
                    allArmors.length!=0?
                    <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Defense</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allArmors.map((aa, i)=>(
                            <tr key={i}>
                                <td>{aa.id}</td>
                                <td>{aa.name}</td>
                                <td>{aa.defense}</td>
                                <td>{aa.price}</td>
                                <td>  
                                    {
                                        armor!=null?
                                        <>{
                                            armor.id==aa.id?
                                            <>Equipped</>
                                            :<button onClick={()=>equipArmor(aa.id)}>Equip</button>
                                        }
                                        </>:
                                        <button onClick={()=>equipArmor(aa.id)}>Equip</button>
                                    }
                                </td>
                            </tr>    
                            ))
                        }
                        
                    </tbody>
                </table>
                    :<>Armor List is Empty</>
                }
                    
                </div>

                <div style={{padding:"10px"}}>
                <h2>Item List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allItems.map((it, i)=>(
                                <tr key={i}>
                                    <td>{it.id}</td>
                                    <td>{it.name}</td>
                                
                                    <td>{it.price}</td>
                                    <td></td>
                                </tr>    
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
                            
            </div>

            
            </div>
            
            
        </>
    )
}
export default PlayerDetail;