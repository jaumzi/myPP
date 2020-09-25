import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';

import './Room.css';

function Room() {
    const params = useParams();
    const [state, setState] = useState({
        room: undefined
    });
    const { room } = state;

    useEffect(() => {
        const listenerRoom= firebase.db.collection('game-rooms').doc(params.id)
            .onSnapshot(function (doc) {
                if (!doc) {
                    console.log('sala nao encontrada');
                }
                console.log(doc, doc.data());
                setState(prev => ({ ...prev, room: doc.data() }));
            });

        return () => {
            listenerRoom();
        };
    }, []);

    console.log(room);

    return (
        <div>
            <Link to='/'>Voltar para início</Link>
            <br/>

            <div>
                <h4>Link para compartilhar:</h4>
                <h3>http://wwww.google.com</h3>
            </div>

            <div className="gridButtons">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
            </div>
            
        </div>
    );
}

export default Room;