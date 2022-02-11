import Head from 'next/head';
import Link from 'next/link';
import { getMessaging, getToken  } from "firebase/messaging";
import { collection, doc, setDoc  } from "firebase/firestore";
import db from '../src/config/firebase.config';
import {useState, useContext} from 'react';
import {DataContext} from '../store/GlobalState';
// import Toast from '../components/Toast';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const Signin = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [rePassword,setRePassword] = useState();
  const [firstName,setFirstName] = useState();

  const [state, dispatch] = useContext(DataContext);
//   const [token, setToken ] = useState();

  const addData = async (tkn) => {
   
    const user = collection(db, "user");

    await setDoc(doc(user, email), {
        email: email,
        token: tkn
     });
    //  alert("Bravo! vous allez recevoir les notifs bientot!")
    dispatch({type: 'NOTIFY', payload: {success: 'Added!'}})
}

  const auth = getAuth();
  const messaging = getMessaging();

  const submitForm = (e) => {
    e.preventDefault()
    if(email == undefined || password == undefined || rePassword == undefined || firstName == undefined){
        dispatch({type: 'NOTIFY', payload: {error: "Veuillez remplir tout les champs"}})
    }else{
        if( (password != rePassword) ){
            dispatch({type: 'NOTIFY', payload: {error: "mot de passe different"}})
            // return dispatch({type: 'NOTIFY', payload: {error: errorMessage}})
        }else{
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        // window.location.replace("/");
        // console.log(userCredential);
        
        // Signed in 
        getToken(messaging, { vapidKey: 'BMUBWIJkRMyPNMZKUu3wS9kzxF61S5fkgJzzb7oNLgY09sCeWfvACzNOvu_uEngb9B1lhh3TddCKk6-M1jQPHVw' }).then((currentToken) => {
            if (currentToken) {
            //   setToken(currentToken)
                addData(currentToken);
            } else {
              // Show permission request UI
              dispatch({type: 'NOTIFY', payload: {error: "No registration token available. Request permission to generate one."}})
              
            }
          }).catch((err) => {
            // getPermissionNotification();
            console.log('An error occurred while retrieving token. ', err);
            dispatch({type: 'NOTIFY', payload: {error: err}})
            // ...
          });
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage)
        // <Toast />
        if(errorMessage) return dispatch({type: 'NOTIFY', payload: {error: errorMessage}})
        
    });
        }
    }
  }

    return(
      <div>
          <Head>
              <title>Inscription</title>
          </Head>
          <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={submitForm}>
        <div className="form-group">
            <label htmlFor="firstName">Nom</label>
            <input value={firstName} onChange={(e) =>setFirstName(e.target.value)} type="text" className="form-control" id="firstName" aria-describedby="firstName" placeholder="Nom"/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Votre email"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" placeholder="*******"/>
        </div>

        <div className="form-group">
            <label htmlFor="rePassword">Retapez votre mot de passe</label>
            <input value={rePassword} onChange={(e) =>setRePassword(e.target.value)} type="password" className="form-control" id="rePassword" aria-describedby="rePassword" placeholder="*******"/>
        </div>
        
        <button type="submit" className="btn btn-success w-100" >Inscription</button>
        </form>
      </div>
    )
  }
  
  export default Signin