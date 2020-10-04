import React, { useContext, useEffect, useRef } from 'react';
import firebase from '../../config/FirebaseConfig';
import { AppContext } from '../../config/AppConfig';
import { useParams } from 'react-router-dom';

import './FormSubject.css';

function FormSubject(props) {
    const { subject } = props;
    const { userLogged } = useContext(AppContext);
    const params = useParams();
    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.elements['subject'].value = subject;
    }, [subject]);

    async function handleDefineSubject(e) {
        e.preventDefault();
        const subject = formRef.current.elements['subject'].value;

        const docRef = firebase.db.collection('game-rooms').doc(params.id);
        const data = (await docRef.get()).data();

        if (data.createBy === userLogged.uid) {
            docRef.update({
                subject
            });
        }

        // zerar inpout
        formRef.current.elements['subject'].value = '';
    };

    return (
        <div className="form-layout" >
            <form ref={formRef} onSubmit={handleDefineSubject} >
                <div className="form-content" >
                    <input id="subject" label="Assunto" />
                    <button type="submit">Definir assunto</button>
                </div>
            </form>
        </div>
    );
}

export default FormSubject;