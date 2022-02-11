import react,{ useState} from 'react';
import { getMessaging, getToken  } from "firebase/messaging";
import { collection, doc, setDoc  } from "firebase/firestore";
import db from '../src/config/firebase.config';

const Notification = () => {


    return(
      <div>
          <br />
          <div className="jumbotron">
          {/* <img src="https://cdn.pixabay.com/photo/2022/01/25/12/58/conifer-6966140_960_720.jpg" class="img-fluid" alt="nature"/> */}
            <h1 className="display-4">Home</h1>
            <p className="lead">New Project</p>
            <hr className="my-4"/>
            {/* <p>Cliquer sur autorisé sur le popup</p> */}
            <button className="btn btn-primary btn-lg" >Commencer</button>
            </div>
      </div>
    )
  }
  
  export default Notification