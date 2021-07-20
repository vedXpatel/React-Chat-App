import firebase from "firebase/app";
import "firebase/auth";

 export const auth= firebase.initializeApp ({
  apiKey: "AIzaSyCCQXDgXcBy1ljzwX1StkVMQxPvXuPVIVw",
  authDomain: "communication-channel-riddl.firebaseapp.com",
  databaseURL: "https://communication-channel-riddl-default-rtdb.firebaseio.com",
  projectId: "communication-channel-riddl",
  storageBucket: "communication-channel-riddl.appspot.com",
  messagingSenderId: "1046257676359",
  appId: "1:1046257676359:web:dee641c6ee21e1db35c162"
}).auth();
   
  // https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/ 