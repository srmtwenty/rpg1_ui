import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
import '../style1.css';
import bgImg from "./pexels-photo-1797161.jpeg";
import bgImg2 from "./image_background.jpg";
import bgImg3 from "./image_background3.jpg";

function ColosseumDetail(){
    const [name, setName]=useState("");
    const [player, setPlayer]=useState(null)
    const [playerId, setPlayerId]=useState(0)
    const [playerHp, setPlayerHp]=useState(0)
    const [playerHpRemain, setPlayerHpRemain]=useState(0)
    const [playerStrength, setPlayerStrength]=useState(0)
    const [playerDefense, setPlayerDefense]=useState(0)
    
    const [inventory, setInventory]=useState(null)
    const [enemyHpRemain, setEnemyHpRemain]=useState(0)
    const [allEnemies, setAllEnemies]=useState([])
    const [enemy, setEnemy]=useState(null)
    const [enemyId, setEnemyId]=useState(0)
    const [data, setData]=useState([])
    const [test, setTest]=useState(0)
    const [maxTest, setMaxTest]=useState(5)
    const [bat, setBat]=useState(
        {fields:{
            test: test,
            maxTest: maxTest
        }
    })

    const [enemyName, setEnemyName]=useState("")
    const [enemyStrength, setEnemyStrength]=useState(0)
    const [enemyHp, setEnemyHp]=useState(0)
    const [enemyDefense, setEnemyDefense]=useState(0)
    const [enemyMaxHp, setEnemyMaxHp]=useState(0)
    
    const [inBattle, setInBattle]=useState(false)
    const [turn, setTurn]=useState(0)

    const {id}=useParams();
    const navigate=useNavigate();
    const currentUser=AuthService.getCurrentUser();
    
    const loadColosseum=()=>{
        axios.get(`http://localhost:8080/colosseums/${id}`
        , {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                console.log(currentUser)
                navigate(`/colosseums/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const loadPlayer=()=>{
        axios.get(`http://localhost:8080/users/${currentUser.id}/getPlayer`
        , {headers:authHeader()})
          .then(res=>{
            setPlayer(res.data)
            setPlayerId(res.data.id)
            setPlayerHp(res.data.hp)
            setPlayerHpRemain(res.data.hp)
            setPlayerStrength(res.data.totalStrength)
            setPlayerDefense(res.data.defense)
            console.log(res.data)
            console.log(currentUser)
          })
          .catch(err=>console.log(err))
      }
      const loadInventory=()=>{
        axios.get(`http://localhost:8080/users/${currentUser.id}/getInventory`
        , {headers:authHeader()})
            .then(res=>{
                setInventory(res.data)
                console.log(inventory)
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
    const loadEnemy=(enemyId)=>{
        axios.get(`http://localhost:8080/enemies/${enemyId}`
            , {headers:authHeader()})
                .then(res=>{
                    setEnemy(res.data)
                    setEnemyName(res.data.name)
                    setEnemyHp(res.data.hp)
                    setEnemyHpRemain(res.data.hp)
                    setEnemyMaxHp(res.data.maxHp)
                    setEnemyStrength(res.data.strength)
                    setEnemyDefense(res.data.defense)
                })
                .catch(err=>console.log(err))
        
    }
    useEffect(()=>{
        loadColosseum()
        loadPlayer()
        loadEnemies()
        loadEnemy(enemyId)
        loadInventory()
    },[test, maxTest, playerHp, enemyHp, enemyStrength, enemyDefense, enemyId])

    const battle=(playerId, enemyId)=>{
        //e.preventDefault()
        axios.put(`http://localhost:8080/players/${playerId}/battle/${enemyId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/colosseums/${id}`)
                
            })
            .catch(err=>console.log(err))
    }

    const battle2=(enemyId, enemy)=>{
        if(playerHp>0 || enemyHp>0){
            setBat({...bat, fields: {
                test: setPlayerHp(playerHp-(10-7)),
                
            }})
            console.log(bat)
            //setPlayerHp(playerHp-(enemy.strength-player.defense))
            //setEnemyHp(enemy.hp-(player.totalStrength-enemy.defense))
            setData([...data, `${player.name} has attacked!`, `${enemy.name} hp has dropped to ${enemy.hp}!`, "enemy has attacked!", `${player.name} hp has dropped to ${playerHp}`])
                if(player.hp<=0){
                    setData([...data, `${player.name} has lost!`])
                }
                if(enemy.hp<=0){
                    setData([...data, `${enemy.name} has lost!`, `${player.name} has won!`])
                }
        }else{
            axios.put(`http://localhost:8080/players/${playerId}/battle/${enemyId}`
        , {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                
                navigate(`/colosseums/${id}`)
                setData([...data, `${player.name} has attacked!`, `${enemy.name} has taken ${enemy.maxHp}-${enemy.hp} damages!`])
                if(player.hp<=0){
                    setData([...data, `${player.name} has lost!`])
                }
                if(enemy.hp<=0){
                    setData([...data, `${enemy.name} has lost!`, `${player.name} has won!`])
                }
            })
            .catch(err=>console.log(err))
        }    
    }

    const recovery=()=>{

        axios.put(`http://localhost:8080/players/${playerId}/recovery`
        , {headers:authHeader()})
            .then(res=>{
                //window.location.reload();
                navigate(`/colosseums/${id}`)
                setData([...data, "Ahh, slept well!", `${player.name} has been recovered!`, `${player.hp}`])
                //setData([...data, `${name}'s HP has been recovered!`])
                console.log(data)
            })
            .catch(err=>console.log(err))
    }


    const handleDamage2=()=>{
        setTurn(turn+1);
        if(turn!=0){
            setInBattle(true);
        }
        //enemy damage
        if(playerStrength-enemyDefense>0){
            console.log("enemy damage")
            //player 0 damage &&enemy defeated
            if(enemyHpRemain-(playerStrength-enemyDefense)<=0){
                setEnemyHpRemain(0)
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} has lost! `])
                console.log("Enemy has lost1!");
                setInBattle(false)
                battle(playerId, enemyId)
            }
            //player 0 damage && enemy survived
            else if(enemyHpRemain>0 && enemyStrength-playerDefense<=0){
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken 0 damages! `])
                console.log("Enemy survived!");
            }
            //player damage && enemy survived
            if(enemyHpRemain>0 && enemyStrength-playerDefense>0){
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])
                console.log("Enemy survived! Player has taken damages!");
            }
            if(enemyStrength-playerDefense>0 && playerHpRemain-(enemyStrength-playerDefense)<=0){
                setPlayerHpRemain(0)
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `, `${player.name} has lost!`])
                setInBattle(false)
                console.log("Player has lost!!");
                window.location.reload();
            }
        }
        if(playerStrength-enemyDefense<=0){
            console.log("enemy damage 0")
            //enemy 0 damage, player 0 damage
            if(enemyStrength-playerDefense<=0){
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages! `, `${enemyName} attacks! `,`${player.name} has taken 0 damages! `])
            }if(enemyStrength-playerDefense>0){
                //enemy 0 damage, player has damage
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages!`, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])
                
            }//player lost
            if(enemyStrength-playerDefense>0 && playerHpRemain-(enemyStrength-playerDefense)<=0){
                setPlayerHpRemain(0)
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages!`, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `,  `${player.name} has lost! `])
                setInBattle(false)
                console.log("Player has lost!!");
                window.location.reload();
            }
        }
    }

    /*
    const handleDamage=()=>{
        
        //enemy 0 damage
        if(playerStrength-enemyDefense<=0){
            console.log("enemy damage 0")
            //enemy 0 damage, player 0 damage
            if(enemyStrength-playerDefense<=0){
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages! `, `${enemyName} attacks! `,`${player.name} has taken 0 damages! `])
            }if(enemyStrength-playerDefense>0){
                //enemy 0 damage, player has damage
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages!`, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])
                
                
            }//player lost
            if(enemyStrength-playerDefense>0 && playerHpRemain-(enemyStrength-playerDefense)<=0){
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages!`, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `,  `${player.name} has lost! `])
            }
        }
        //enemy has damage, player 0 damage &&enemy defeated
        else if(playerStrength-enemyDefense>0 && enemyHpRemain-(playerStrength-enemyDefense)<=0 && enemyStrength-playerDefense<=0){
            console.log("Enemy damage")
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} has lost! `])
                console.log("Enemy has lost!");
                battle(playerId, enemyId)
        }

        else if(playerStrength-enemyDefense>0 && enemyHpRemain-(playerStrength-enemyDefense)>=0 && enemyStrength-playerDefense>0){
            //enemy survived   
            setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
            setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])
            console.log("Enemy has not lost yet!");
        }
                
            
            //enemy has damage, player has damage
        else if(playerStrength-enemyDefense>0 && enemyHpRemain-(playerStrength-enemyDefense)>=0 && enemyStrength-playerDefense>0){
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])   
            
        }  
    }*/

    /*
    const handleDamage=()=>{
        
        //enemy 0 damage
        if(playerStrength-enemyDefense<=0){
            console.log("enemy damage 0")
            //enemy 0 damage, player 0 damage
            if(enemyStrength-playerDefense<=0){
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages! `, `${enemyName} attacks! `,`${player.name} has taken 0 damages! `])
            }else{
                //enemy 0 damage, player has damage
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken 0 damages!`, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])
                //player lost
                if(playerHpRemain-(enemyStrength-playerDefense)<=0){
                    setData([...data, `${player.name} has lost! `]) 
                }
            }
        }
        //enemy has damage
        else if(playerStrength-enemyDefense>0){
            console.log("Enemy damage")
            //enemy has damage, player 0 damage &&enemy defeated
            if(enemyHpRemain-(playerStrength-enemyDefense)<=0 && enemyStrength-playerDefense<=0){
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} has lost! `])
                console.log("Enemy has lost!");
                battle(playerId, enemyId)
            }
            else if(enemyHpRemain-(playerStrength-enemyDefense)>=0 && enemyStrength-playerDefense>0){
                //enemy survived   
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])
                console.log("Enemy has not lost yet!");
            }
                
            
            //enemy has damage, player has damage
            else if(enemyHpRemain-(playerStrength-enemyDefense)>=0 && enemyStrength-playerDefense>0){
                setPlayerHpRemain(playerHpRemain-(enemyStrength-playerDefense))
                setEnemyHpRemain(enemyHpRemain-(playerStrength-enemyDefense))
                setData([...data, `${player.name} attacks! `,`${enemyName} has taken ${playerStrength-enemyDefense} damages! `, `${enemyName} attacks! `,`${player.name} has taken ${enemyStrength-playerDefense} damages! `])   
            }
        }
        
        
    }*/

    const handleChangeEnemy=(e)=>{
        e.preventDefault()
        setEnemyId(e.target.value)
        console.log(enemy)
        //loadEnemy(enemyId)
    }
    const handleTest=()=>{
        //setTest(test+1);
        //console.log(test)
        //setTest((test)=>1+test);
        //console.log(test)
        //setData([...data, `${test}`, `${test}`])
        setPlayerHp(playerHp-(enemy.strength-player.defense))
        setEnemyHp(enemy.hp-(player.totalStrength-enemy.defense))
        //setData([...data, `${player.name} has attacked!`, `${enemy.name} hp has dropped to ${enemy.hp}!`, "enemy has attacked!", `${player.name} hp has dropped to ${playerHp}`])
    }

    const recoverHp=()=>{
        setPlayerHpRemain(player.maxHp)
    }

    return(
        <>
            <div>
                
                {
                    player!=null?
                    <>
                        <h2>Welcome to {name}, Player {player.name}</h2>
                        <div style={{display:"flex", alignItems:"left"}}>
                            <Link to={`/colosseums/${id}/update`} style={{backgroundColor:"white", border:"1px solid", padding:"5px"}}>Edit Colosseum</Link>
                        </div>
                        

                        <div style={{boxShadow:"0 2px 5px 0", border:"4px solid", borderRadius:"1px", backgroundImage:`url(${bgImg3})`}}>
                            <div style={{backgroundColor:"rgba(240, 240, 240)", margin:"10px auto 10px auto", border:"2px gray solid", width:"700px", padding:"20px 0 20px 0"}}>

                            
                                <div className="container2">
                                    <div className="subContainer2">
                                        <h2>{player.name}</h2>
                                        <img src={`http://localhost:8080/files/${player.imageURL}`} style={{height:"150px"}}/>
                                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                            {
                                                playerHpRemain<=0?
                                                <h3 style={{color:"red"}}>HP: {playerHpRemain}/{player.maxHp}</h3>
                                                :<h3>HP: {playerHpRemain}/{player.maxHp}</h3>
                                            }
                                            <h3>MP: {player.mp}/{player.maxMp}</h3>
                                        </div>
                                        
                                    </div>

                                    <div style={{margin:"10px", padding: "100px 0", textAlign:"center"}}>
                                        <h2>VS</h2>
                                    </div>


                                    <div className="subContainer2">
                                        
                                        <div>
                                            <h2>
                                            {
                                                turn!==0?
                                                <select disabled id="enemy" name="enemy" onChange={handleChangeEnemy}>
                                                <option><h3>Select Enemy</h3></option>
                                                {
                                                    allEnemies.map((e, i)=>(
                                                        <option key={i} value={e.id}>{e.name}</option>
                                                    ))  
                                                }    
                                                </select>
                                                :<select id="enemy" name="enemy" onChange={handleChangeEnemy}>
                                                    <option><h3>Select Enemy</h3></option>
                                                    {
                                                        allEnemies.map((e, i)=>(
                                                            <option key={i} value={e.id}>{e.name}</option>
                                                        ))  
                                                    }    
                                                </select>
                                            }
                                            </h2>
                                        </div>
                                        {
                                            enemy!=null?
                                            <>
                                                
                                                <img src={`http://localhost:8080/files/${enemy.imageURL}`} style={{height:"150px"}}/>
                                                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                                    {
                                                        enemyHpRemain<=0?
                                                        <h3 style={{color:"red"}}>HP: {enemyHpRemain}/{enemyMaxHp}</h3>
                                                        :<h3>HP: {enemyHpRemain}/{enemyMaxHp}</h3>
                                                    }
                                                    
                                                    <h3>MP: {enemy.mp}/{enemy.maxMp}</h3>
                                                </div>
                                                
                                            </>
                                            :<></>
                                        }
                                </div>
                            
                            </div>

                            <div style={{border:"3px white solid", backgroundColor:"black", width: "670px", borderRadius:"10px", margin:"auto"}}>
                            {
                                data.length!=0?
                                <div className="container1">
                                {
                                    data.map((da, i)=>(
                                        <ul key={i}>
                                            <li className="narrative">{da}</li>
                                        </ul>
                                        
                                    ))
                                }
                                </div>
                                :<div style={{border:"2px white solid", margin:"auto", padding:"20px"}}>
                                    <h2 style={{color:"white"}}>Select your opponent and </h2>
                                    <h2 style={{color:"white"}}>Push 'Start Battle' to begin</h2>
                                </div>
                            }
                            </div>
                            <div style={{display:"flex", justifyContent:"space-between", margin:"auto", maxWidth:"30%"}}>

                                <div>
                                    {
                                        enemy!=null?
                                        <button onClick={()=>handleDamage2()} style={{backgroundColor:"cyan", borderRadius:"10px", padding:"5px"}}>Start Battle</button>
                                        :<button disabled style={{borderRadius:"10px", padding:"5px"}}>Start Battle</button>
                                    }
                                </div>
                            
                                {
                                    /*playerHpRemain<=0 || enemyHpRemain<=0?*/
                                    turn==0?
                                    <button onClick={()=>recoverHp()}  style={{backgroundColor:"rgba(69, 181, 230)", borderRadius:"10px", padding:"5px"}}>Take a rest</button>
                                    :<button disabled  style={{borderRadius:"10px", padding:"5px"}}>Take a rest</button>
                                }
                            </div>
                            </div>
                        </div>


                        <div style={{padding:"20px 0 0 0"}}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>                            
                                        <th>HP</th>
                                        <th>MP</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    allEnemies.map((ae, i)=>(
                                    <tr key={i}>
                                        <td><Link to={`/enemies/${ae.id}`}>{ae.id}</Link></td>
                                        <td>{ae.name}</td>
                                        <td>{ae.hp}/{ae.maxHp}</td>
                                        <td>{ae.mp}/{ae.maxMp}</td>
                                        <td>
                                           
                                        </td>
                                    </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        
                        </div>
                    </>
                    
                    :<h2>Player is required</h2>
                }
                
            </div>
        </>
    )
}
export default ColosseumDetail;