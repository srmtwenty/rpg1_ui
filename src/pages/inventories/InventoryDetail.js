import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function InventoryDetail(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("")
    const [player, setPlayer]=useState(null)
    const [playerWeapon, setPlayerWeapon]=useState(null)

    const [armors, setArmors]=useState([]);
    const [playerArmor, setPlayerArmor]=useState(null)
    const [items, setItems]=useState([]);
    const [weapons, setWeapons]=useState([]);
 
    const [allPlayers, setAllPlayers]=useState([]);   
    const [money, setMoney]=useState(0);
    const currentUser=AuthService.getCurrentUser();
    const [user, setUser]=useState(null)

    const {id}=useParams();
    const navigate=useNavigate();
    const loadInventory=()=>{
        axios.get(`http://localhost:8080/inventories/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setMoney(res.data.money)
                //setPlayer(res.data.player)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadArmors=()=>{
        axios.get(`http://localhost:8080/inventories/${id}/armors`
        , {headers:authHeader()})
            .then(res=>{
                setArmors(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadWeapons=()=>{
        axios.get(`http://localhost:8080/inventories/${id}/weapons`
        , {headers:authHeader()})
            .then(res=>{
                setWeapons(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadItems=()=>{
        axios.get(`http://localhost:8080/inventories/${id}/items`
        , {headers:authHeader()})
            .then(res=>{
                setItems(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadUser=()=>{
        axios.get(`http://localhost:8080/inventories/${currentUser.id}/getUser`
        , {headers:authHeader()})
            .then(res=>{
                setUser(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadPlayer=()=>{
        axios.get(`http://localhost:8080/inventories/${id}/getPlayer`
        , {headers:authHeader()})
            .then(res=>{
                setPlayer(res.data)
                setPlayerWeapon(res.data.weapon)
                setPlayerArmor(res.data.armor)
                setUser(res.data.user)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }

    const loadAllPlayers=()=>{
        axios.get("http://localhost:8080/players"
        , {headers:authHeader()})
            .then(res=>{
                setAllPlayers(res.data)
            })
            .catch(err=>console.log(err))

    }

    useEffect(()=>{
        loadInventory()
        loadArmors()
        loadWeapons()
        loadItems()
        loadAllPlayers()
        {
            currentUser?
            <>
                loadUser()
            </>
            :<></>
        }
        
        loadPlayer()
    },[])
    const assignPlayer1=(playerId)=>{
        axios.put(`http://localhost:8080/inventories/${id}/assignPlayer/${playerId}`
        ,{headers:authHeader()})
            .then(res=>{
                console.log("Player has been set")
                window.location.reload();
                navigate(`inventories/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignPlayer2=(playerId)=>{
        axios.put(`http://localhost:8080/inventories/${id}/assignPlayer/${playerId}`
        ,{headers:authHeader()})
            .then(res=>{
                console.log("Player has been set")
                window.location.reload();
                navigate(`inventories/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removePlayer=(playerId)=>{
        axios.put(`http://localhost:8080/inventories/${id}/removePlayer/${playerId}`
        ,{headers:authHeader()})
            .then(res=>{
                console.log("Player has been removed")
                window.location.reload();
                navigate(`inventories/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const equipWeapon=(weaponId)=>{
        axios.put(`http://localhost:8080/players/${id}/equipW/${weaponId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Weapon has been equipped!")
                window.location.reload();
                navigate(`/inventories/${id}`)
            }) 
            .catch(err=>console.log(err))
    }
    const removeWeapon=(weaponId)=>{
        axios.put(`http://localhost:8080/players/${id}/removeW/${weaponId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Weapon has been removed!")
                window.location.reload();
                navigate(`/inventories/${id}`)
            }) 
            .catch(err=>console.log(err))
    }

    const equipArmor=(armorId)=>{
        axios.put(`http://localhost:8080/players/${id}/equipA/${armorId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Armor has been equipped!")
                window.location.reload();
                navigate(`/inventories/${id}`)
            }) 
            .catch(err=>console.log(err))
    }
    const removeArmor=(armorId)=>{
        axios.put(`http://localhost:8080/players/${id}/removeA/${armorId}`
        , {headers:authHeader()})
            .then(res=>{
                console.log("Armor has been removed!")
                window.location.reload();
                navigate(`/inventories/${id}`)
            }) 
            .catch(err=>console.log(err))
    }

    const purchaseArmor=(armorId)=>{
        axios.put(`http://localhost:8080/inventories/${id}/purchaseArmor/${armorId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/armors`)
                console.log("Armor has been purchased!")
            })
            .catch(err=>console.log(err))
    }
    const purchaseWeapon=(weaponId)=>{
        axios.put(`http://localhost:8080/inventories/${id}/purchaseWeapon/${weaponId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/weapons`)
                console.log("Weapon has been purchased!")
            })
            .catch(err=>console.log(err))
    }
    const purchaseItem=(itemId)=>{
        axios.put(`http://localhost:8080/inventories/${id}/purchaseItem/${itemId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/items`)
                console.log("Item has been purchased!")
            })
            .catch(err=>console.log(err))
    }

    

    
    return(
        <>
            <div className="profile_wrap2">
            <h2>Inventory: {name}</h2>
            <div style={{display:"flex", justifyContent:"flex-start", margin:"auto", width:"90%"}}>
                
                <div style={{width:"50%", border:"blue solid 2px", borderRadius:"10px",backgroundColor:"rgba(245, 245, 245)", margin:"5px", padding:"10px"}}>
                    
                    <h3>Player Info
                        (User:
                            {
                                user!=null?
                                <> {user.username}</>
                                :<>  User is Empty</>
                            }  
                        )
                    </h3>
                    
                    <div style={{margin:"auto", width:"50%", display:"flex"}}>
                        
                        <div style={{textAlign:"left"}}>
                            {
                                player?
                                <div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>
                                        <div className="attributeContainer2">
                                            Player:
                                        </div>    
                                            <Link to={`/players/${player.id}`}>
                                                {player.name} (LV {player.level})
                                            </Link>
                                        
                                    </div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}> 
                                        <div className="attributeContainer2">
                                            HP: 
                                        </div>
                                        {player.hp}/{player.maxHp}
                                    </div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>  
                                        <div className="attributeContainer2">
                                            MP:
                                        </div>
                                        {player.mp}/{player.maxMp}
                                    </div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>   
                                        <div className="attributeContainer2">
                                            Money: 
                                        </div>
                                        {money}
                                    </div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>   
                                        <div className="attributeContainer2">
                                            Strength:
                                        </div>
                                            {player.totalStrength}
                                            ({player.strength} +
                                                {
                                                    player.weapon!=null?
                                                    <div style={{color:"green"}}> {player.weapon.strength}</div>
                                                    :<> 0</>
                                                }
                                            )
                                    </div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>
                                        <div className="attributeContainer2">
                                            Defense: 
                                        </div>
                                            {player.totalDefense}
                                            ({player.defense} + 
                                                {
                                                    player.armor!=null?
                                                    <div style={{color:"green"}}> {player.armor.defense}</div>
                                                    :<> 0</>
                                                }
                                            )
                                    </div>
                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>
                                        <div className="attributeContainer2">
                                            Weapon:
                                        </div>
                                        <>
                                        {
                                            playerWeapon!=null?
                                            <>
                                                <Link to={`/weapons/${playerWeapon.id}`} className="valueContainer2">{playerWeapon.name}</Link>

                                                {
                                                    currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                                                    <>
                                                        <button onClick={()=>removeWeapon(playerWeapon.id)}>
                                                            Un-equip
                                                        </button>
                                                    </>
                                                    :<></>
                                                }
                                                
                                            </>
                                            :<> Un-equipped</>
                                        }</>

                                    </div>

                                    <div style={{display:"flex", margin:"auto",width:"300px"}}>
                                        <div className="attributeContainer2">
                                            Armor: 
                                        </div>
                                    <>
                                        {
                                            player.armor!=null?
                                            <>
                                                <Link to={`/armors/${playerArmor.id}`} className="valueContainer2">{player.armor.name}</Link>
                                                {
                                                    currentUser && currentUser.roles.includes("ROLE_ADMIN" || "ROLE_USER")?
                                                    <>
                                                        <button onClick={()=>removeArmor(playerArmor.id)}>
                                                            Un-equip
                                                        </button>
                                                    </>
                                                    :<></>
                                                }
                                            </>
                                            :<> Un-equipped</>
                                        }
                                    </>

                                    </div>
                                </div>
                                :<> No Player</>
                            }
                            </div>
                        

                    </div>
                    
                </div>      
                    



                <div style={{width:"50%",backgroundColor:"rgba(245, 245, 245)"}}> 
                    <div style={{border:"solid 2px", borderRadius:"10px",height:"200px", margin:"5px", padding:"10px"}}>
                        <h3>Weapon List</h3>
                        {
                            weapons.length!=0?
                                weapons.map((w, i)=>(
                                    w.number!=0?
                                        <div style={{display:"flex", margin:"auto",width:"260px"}} key={i}>
                                            <div className="attributeContainer">
                                                <Link to={`/weapons/${w.id}`}>
                                                    {w.name} x {w.number}
                                                </Link>
                                            </div>
                                            
                                            {
                                                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                                                <div className="valueContainer">{
                                                    playerWeapon && playerWeapon.id==w.id?
                                                    
                                                    
                                                    <>Equipped</>
                                                    :<>
                                                        
                                                        <button onClick={()=>equipWeapon(w.id)}>Equip</button> 
                                                    </>
                                                    }
                                                </div>:
                                                <></> 
                                            }
                                        </div>
                                    :<></> 
                                ))
                            :
                            <>Weapon List is Empty</>
                        }    
                    </div>
                    
                    <div style={{border:"solid 2px", borderRadius:"10px", height:"200px",backgroundColor:"rgba(245, 245, 245)", margin:"5px", padding:"10px"}}>
                        <h3>Armor List</h3>
                        {
                            armors.length!=0?
                            
                                armors.map((a, i)=>(
                                        <div style={{display:"flex", margin:"auto",width:"260px"}} key={i}>
                                            <div className="attributeContainer">
                                                <Link to={`/armors/${a.id}`}>
                                                    {a.name}
                                                </Link> x {a.number}
                                            </div>
                                            {
                                                currentUser && currentUser.roles.includes("ROLE_ADMIN")?
                                                <div className="valueContainer">{
                                                    playerArmor && playerArmor.id==a.id?
                                                    <>Equipped</>
                                                    :<>
                                                        
                                                        <button onClick={()=>equipArmor(a.id)}>Equip</button>
                                                    </>
                                                }
                                                </div>:
                                                <></>
                                            }
                                            
                                        </div>
                                ))
                            :
                            <>Armor List is Empty</>
                        }    
                    </div>
                    
                    
                    <div style={{border:"solid 2px", borderRadius:"10px",height:"200px", backgroundColor:"rgba(245, 245, 245)", margin:"5px", padding:"10px"}}>
                        <h3>Item List</h3>
                        {
                            items.length!=0?
                                
                                items.map((item, i)=>(
                                    
                                    item.number!=0?
                                        <div key={i}>
                                            <Link to={`/items/${item.id}`}>{item.name} x {item.number}</Link>
                                        </div>
                                    :<></> 
                                
                                ))
                            :
                            <>Item List is Empty</>
                        }    
                    </div>
                    
                </div>

            </div>


            </div>
        </>
    )
}
export default InventoryDetail;