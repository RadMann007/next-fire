import Head from 'next/head';
import Link from 'next/link';
import react, {useState, useContext} from 'react';
import {DataContext} from '../store/GlobalState';

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const Signin = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [activ,setActiv] = useState(true);

  const [state, dispatch] = useContext(DataContext)

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const google = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    setActiv(false);
    // console.log("email: ",password);
    // console.log("password: ",password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setActiv(true);
            // dispatch({type: 'NOTIFY', payload: {success: "Login success"}})
            window.location.replace("/notification");
            // ...
        })
        .catch((error) => {
          dispatch({type: 'NOTIFY', payload: {error: "Login failed!"}})
          setActiv(true);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
  }

    return(
      <div>
          <Head>
              <title>Sign in</title>
          </Head>
          <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={submitForm}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Votre email"/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Mot de passe</label>
            <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="*******"/>
        </div>
        
        <p className="my-2">Pas encore inscrit ? <Link href="/register"><a style={{color: 'crimson'}} className="navbar-brand">Inscription</a></Link></p>
        <button type="submit" className="btn btn-success w-100" >
        <div class="spinner-border spinner-border-sm" hidden={activ} role="status">
  <span class="sr-only">Loading...</span>
</div> Se connecter</button><br /><br />
        <button type="submit" className="btn btn-danger w-100" onClick={google}><i class="fab fa-google"></i>oogle</button>
        </form>
      </div>
    )
  }
  
  export default Signin