import React from 'react'
import {Outlet} from 'react-router-dom'
import styled from 'styled-components'
import Leftside from './Leftside'
import Main from './main'
import Rightside from './Rightside'
const home = () => {
  return (
    <Container>
    <Outlet />
    <Section>
      <h5><a>Hiring in a hurry?-</a></h5>
      <p>Find talended pros in record time with Upwork and keep business moving.</p>
    </Section>

    <Layout>
    <Leftside />
    <Main />
    <Rightside />
    </Layout>

    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;
`;

const Section=styled.section`
margin-top: 10px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
      min-height: 50px;

    padding: 0 5px;
  }
`
const Layout=styled.div`
display:flex ;
justify-content: space-between;

margin: 25px 0;

@media(max-width:768px){
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5px;
}
`



export default home