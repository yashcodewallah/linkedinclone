import styled from "styled-components";
import Postmodal from "./postmodal";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getArticlesAPI, updateArticlesAPI } from "../store/actions/actions";
const Main = (props) => {

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    props.getArticles();
  }, []);

const handleLike=(type,id,description)=>{
props.updateArticle({type,id,email:props.user.email})
}

  const handleClick = (e) => {
    e.preventDefault();

    // if(e.target !== e.currentTarget){
    //   return;
    // }

    switch (showModal) {
      case true:
        setShowModal(false);
        break;
      case false:
        setShowModal(true);
        break;
      default: setShowModal(false);
    }
  }

  return (
    <>
      <Container>
        <ShareBox>
          <div>

            <img src="/images/user.svg" alt="" />
            <button onClick={handleClick} disabled={props.loading===true}> Start a post</button>
          </div>

          <div>
            <button>
              <img src="/images/photo-icon.svg" alt="" />
              <span>photo</span>
            </button>

            <button>
              <img src="/images/video-icon.svg" alt="" />
              <span>Video</span>
            </button>

            <button>
              <img src="/images/event-icon.svg" alt="" />
              <span>Event</span>
            </button>

            <button>
              <img src="/images/article-icon.svg" alt="" />
              <span>Write article</span>
            </button>


          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="./images/loader.gif" />}
          {props.articles && props.articles.map((article, key) => {
            return (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="" />
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>{article.actor.date.toDate().toLocaleString()}</span>
                    </div>
                  </a>
                  <button>
                    <img src="/images/ellipsis.svg" alt="" />
                  </button>

                </SharedActor>
                <Discription>
                  {article.description}
                </Discription>


                <SharedImg>
                  <a>
                    {
                      !article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />

                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                  </a>
                </SharedImg>




                <SocialCount>
                  <li>
                    <button>
                      <img src="/images/like-show.png" alt="" />
                      <span>{article.like.length}</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments}</a>
                  </li>
                </SocialCount>
                <SocialAction>
                  <button onClick={()=>handleLike("like",article.id,article.actor.description)}>
                    <img src="/images/like.png" alt="" />
                    <span>like</span>
                  </button>
                  <button>
                    <img src="/images/comment.png" alt="" />
                    <span>comments</span>
                  </button>
                  <button>
                    <a><img src="/images/share.png" /><span>Share</span></a>
                  </button>

                  <button>
                    <a><img src="/images/send.png" /><span>Send</span></a>
                  </button>
                </SocialAction>
              </Article>
            )

          })}

        </Content>
        {showModal && <Postmodal showModal={showModal} handleClick={handleClick} />}
      </Container>
    </>
  );
};

const Container = styled.div`
flex:12;
`;


const CommonCard = styled.div`
 text-align: center;
 overflow: hidden;
 margin-bottom: 8px;
 background-color: #fff;
 border-radius:5px;
 possition:relative;
 border:none;
 box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 1px rgba(0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
 diaply:flex;
 flex-direction: column;
 color: #958b7b;
 margin: 0 0 8px;
 background: white;
 box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

  div {
      button{
       outline: none;
       color: rgba(0, 0, 0, 0.6);
       font-size:14px;
       line-height: 1.5;
       min-height: 48px;
       background: transparent;
       border: none;
       display:flex;
       align-items: center;
       font-weight: 600;

     }
     &:first-child {
       display: flex;
       align-items: center;
       padding: 8px 16px 0px 16px;
       img {
         width:48px;
         border-radius:50%;
         margin-right: 8px;
       }
       button{
         margin:4px 0 0 0;
         flex-grow:1;
         border-radius: 35px;
         padding-left:16;
         border: 1px solid rgba(0, 0, 0, 0.15);
         background-color:white;
         text-align:left;
       }
     }
     &:nth-child(2){
       display: flex;
       flex-wrap:wrap;
       justify-content:space-around;
       padding-bottom:4px;
       padding-top:4px;
       

       button{
         img{
           margin: 0 4px 0 -2px;
           width:25px;
           height:25px;
           
         }
       }
     }
  }
 
 `;

const Article = styled(CommonCard)`
  padding:0;
  margin: 0 0 8px 0;
  overflow:visible;
 `;

const SharedActor = styled.div`
  paddinh-right=40px;
  flex-wrap:nowrap;
  padding:12px 16px 0;
  margin-bottom:8px;
  align-items:center;
  display:flex;
  div{
    display:flex;
    div{
      display:flex;
      flex-direction:column;
      p{
        color:rgba(0,0,0,0.9);
      }
    }
  }
 
  a{
    margin-right:12px;
    flex-grow:1;
    overflow:hidden;
    display:flex;
    text-decoration:none;

    img{
      width:48px;
      height:48px;
    }
    & > div{
      display:flex;
      flex-direction:column;
      flex-grow:1;
      flex-basis:0;
      margin-left:8px;
      overflow:hidden;

      span{
        text-align:left;
        &:first-child{
          font-size:14px;
          font-weight:700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n +1){
           font-size:12px;
           color: rgba(0, 0, 0, 0.6);
        }

      }
    }
  }

  button{
    possition:absolute;
    right: 12px;
    top:0;
    background:transparent;
    border:none;
    outline: none;
    

    img{
      width:20px;
      height:20px;
      padding-bottom: 20px;
      
    }
  }
 `;

const Discription = styled.div`
 padding: 0 16px;
 overflow:hidden;
 color: rgba(0, 0, 0, 0.9);
 font-size:14px;
 text-align:left;
 `;

const SharedImg = styled.div`
  margin-top:8px;
  width:100%;
  display:block;
  position:relative;
  background-color:#f9fafb;

  img{
    object-fit:contain;
    width: auto;
    height:350px;
  }
  @media(max-width:768px){
   img{
    max-width: 220px;
  }
}
 `;

const SocialCount = styled.ul`
 line-height:1.3;
 display:flex;
 align-items:center;
 align-items:flex-start;
 overflow:auto;
 margin:0 16px;
 padding:8px 0;
 border-bottom:1px solid #e9e5df;
 list-style:none;

 li{
   margin-right:5px;
   font-size:12px;
   align-self:center;
   button{
     display:flex;
     gap:8px;
     align-items:center;
     border-radius:22px;
     border-color:teal;
     padding:4px 12px;
     background:none;
     img{
      width:15px;
    }
   }

 }
 `;

const SocialAction = styled.div`
  align-items:center;
  display:flex;
  justify-content:flex-start;
  margin:0;
  min-height:40px;
  padding:4px 8px;
  

  button{
    display:inline-flex;
    align-items:center;
    padding:8px;
    color: #0a66c2;
    a{
      display flex;
      text-decoration:none;
      align-items:center;
      img{
        width:20px;
        height:20px;
      }
    }
    img{
      width:20px;
      height:20px;
    }

    @media(min-width:768px){
      span{
        margin-left:8px;
      }
      a{
        margin-left:8px;
      }
    }
  }

 `;
const Content = styled.div`
 text-align:center;
 &>img {
   width:30px;
 }
 `;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    articles: state.articleState.articles,
    loading: state.articleState.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
  updateArticle:(payload)=> dispatch(updateArticlesAPI(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);