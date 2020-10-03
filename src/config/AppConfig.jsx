import React, { createContext, useEffect, useState } from 'react';
import firebase from './FirebaseConfig';

const AppContext = createContext({
    setUserLogged: () => { }
});

function AppConfig(props) {
    const { children } = props;

    const [state, setState] = useState({
        firebaseInitialized: false,
        userLogged: undefined
    });
    const { firebaseInitialized } = state;

    useEffect(() => {
        firebase.observerLogin().then((user) => {
            if (user) {
                const {
                    uid,
                    email,
                    displayName: name,
                    photoURL: photo
                } = user;
                setState(old => ({
                    ...old,
                    userLogged: {
                        uid,
                        email,
                        name,
                        photo
                    },
                    firebaseInitialized: firebase.isInitialized()
                }));
            } else {
                setState(old => ({
                    ...old,
                    firebaseInitialized: firebase.isInitialized()
                }));
            }
        }).catch((err) => {
            setState(old => ({
                ...old,
                userLogged: undefined,
                firebaseInitialized: firebase.isInitialized()
            }));
        });
    }, []);

    function setUserLogged(user) {
        setState(old => ({ ...old, userLogged: user }));
    }

    return (
        <>
            <AppContext.Provider
                value={{
                    ...state,
                    setUserLogged
                }}
            >
                {firebaseInitialized ? (
                    children
                ) : (
                        <h1>Carregando!</h1>
                    )}
            </AppContext.Provider>
        </>
    );
}

export { AppConfig, AppContext };