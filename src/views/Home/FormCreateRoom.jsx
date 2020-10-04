import React, { useContext, useRef } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';

import './FormCreateRoom.css';

const buttonVotes = '0,1,2,3,5,8,13,20,40,?';

function FormCreateRoom() {
    const { userLogged } = useContext(AppContext);
    const formRef = useRef(null);

    async function handleCreateRoom(e) {
        e.preventDefault();
        const nameRoom = formRef.current.elements['nameRoom'].value;

        if (nameRoom) {
            const roomId = `${userLogged.uid}-${new Date().getTime()}${Math.floor(Math.random() * 101)}`;
            const newData = {
                roomId: roomId,
                name: nameRoom,
                createBy: userLogged.uid,
            };

            const docRef = firebase.db.collection('rooms').doc(userLogged.uid);
            const data = (await docRef.get()).data();

            if (data && data.rooms.length > 0) {
                data.rooms.push(newData);
                docRef.update({
                    ...data,
                    rooms: data.rooms
                });
            } else {
                docRef.set({ rooms: [newData] });
            }

            const docRef_gameRoom = firebase.db.collection('game-rooms').doc(roomId);
            docRef_gameRoom.set({
                buttons: buttonVotes.split(','),
                createBy: userLogged.uid,
                votes: [],
                players: [],
                observers: [],
                average: 0,
                subject: '',
                showVotes: false,
            });

            // zerar input
            formRef.current.elements['nameRoom'].value = '';
        } else {
            alert('Nome da sala não informado!');
        }
    };

    return (
        <form ref={formRef} onSubmit={handleCreateRoom} >
            <div className="form-layout" >
                <input id="nameRoom" label="Nome da sala" />
                <button type="submit" >Criar sala</button>
            </div>
        </form>
    );
}

export default FormCreateRoom;