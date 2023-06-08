import styled from 'styled-components'
import React, { useState } from 'react'
import { postArticleAPI } from '../store/actions/actions'
import { Timestamp } from 'firebase/firestore'
import { connect } from 'react-redux'
import ReactPlayer from "react-player";


const Postmodal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === '' || image === undefined) {
      alert(`not an image ,the file is a ${typeof image}`)
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const handlepostArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),

    };
    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <Container>
      <Content>
        <Header>
          <h1>Create a Post</h1>
          <button onClick={reset}>
            <img src="/images/close-icon.svg" alt="" />
          </button>
        </Header>
        {props.user ?
          <UserInfo>
            <img src={props.user.photoURL} alt="" />
            <span>{props.user.displayName}</span>
          </UserInfo>
          : <UserInfo>
            <img src="/images/user.svg" alt="" />
            <span>Name</span>
          </UserInfo>}

        <TextArea placeholder="What's In your mind ?"
          autoFocus={true}
          value={editorText}
          onChange={(e) => setEditorText(e.target.value)}
        ></TextArea>

        {assetArea === "image" ? (
          <UploadImage>
            <input type="file"
              accept="image/gif, image/png, image/jpeg, image/png"
              name="image"
              id="file"
              onChange={handleChange}
              
            />
            <label htmlFor="file"><img src="/images/add-image-icon.png" alt=" " /><h5>Select an image...</h5></label>
            {shareImage && <img src={URL.createObjectURL(shareImage)} alt=""/>}
          </UploadImage>
        ) : (

          assetArea === "media" && (

            <> <input type="text"
              placeholder="Please input a video link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)} />
              {videoLink && (<ReactPlayer width={"auto"} url={videoLink} />
              )}
            </>))
        }
        <ShareCreation>
          <AttachAsset>
            <AssetButton onClick={() => switchAssetArea("image")}>
              <img src="/images/share-image.png" alt="" />
            </AssetButton>
            <AssetButton onClick={() => switchAssetArea("media")}>
              <img src="/images/share-video.png" alt="" />
            </AssetButton>

          </AttachAsset>
          <ShareComment>
            <AssetButton>
              <img src="/images/share-comment.svg" alt="" />
              <span>Anyone</span>
            </AssetButton>
          </ShareComment>

          <PostButton onClick={(e) => handlepostArticle(e)} disabled={editorText ? false : true}>
            Post
          </PostButton>
        </ShareCreation>
      </Content>
    </Container>
  )
}
const Container = styled.div`
position:fixed;
top:0px;
left:0px;
right:0px;
bottom:0px;
z-index:999;
color:black;
background-color: rgba(0,0,0,0.8)
`
const Content = styled.div`
width:100%;
max-width:552px;
min-width:250px;
background-color:white;
max-height:90%;
overflow-y:scroll;
border-radius:5px;
position:relative;
padding:20px 16px;
margin:0 auto;
top:32px;
display:flex;
gap:8px;
flex-direction:column;

 @media (max-width:768px){
        min-height: 50px;
        padding:10px 8px;
        max-width:320px;
    }

`

const Header = styled.div`

color:rgba(0,0,0,0.6);
font-weight:600;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom:1px solid rgba(0,0,0,0.15);
button{
    border-color:rgba(0,0,0,0.6);
    border:none;
    padding:5px;
    height:40px;
    width:40px;
}`



const UserInfo = styled.div`
padding-left:10px;
font-weight:600;
display:flex;
align-items:center;
gap:10px;
img{
    max-width:45px;
    border-radius:50%;
}
`
const ShareCreation = styled.div`
display:flex;
gap:10px;
margin-top:10px;
`

const AttachAsset = styled.div`
display:flex;
`
const AssetButton = styled.button`
display:flex;
padding:5px;
border:none;
gap:5px;
color:rgba(0,0,0,0.5);
img{
    max-width:30px;
}
span{
    align-self:center;
}
font-weight:600;
`
const ShareComment = styled.div`
padding-left:8px;
border-left:1px solid  rgba(0,0,0,0.15);
margin-right:auto;
`

const PostButton = styled.button`
min-width:60px;
border-radius:22px;
background-color: #0a66c2;
color:white;
min-width:60px;
padding-left:16px;
padding-right:16px;
&:hover{
    background:#004182;
}
&:disabled{
  opacity: 0.5;
  cursor: not-allowed;
}
`

const TextArea = styled.textarea`
margin-top:20px;
padding:15px;
font-size:20px;
min-height:100px;
resize:none;
`

const UploadImage = styled.div`
display:flex;
flex-direction:column;
align-items:center;
img{
  width:auto;
  height:200px;
}
input{
  display:none;
}
label{
  display:flex;
  gap:15px;
  align-items:center;
  img{
    max-width:30px;
    max-height:30px;
  }
}
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Postmodal);