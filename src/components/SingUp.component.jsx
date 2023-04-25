import { useNavigate } from 'react-router-dom'
import MyWalletLogo from "./MyWalletLogo.component"
import axios from "axios"
import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react'
import styled from 'styled-components'


export default function SingUpPage() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [btnClicked, setBtnClicked] = useState (false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const [userName, setUserName] = useState("")

    const navigate = useNavigate();
    function registerUser(e) {

        if( emailRegex.test(userEmail)){
            if (userPassword === confirmPwd){
                e.preventDefault()
                setBtnClicked(true);
        
                const URL = `${process.env.REACT_APP_RENDER_URL}/registrar`
        
                const body = { name: userName, email: userEmail, password: userPassword }
                try {
                    const require = axios.post(URL, body)
                    require.then(res => {
                        alert("usuário Cadastrado com sucesso!")
                        setBtnClicked(false)
                        navigate("/")
        
                    })
                    require.catch(err => {
                        setBtnClicked(false)
                        console.log(err.message)
                        err.response.status.message === 409 && alert("usuario já cadastrado")
        
                    })
        
                } catch (err) { console.log(err.message) }
        
            } else {
                alert("a senha e a confirmação de senha tem que ser iguais!")
            }
        }else{
            alert("formato de email invalido!")
        }
    


    }

    return (
        <>
                  <form>
            <MyWalletLogo />
          
            <input
                        
                        type="text"
                        value={userName} 
                        placeholder="nome"
                        disabled={btnClicked} 
                        required
                        onChange={e=>setUserName(e.target.value)}
            ></input>
           <input 
                        
                        type="email" 
                        value={userEmail}
                        placeholder="email"
                        disabled={btnClicked}
                        required
                        onChange={e=>setUserEmail(e.target.value)}
            ></input>
           <input 
                    
                        type="password"
                        value={userPassword}
                        placeholder="senha"
                        disabled={btnClicked}
                        required
                        onChange={e=>setUserPassword(e.target.value)}
            ></input>
            <input
                   
                        type="password"
                        value={confirmPwd}
                        placeholder="senha"
                        disabled={btnClicked}
                        required
                        onChange={e=>setConfirmPwd(e.target.value)}
            />
            <StyledButton
                onClick={(e) => registerUser(e)}
                type="submit"> {
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
                                /> ):('Cadastrar')
                         }
            </StyledButton>
        </form>

        </>
      
    )
}


const StyledButton = styled.button`
         display:flex;
        flex-direction: column;
        align-items:center;

`
