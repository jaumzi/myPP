import React, { useContext } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import FormCreateRoom from './FormCreateRoom';
import RoomsList from './RoomsList';

import './Home.css';

function Home() {
    const { setUserLogged, userLogged } = useContext(AppContext);

    const handleLogOut = () => {
        firebase.logout();
        setUserLogged(undefined);
    };
    
    return (
        <div className="layout" >
            <div className="user-info" >
                <button className="logout" onClick={handleLogOut} >Sair</button>
                <span>{userLogged.email}</span>
            </div>
            <br />
            <div className="form-section" >
                <FormCreateRoom />
            </div>
            <br/>
            <h3 className="title" >Minhas salas:</h3>
            <br/>
            <RoomsList />
        </div>
    );
}

export default Home;