import axios from 'axios'
import { useEffect, useState } from 'react'
import UserContextHook from '../Hooks/user.hook'
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'

export function TransactionPage() {
        const {user} = UserContextHook()
        const [type, setType] = useState()   
        const [amount, setAmount] = useState()
        const [descript, setDescript] = useState("")
        const navigate = useNavigate()
       
     
        useEffect(() => {
                setType(window.location.pathname.split('/')[2]);
        }, []);
     
     
        const saveMovement = (e)=>{
        e.preventDefault()
        
        if(type && amount && descript){
                try {
                        const URL ="https://mywalletback-p0ll.onrender.com/home"
                        
                        const body ={amount,descript,type}
                       
                        const config = {
                                headers: {
                                    "Authorization": `Bearer ${user.token}`
                                }
                            }
        
                        const promise= axios.post(URL , body, config)
                        promise.then(res=>{
                        console.log(res.data)
                        navigate("/home") 
                        })
        
                        promise.catch(err=>{
                        alert(err.response.data.message)
                        })
        
                }catch(err){console.log(err.message)}
        
        }
     

        } 
        
       
       
        return (

                <>
                        <h1>Nova TRANSAÇÃO</h1>
                        <form>
                                <input
                               
                                type="number" 
                                value={amount}
                                placeholder="valor"
                                required
                                onChange={e=>setAmount(e.target.value)} 

                                />
                                <input 
                                        
                                    
                                        type="text" 
                                        value={descript}
                                        placeholder="descrição"
                                        required
                                        onChange={e=>setDescript(e.target.value)}
                                />
                                
                                <button onClick= {(e)=>saveMovement(e)} type="submit" >Salvar TRANSAÇÃO</button>
                        </form>
                </>

        )


}

export default TransactionPage