import react,{ useEffect, useState} from 'react';
import { getMessaging, getToken  } from "firebase/messaging";
import db from '../src/config/firebase.config';

const Notification = () => {

    useEffect(() =>{
        

    })

    const notifMe = () => {
        const messaging = getMessaging();
        
        getToken(messaging, { vapidKey: 'BMUBWIJkRMyPNMZKUu3wS9kzxF61S5fkgJzzb7oNLgY09sCeWfvACzNOvu_uEngb9B1lhh3TddCKk6-M1jQPHVw' }).then((currentToken) => {
            if (currentToken) {
                // setFcm(currentToken)
                // // alert(currentToken)
                // addData(currentToken);
                console.log(currentToken);
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              
            }
          }).catch((err) => {
            // getPermissionNotification();
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });
    }


    return(
      <div>
          <br />
          <div className="jumbotron">
            <h1 className="display-4">Notification</h1>
            <p className="lead">Cliquer sur le boutton pour recevoir les notification.</p>
            <hr className="my-4"/>
            <p>Cliquer sur autorisé sur le popup</p>
            <button className="btn btn-primary btn-lg" onClick={notifMe}>Obtenir</button>
            </div>
      </div>
    )
  }
  
  export default Notification