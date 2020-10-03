import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <ul>
                {rooms?.map((room, i) => (
                    <li key={`rooms-${i}`} >
                        <Link to={`/room/${room.roomId}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomsList;