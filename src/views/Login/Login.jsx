import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';

import './Login.css';

function Login() {
    const history = useHistory();
    const { setUserLogged } = useContext(AppContext);

    const handleClick = () => {
        firebase.login()
            .then(({
                user: {
                    uid,
                    email,
                    displayName: name,
                    photoURL: photo
                }
            }) => {
                setUserLogged({
                    uid,
                    email,
                    name,
                    photo
                });
                history.push('/');
            }).catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="login-layout">
            <h3>Faça login</h3>
            <button onClick={handleClick} >Entrar com google</button>
        </div>
    );
}

export default Login;