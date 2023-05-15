import styled from "styled-components";

const Main = (props) => {
    return (
        <Container>
            <Sharebox>Share
                <div>
                    <img src="/images/user.svg" alt="" />
                    <button>Start a Post</button>
                </div>
                <div>
                    <button>
                        <img src="/images/photo.svg" alt="" />
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src="/images/photo.svg" alt="" />
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src="/images/photo.svg" alt="" />
                        <span>Event</span>
                    </button>
                    <button>
                        <img src="/images/photo.svg" alt="" />
                        <span>Write an article</span>
                    </button>
                </div>
            </Sharebox>

            <Article>

                <SharedActor>

                    <a>
                        <img src="/images/user.svg" alt="" ></img>
                        <div>
                            <span>Title</span>
                            <span>Info</span>
                            <span>Date</span>
                        </div>
                    </a>
                    <button>

                        <img src="/images/ellipsis.svg" alt="" />

                    </button> 
                    </SharedActor>

            </Article>

        </Container>
    )
}

const Container = styled.div`
flex: 12;
text-align: center;
`
const CommonCard = styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgb(0 0 0/15%),0 0 0 rgb(0 0 0/20%);
`
const Sharebox = styled(CommonCard)`
display: flex;
flex-direction:column;
background:white;
margin: 0 0 8px;
color:#958b7b;
div{
    button{
        outline:none;
        color:rgba(0 ,0, 0, 0.6);
        font-size: 14px;
        min-height: 48px;
        background:transparent;
        border:none;
        display: flex;
        align-items: center;
        font-weight: 600;
    }
    &:first-child{
        display: flex;
        align-items:center;
        padding:8px 16px 0 16px;
        img{
            width: 48px;
            border-radius: 50%;
            margin-right: 8px;
        }
        button{
            margin: 4px 0;
            flex-grow:1;
            border-radius: 35px;
            padding-left: 16px;
            border: 1px solid rgba(0 ,0,0,0.15);
            background-color: white;
            text-align:left;
        }
    }
    &:nth-child(2){
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 4px;
        justify-content: space-around;
        margin-top: 15px;
        img{
            margin: 0 4px 0 -2px;
        }
        span{
            color: #70b5f9;
        }
        @media(max-width:768px){
            flex-direction:column;
        }
    }
}
`

const SharedActor=styled.div`
padding-right: 40px;
flex-wrap: nowrap;
padding: 12px 16px 0;
margin-bottom: 8px;
align-items: center;

display: flex;
a{
margin-right: 12px;
flex-grow: 1; 
overflow: hidden;
display: flex; text-decoration: none;

img{
    width: 48px;
    height: 48px;
}
}
`


export default Main;