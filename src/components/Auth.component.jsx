import UserContextHook from '../Hooks/user.hook'
import { Outlet, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

export default function ValidateAuth(){

    const {user,setUser} = UserContextHook()
  
    const navigate = useNavigate()

    useEffect( () => {
        const lsUser = JSON.parse(localStorage.getItem("user"))
  
        if(lsUser){
            setUser(lsUser)
            navigate('/home')
        }
    
    },[])

    return(
        <Outlet/>
    )
}