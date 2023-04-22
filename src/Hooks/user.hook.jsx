import { useContext } from "react";
import  UserContext from "../Context/user.context";

export function UserContextHook (){
    const context = useContext(UserContext)

    if (context === undefined)
    throw  new Error ('Não está dentro do contexto')

     return context
}

export default UserContextHook