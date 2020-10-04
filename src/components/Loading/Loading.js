import React from 'react';
import './Loading.css';

function Loading () {

    return (
        <div className="loading-layout">
            <div className="loading" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1>Carregando!</h1>
        </div>
    );
}

export default Loading;