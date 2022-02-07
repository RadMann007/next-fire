import { initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDREN3V2w3Go0aaYOdAQQgWb3cnDyzeH8A",
    authDomain: "react-notif-da8a4.firebaseapp.com",
    projectId: "react-notif-da8a4",
    storageBucket: "react-notif-da8a4.appspot.com",
    messagingSenderId: "96330814673",
    appId: "1:96330814673:web:fb077da880327362f461f0"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore()
export default db;