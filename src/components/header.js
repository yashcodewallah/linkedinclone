import React from 'react'
import styled from 'styled-components'
import {signOutApi } from '../store/actions/actions';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router';


const Header = (props) => {

    const navigate=useNavigate();

const handleLogout=()=>{
    props.signOut()
    navigate("/")    
}

  return (
    <Container>
    <Content>
        <Logo><a href='/home'><img src="/linkedin.png" alt=""/></a></Logo>
        <Search>
            <div>
                <input type="text" placeholder="Search" />
            </div>
            <img src="/images/search-icon.svg" alt="" />
        </Search>
        <Nav><NavListWrap>
            <Navlist className='active'>
                <a><img src='/images/nav-home.svg' alt='' />
                <span>Home</span>
                </a>
            </Navlist>
            <Navlist>
                <a><img src='/images/nav-network.svg' alt='' />
                <span>Network</span>
                </a>
            </Navlist>
            <Navlist>
                <a><img src='/images/nav-jobs.svg' alt='' />
                <span>Jobs</span>
                </a>
            </Navlist>
            <Navlist>
                <a><img src='/images/nav-messaging.svg' alt='' />
                <span>Messaging</span>
                </a>
            </Navlist>
            <Navlist>
                <a><img src='/images/nav-notifications.svg' alt='' />
                <span>Notification</span>
                </a>
         </Navlist>
         <User>
            <a>
                {props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> :<img src="/images/user.svg" alt=''></img>}
                <span>Me
                <img src="/images/down-icon.svg" alt=''></img>                
                </span>
            </a>
            <SignOut onClick={handleLogout}>
                signout
            </SignOut>
         </User>
         <Work>
            <a>
                <img src="/images/nav-work.svg" alt=''/>
                <span>work<img src="/images/down-icon.svg" alt="" /></span>
            </a>
         </Work>
        </NavListWrap>
        </Nav>
    </Content>
    </Container>
  )
}

const Container=styled.div`
background-color: white;
border-bottom: 1px solid rgba(0,0,0,0.08);
left:0;
padding: 0 24px;
top:0px;
// width: 100%;
z-index:100;
`
const Content=styled.div`
display: flex;
align-items: center;
min-height: 100%;
max-width: 1128px;
`
const Logo=styled.span`
margin-right: 8px;
font-size: 0;
img{

    width: 30px;
    z-index: 1;
    border-radius: 0 2px 2px 0;
    pointer-events: none;
}
`
const Search=styled.div`
opacity: 1;
flex-grow: 1;
position: relative;
& > div {
    max-width: 280px;
    input{
   border :none ;
   background-color: #eef3f8;
   color: rgba(0,0,0,0.9) ;
   box-shadow: none;
   padding: 0px 8px 0px 40px;
   line-height: 2;
   height: 34px;
   border-color: #dce6f1;
   width: 218px;
   border-radius: 2px;
   font-weight: 400;
   vertical-align: text-top;
}
}

img{
    position: absolute;
    width: 20px;
    top: 10px;
    left: 2px;
    z-index: 1;
    border-radius: 0 2px 2px 0;
    pointer-events: none;

}
`
const Nav=styled.nav`
margin-left: auto;
display: block;

@media(max-width:768px){
position: fixed;
left: 0px;
bottom: 0px;
background-color: white;
z-index:99;
width: 100%;
}
`
const NavListWrap=styled.ul`
display: flex;
align-items: center;
flex-wrap:wrap;
list-style-type: none;
.active{
    span:after{
    content: '';
    transform: scaleX(1);
    border-bottom: 2px solid var(--white,#fff);
    bottom: 0px;
    left: 0px;
    position: absolute;
    transition: transform .2s ease-in-out;
    width: 100%;
    border-color:rgba(0,0,0,0.9) ;
    }
}
`;


const Navlist=styled.li`


a{
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span{
        color: rgba(0,0,0,0.6);
        display: flex;
        /* align-items: center; */
    }
    @media (max-width:768px){
        min-height: 50px;
    }
}

&:hover,&:active{
    a{
        span{
            color: rgba(0,0,0,0.9);
        }
    }
}

`
const SignOut=styled.div`
position: absolute;
top:45px;
background: white;
border-radius: 0 0 5px 5px;
width:100px;
height:40px;
font-size: 16px;
transition-duration:167ms;
text-align: center;
display:none;
`
const User=styled(Navlist)`
a >img{
    border-radius:50%;
    width:24px;
    height:24px;
    span{
        display: flex;
        align-items:center;
    }
}
&:hover{
    ${SignOut}{
        align-items: center;
        display: flex;
        justify-content: center;
    }
}
`;

const Work=styled(User)`
border-left:1px solid rgba(0,0,0,0.08);
`

const mapStateToProps = (state) =>{
    return{
      user:state.userState.user,
    };
  }
  
  const mapDispatchToProps = dispatch =>{
    return{
        signOut: () => dispatch(signOutApi ()),
    }
  };
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header);