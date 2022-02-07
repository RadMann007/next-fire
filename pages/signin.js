import Head from 'next/head';
import Link from 'next/link';
import react, {useState} from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const Signin = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const auth = getAuth();

  const submitForm = (e) => {
    e.preventDefault()
    // console.log("email: ",password);
    // console.log("password: ",password);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            window.location.replace("/notification");
            // ...
        })
        .catch((error) => {
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
        
        <p className="my-2">Pas encore inscrit ? <Link href="/"><a style={{color: 'crimson'}} className="navbar-brand">Inscription</a></Link></p>
        <button type="submit" className="btn btn-success w-100" >Se connecter</button>
        </form>
      </div>
    )
  }
  
  export default Signin