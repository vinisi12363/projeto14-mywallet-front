import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo.component"
import LoginPage from '../components/Login.component'
export default function SignInPage() {
  return (
    <SingInContainer>
    <MyWalletLogo/>
     <LoginPage />
      <Link to="/registrar">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
