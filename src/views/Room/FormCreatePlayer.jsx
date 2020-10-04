import React, { useContext, useEffect, useRef } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import { useParams } from 'react-router-dom';

import './FormCreatePlayer.css';

function FormCreatePlayer(props) {
    const { room } = props;
    const { userLogged } = useContext(AppContext);
    const params = useParams();
    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.elements['namePlayer'].value = userLogged.name;
    }, [userLogged]);

    function handleCreatePlayer(e) {
        e.preventDefault();
        const namePlayer = formRef.current.elements['namePlayer'].value;

        const docRef = firebase.db.collection('game-rooms').doc(params.id);
        const newData = {
            userId: userLogged.uid,
            userName: namePlayer
        };

        room.players.push(newData);
        docRef.update({
            players: room.players
        });

        // zerar inpout
        formRef.current.elements['namePlayer'].value = '';
    };

    function handleCreateObserver() {
        const docRef = firebase.db.collection('game-rooms').doc(params.id);
        const newData = {
            userId: userLogged.uid,
            userName: userLogged.email
        };

        room.observers.push(newData);
        docRef.update({
            observers: room.observers
        });
    }

    return (
        <div className="form-layout">
            <form ref={formRef} onSubmit={handleCreatePlayer} >
                <div className="form-content">
                    <input id="namePlayer" label="Nome do jogador" />
                    <button type="submit" className="btn-player" >Criar jogador</button>
                </div>
            </form>
            <button type="submit" onClick={handleCreateObserver} >
                Observador
            </button>
        </div>
    );
}

export default FormCreatePlayer;