import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';

function Login() {
    const history = useHistory();
    const { setUserLogged, userLogged: logged } = useContext(AppContext);

    const [state, setState] = useState({
        userLogged: !!logged ?? false,
    });
    const { userLogged } = state;

    const handleClick = () => {
        firebase.login().then(
            ({ user: {
                uid,
                email,
                displayName: name,
                photoURL: photo
            } }) => {
                setState(old => ({ ...old, userLogged: true }));
                setUserLogged({
                    uid,
                    email,
                    name,
                    photo
                });
            }).catch((err) => {
                console.log(err);
            });
    };

    console.log(userLogged);
    if (userLogged) {
        history.push('/');
    }

    return (
        <div>
            <h3>Faça login</h3>
            <button onClick={handleClick} >Entrar com google</button>
        </div>
    );
}

export default Login;