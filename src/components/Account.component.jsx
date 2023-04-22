import UserContextHook  from "../Hooks/user.hook.jsx"
import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function AccountPage(){
const {user} = UserContextHook()
const [usermovement, setUserMovement] = useState([])
const [totalAmount, setTotalAmount] = useState(0)


useEffect( () => {
    const URL = "http://localhost:5000/home"
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
  

        const require =  axios.get(URL, config);
        require.then(res => {
            console.log("MOVEMENTS RES DATA", res.data)
            let soma= 0;
            res.data.map((mov)=>{
                console.log("soma "+soma)
                
                if(mov.type === 'increase') {
                        soma = soma + mov.amount
                }
                if (mov.type ==='decrease') {
                    soma -= mov.amount
                }
            })
            setUserMovement([...res.data])
            setTotalAmount(soma)
            
            if (res.data!== []){
               // setHaveHabits(true)
                
    
            }
            
    
        })
        require.catch(err => {
            console.log(err.response.data.message)
           // setHaveHabits(false)
        })
  

}, [])

function CalculateAmount(){
    let soma= 0;
   usermovement.map((mov)=>{
        console.log("soma "+soma)
        
        if(mov.type === 'increase') {
                soma = soma + mov.amount
        }
        if (mov.type ==='decrease') {
            soma -= mov.amount
        }
    })

    setTotalAmount(soma)
}
    console.log("AMOUNT VALE :",totalAmount )
return(
    <>
             
      <Header>
        <h1>Olá, {user.username}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
            {
                usermovement.map((movement)=> <ListItemContainer>{
                        <>
                            <div>
                            <span>{movement.data}</span>
                            <strong>{movement.descript}</strong>
                            </div>
                            <Value color={movement.type==="increase"? "positivo" : "negativo"} >{movement.amount}</Value>
                        </>
                        

                }</ListItemContainer>)
            }
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={totalAmount >= 0 ? "positivo" : "negativo"}>{totalAmount}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
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