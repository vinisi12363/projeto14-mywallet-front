import styled from "styled-components"

import AccountPage from '../components/Account.component'

export default function HomePage() {
  return (
    <HomeContainer>
        <AccountPage/>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
