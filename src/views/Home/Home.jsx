import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import FormCreateRoom from './FormCreateRoom';
import RoomsList from './RoomsList';

function Home() {

    const { teste } = useParams();

    const handleLogOut = () => {
        firebase.logout();
    };

    console.log(firebase, firebase.auth.currentUser, firebase.userLogged());

    return (
        <div>
            <button onClick={handleLogOut} >Sair</button>
            <br />
            <FormCreateRoom />
            <br/>
            <RoomsList />
        </div>
    );
}

export default Home;