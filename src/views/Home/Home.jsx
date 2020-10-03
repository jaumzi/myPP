import React, { useContext } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import FormCreateRoom from './FormCreateRoom';
import RoomsList from './RoomsList';

function Home() {
    const { setUserLogged } = useContext(AppContext);

    const handleLogOut = () => {
        firebase.logout();
        setUserLogged(undefined);
    };
    
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