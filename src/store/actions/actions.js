import { auth, provider, storage } from "../../firebase"
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actiontype";
import db from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

export const setUser = (payload) => {
  return {
    type: SET_USER,
    user: payload
  }
}

export const getArticles=(payload)=>{
  return{
    type:GET_ARTICLES,
    payload
  }
}

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then(payload => {
        dispatch(setUser(payload.user));
        window.location.replace("/home");
      }).catch((err) => console.log(err));
  }
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    })
  }
}

export function signOutApi() {
  return (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(setUser(null))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image!=="") {
      
      const storageRef = ref(storage, `images/${payload.image.name}`);

      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error.data);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            addDoc(collection(db, 'articles'), {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comment: 0,
              like: [],

              description: payload.description,
            })
            dispatch(setLoading(false));
          });
        }
      );
    }
    else if (payload.video) {
      addDoc(collection(db, 'articles'), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comment: 0,
        like: [],

        description: payload.description,
      })
      dispatch(setLoading(false));
    }
    else{
      addDoc(collection(db, 'articles'), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImg: "",
        comment: 0,
        like: [],
        description: payload.description,
      })
      dispatch(setLoading(false));
  };
}
}

export function getArticlesAPI(){
  return(dispatch)=>{
      
  onSnapshot(collection(db,'articles') , (snapshot) =>{
    let payload=[];
    snapshot.docs.forEach((doc)=> {
      payload.push({...doc.data(),id:doc.id})
    })
    payload.sort((a, b) => b.actor.date - a.actor.date);
    console.log("called");
    dispatch(getArticles(payload))
  })
  }
}

export function updateArticlesAPI({type,id,email}){
  return(dispatch)=>{
      const docRef=doc(db,'articles',id)
      getDoc(docRef).then((doc)=> {
      const temp= doc.data().like;
      
      if(!temp.includes(email)){
        temp.push(email)
      }
      else{
        temp.splice(temp.indexOf(email), 1);
      }
      console.log(temp);
      if(type==='like'){
        updateDoc(docRef,{
          like: temp
        })
      }
      })
  }
}