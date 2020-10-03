import React, { memo, useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';

import './Room.css';
import { URL_BASE } from '../../config/Constants';
import FormCreatePlayer from './FormCreatePlayer';
import FormSubject from './FormSubject';

function Room() {
    const { userLogged } = useContext(AppContext);
    const history = useHistory();
    const params = useParams();
    const [state, setState] = useState({
        room: undefined,
        textCopy: false,
    });
    const { room, textCopy } = state;

    const docFirebaseRef = firebase.db.collection('game-rooms').doc(params.id);

    useEffect(() => {
        const listenerRoom = docFirebaseRef.onSnapshot(function (doc) {
            setState(prev => ({ ...prev, room: doc.data() }));
        });

        return () => {
            listenerRoom();
        };
    }, [docFirebaseRef]);

    function handleVote(vote) {
        const voteIndex = room.votes.findIndex(vote => vote.userId === userLogged.uid);
        if (voteIndex >= 0) {
            const voteData = {
                userId: userLogged.uid,
                userName: player.userName,
                value: vote
            };

            room.votes[voteIndex] = voteData;
        } else {
            room.votes.push({
                userId: userLogged.uid,
                userName: player.userName,
                value: vote
            });
        }

        docFirebaseRef.update({
            votes: room.votes,
        });
    }

    function handleExit() {
        docFirebaseRef.update({
            players: room.players.filter(player => player.userId !== userLogged.uid),
            observers: room.observers.filter(observer => observer.userId !== userLogged.uid)
        });
    }
    function handleVotes() {
        docFirebaseRef.update({
            showVotes: !room.showVotes
        });
    }
    function handleClearVotes() {
        docFirebaseRef.update({
            votes: [],
            showVotes: false
        });
    }
    function calcAverage() {
        let average = 0;
        let totalVotes = 0;
        if (room?.votes?.length > 0) {
            room.votes.map(vote => {
                return totalVotes += Number(vote.value) || 0;
            });
            average = (totalVotes / room?.votes?.length);
        }

        return average;
    }

    const player = room?.players?.find(player => player.userId === userLogged.uid);
    const observer = room?.observers?.find(observer => observer.userId === userLogged.uid);
    const link = URL_BASE + history.location.pathname;
    const vote = room?.votes?.find(vote => vote.userId === userLogged.uid);
    const average = calcAverage();

    return (
        <div>
            <Link to='/'>Voltar para início</Link>
            <br />
            {!!room && (
                <>
                    <div>
                        <h4>Link para compartilhar:</h4>
                        <div>
                            <h3>{link}</h3>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(link);
                                    setState(prev => ({ ...prev, textCopy: true }));
                                }}
                            >
                                Clique aqui para copiar
                            </button>
                            {textCopy && (
                                <span>Copiado!</span>
                            )}
                        </div>
                    </div>

                    <br />
                    <br />

                    {(!player && !observer) && (
                        <FormCreatePlayer room={room} />
                    )}

                    {(player || observer) && (
                        <>

                            <button onClick={handleExit}>{`Sair do perfil de '${player ? 'Jogador' : 'Observador'}'`}</button>

                            <br />
                            <br />

                            {room.createBy === userLogged.uid && (
                                <FormSubject subject={room.subject} />
                            )}

                            <h5>Assunto: {room.subject}</h5>

                        </>
                    )}

                    {player && (
                        <div className="gridButtons">
                            {room.buttons.map((btn, i) => (
                                <button
                                    key={`buttons-${i}`}
                                    className={vote?.value === btn ? 'btn-vote-active' : 'btn-vote'}
                                    onClick={() => handleVote(btn)}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    )}

                    {room.createBy === userLogged.uid && (
                        <>
                            <button
                                onClick={handleVotes}
                            >
                                {room.showVotes ? 'Esconder votos' : 'Mostrar votos'}
                            </button>
                            <button
                                onClick={handleClearVotes}
                            >
                                Limpar votos
                            </button>
                        </>
                    )}

                    {(room?.votes.length > 0) && (
                        <div>
                            {room?.votes.map((vote, i) => (
                                <div key={`votes-${i}`}>
                                    <span><strong>{vote.userName}</strong></span>
                                    <span>{room.showVotes ? vote.value : 'X'}</span>
                                </div>
                            ))}
                            {room.showVotes && (
                                <div>
                                    <span><strong>Média</strong></span>
                                    <span>{average}</span>
                                </div>
                            )}
                        </div>
                    )}

                </>
            )}
            {!room && (
                <h4>Nenhuma sala encontrada!</h4>
            )}

        </div>
    );
}

export default memo(Room);