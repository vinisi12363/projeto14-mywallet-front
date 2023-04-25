import axios from 'axios'
import { useEffect, useState } from 'react'
import UserContextHook from '../Hooks/user.hook'
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'
import styled from 'styled-components';

export function TransactionPage() {
        const {user} = UserContextHook()
        const [type, setType] = useState()   
        const [amount, setAmount] = useState()
        const [descript, setDescript] = useState("")
        const navigate = useNavigate()
        const [btnClicked, setBtnClicked] = useState (false)
     
        useEffect(() => {
                if(!user.token || !user){
                        navigate('/')
                }                  
                setType(window.location.pathname.split('/')[2]);
        }, []);
     
     
        const saveMovement = (e)=>{
                setBtnClicked(true)
                e.preventDefault()
        
        if(type && amount && descript && amount > 0){
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
                        setBtnClicked(false)
                        navigate("/home") 
                        })
        
                        promise.catch(err=>{
                                setBtnClicked(false)
                        alert(err.response.data.message)
                        })
        
                }catch(err){console.log(err.message)}
        
        }else{
                alert('existem campos inválidos!')
                window.location.reload(true)
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
                                
                                <StyledButton onClick= {(e)=>saveMovement(e)} type="submit" >{
                                btnClicked ? 
                                    (<TailSpin
                                        height="50"
                                        width="50"
                                        color="#FFFFFF"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={btnClicked}
                                />):('Salvar Transação')
                                }</StyledButton>
                        </form>
                </>

        )


}

const StyledButton = styled.button`
display:flex;
flex-direction: column;
align-items:center;

`

export default TransactionPage