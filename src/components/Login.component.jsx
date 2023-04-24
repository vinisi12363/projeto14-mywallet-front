import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import UserContextHook from '../Hooks/user.hook'
import dotenv from 'dotenv'



export default function LoginPage(){
    dotenv.config()
    const {user, setUser} = UserContextHook()
    const [enterClicked , setEnterClicked] = useState(false)
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function login(e){
        e.preventDefault()
        const URL = "https://mywalletback-p0ll.onrender.com/login"
        
        setEnterClicked(true)
        const body ={email,password}
        const promise= axios.post(URL , body)
        promise.then(res=>{
           
            const newUserData = res.data
            console.log(res.data)
            setUser(newUserData)
            localStorage.setItem("token" , res.data.token)
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
                    
                        type="email" 
                        value={email}
                        placeholder="email"
                        required
                        onChange={e=>setEmail(e.target.value)}
         ></input>
         <input 
                       
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