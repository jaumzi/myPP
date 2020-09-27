import React, { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';

const buttonVotes = '0,1,2,3,5,8,13,20,40,?';

function FormCreateRoom() {
    const { userLogged } = useContext(AppContext);
    const formRef = useRef(null);

    const { teste } = useParams();

    async function handleCreateRoom (e) {
        e.preventDefault();
        const nameRoom = formRef.current.elements['nameRoom'].value;
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

        // zerar inpout
        formRef.current.elements['nameRoom'].value = '';
    };

    return (
        <form ref={formRef} onSubmit={handleCreateRoom} >
            <div>
                <input id="nameRoom" label="Nome da sala" />
                <button type="submit" >Criar sala</button>
            </div>
        </form>
    );
}

export default FormCreateRoom;