import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import UserContextHook from '../Hooks/user.hook'
import MyWalletLogo from "./MyWalletLogo";


export default function LoginPage(){
    const {user, setUser} = UserContextHook()
    const [enterClicked , setEnterClicked] = useState(false)
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function login(e){
        e.preventDefault()
        const URL ="http://localhost:5000/login"
        
        setEnterClicked(true)
        const body ={email,password}
        console.log ("BODY", body)
        const promise= axios.post(URL , body)
        promise.then(res=>{
           
            const newUserData = res.data
            setUser(newUserData)
           console.log("RES.DATA", newUserData)
            navigate("/home")
          
        })

        promise.catch(err=>{
            alert(err.response.data.message)
            setEnterClicked(false)
            
        })
       
    }

   return (
    <>
         <form>
         <input 
                        data-test="email-input"
                        type="email" 
                        value={email}
                        placeholder="email"
                        
                        required
                        onChange={e=>setEmail(e.target.value)}
         ></input>
         <input 
                        data-test="password-input"
                        type="text"
                        value={password}
                        placeholder="senha"
                       
                        required
                        onChange={e=>setPassword(e.target.value)}
         ></input>
        <button onClick= {(e)=>login(e)} type="submit">Entrar</button>
      </form>
    </>
   )


}