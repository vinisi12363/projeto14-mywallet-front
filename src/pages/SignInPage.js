import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo.component"
import LoginPage from '../components/Login.component'
export default function SignInPage() {
  return (
    <>
    
    <SingInContainer>
    <MyWalletLogo/>
     <LoginPage />
      <Link to="/registrar">
        <StyledH2>Primeira vez? Cadastre-se!</StyledH2>
      </Link>
    </SingInContainer>

    </>
  
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  max-width:100%;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;

`

const StyledH2 = styled.h2`

margin-top:15px;
`
