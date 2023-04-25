import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { UserContext } from './Context/user.context'
import { useState } from "react"
import ValidateAuth from "./components/Auth.component"


export default function App() {

  const [user, setUser] = useState({})


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ValidateAuth />}  >
              <Route path="/" element={<SignInPage />} exact/>
              <Route path="/registrar" element={<SignUpPage />} />
            </Route>

            <Route path="/home" element={<HomePage />} />

            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </UserContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
