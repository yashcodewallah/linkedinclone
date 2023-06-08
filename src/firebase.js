 import {initializeApp} from "firebase/app"
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage } from "firebase/storage"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQuzJ2AVYIL8C72OUIROtQyZx6MG3jkF8",
  authDomain: "linkedinclone2.firebaseapp.com",
  projectId: "linkedinclone2",
  storageBucket: "linkedinclone2.appspot.com",
  messagingSenderId: "1097674444649",
  appId: "1:1097674444649:web:6ed3e0847bc35b080cb7f8",
  measurementId: "G-S64FXGCD7J"
};
//   const firebaseApp= firebase.initializeApp(firebaseConfig);
const firebaseApp=initializeApp(firebaseConfig);
  const db= getFirestore(firebaseApp);
  const auth=getAuth(firebaseApp);
  const provider=new GoogleAuthProvider();
  const storage=getStorage(firebaseApp);

  export  {auth,storage,provider};
  export default db;