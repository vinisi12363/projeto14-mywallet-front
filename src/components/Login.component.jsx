import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import UserContextHook from '../Hooks/user.hook'
import { ThreeDots } from 'react-loader-spinner'



export default function LoginPage(){

    const {user,setUser} = UserContextHook()
    const [enterClicked , setEnterClicked] = useState(false)
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [btnClicked, setBtnClicked] = useState (false)
   

    useEffect( () => {
        const lsUser = JSON.parse(localStorage.getItem("user"))

        if(lsUser){
            setUser(lsUser)
            navigate('/home')
        }
    
    },[])


    function login(e){
     
        
    
        e.preventDefault()
        setBtnClicked(true)
        const URL = "https://mywalletback-p0ll.onrender.com/login"
        
        setEnterClicked(true)
        const body ={email,password}
        const promise= axios.post(URL , body)
        promise.then(res=>{
            const {token , username} = res.data
            localStorage.setItem("user" , JSON.stringify({token , username}))
            const lsUser = JSON.parse(localStorage.getItem("user"))
            setUser(lsUser)
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
                        disabled={btnClicked}
                        required
                        onChange={e=>setEmail(e.target.value)}
         ></input>
         <input 
                       
                        type="password"
                        value={password}
                        placeholder="senha"
                        disabled={btnClicked}
                        required
                        onChange={e=>setPassword(e.target.value)}
         ></input>
        <button onClick= {(e)=>login(e)} type="submit">{
                                    btnClicked ? 
                                    (<ThreeDots
                                    type="Spinner Type"
                                    color="white"
                                    height={60}
                                    width={60}
                                    timeout={2000}
                                    visible={btnClicked}
                                /> ):('Entrar')
                         }</button>
      </form>
    </>
   )


}