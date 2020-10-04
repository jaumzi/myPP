import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import { Link } from 'react-router-dom';

import './RoomsList.css';

function RoomsList() {
    const { userLogged } = useContext(AppContext);
    const [state, setState] = useState({
        rooms: []
    });
    const { rooms } = state;

    useEffect(() => {
        const listenerRooms = firebase.db.collection('rooms').doc(userLogged.uid)
            .onSnapshot(function (doc) {
                setState(prev => ({ ...prev, rooms: doc.data()?.rooms }));
            });

        return () => {
            listenerRooms();
        };
    }, [userLogged]);

    async function handleRoomDelete(roomId) {
        const docFirebaseRef = firebase.db.collection('rooms').doc(userLogged.uid);
        const data = (await docFirebaseRef.get()).data();
        const newRooms = data.rooms.filter(room => room.roomId !== roomId);
        docFirebaseRef.update({ rooms: newRooms });


        const docRef_gameRoom = firebase.db.collection('game-rooms').doc(roomId);
        docRef_gameRoom.delete();
    }

    return (
        <div className="list">
            <ul>
                {rooms?.map((room, i) => (
                    <li key={`rooms-${i}`}>
                        <div className="list-option" >
                            <Link to={`/room/${room.roomId}`}>{room.name}</Link>
                            <button className="btn-delete" onClick={() => handleRoomDelete(room.roomId)} >Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomsList;