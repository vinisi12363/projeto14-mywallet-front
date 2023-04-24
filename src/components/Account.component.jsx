import UserContextHook from "../Hooks/user.hook.jsx"
import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import TransactionPage from "./Transaction.component.jsx"



export default function AccountPage() {
  const {user} = UserContextHook()
  const [usermovement, setUserMovement] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const navigate = useNavigate()
  
 
  useEffect(() => {

    if(!user.token){
      navigate('/')
      
    }else{

      const URL = "https://mywalletback-p0ll.onrender.com/home"
      const config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      }
  
  
      const require = axios.get(URL, config);
      require.then(res => {
  
        let soma = 0;
        res.data.map((mov) => {
  
  
          if (mov.type === 'increase') {
            soma = soma + mov.amount
          }
          if (mov.type === 'decrease') {
            soma -= mov.amount
          }
        })
          setUserMovement([...res.data])
          setTotalAmount(soma)
  

  
      })
      require.catch(err => {
        console.log(err.message)
        
      })
    
    }
     
    
    

  }, [])



  const increase = () => navigate('/nova-transacao/increase')
  const decrease = () => navigate('/nova-transacao/decrease')
  return (
    <>

      <Header>
        <h1>Olá, {user.username}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <MovementContainer key="movement1">
          <ul>
            {
              usermovement.map((movement) => <ListItemContainer>{
                <>
                  <div>
                    <span>{movement.data}</span>
                    <strong>{movement.descript}</strong>
                  </div>
                  <Value color={movement.type === "increase" ? "positivo" : "negativo"} >{movement.amount}</Value>
                </>


              }</ListItemContainer>)
            }
          </ul>
        </MovementContainer>
        <article>
          <strong>Saldo</strong>
          <Value color={totalAmount >= 0 ? "positivo" : "negativo"}>{totalAmount}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>

        <button onClick={() => { increase() }}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => { decrease() }}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </>
  )

}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const MovementContainer = styled.div`
overflow-y:auto;
height:520px;

`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`