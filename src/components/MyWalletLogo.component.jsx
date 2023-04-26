import styled from "styled-components"
import { Link } from "react-router-dom"

import image from '../Utils/Images/WalletLogo.png'

export default function MyWalletLogo() {
   
   
  

    
    return (

        <Link to='/'>
                    <LogoImage src={image} alt="Wallet Logo" />       
        </Link>
 
    )
}

const LogoImage = styled.img`

   position:relative;
    width :250px;
 

`
const Text = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
    margin-bottom:20px;
`

