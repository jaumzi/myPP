import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firebase-firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCeZqFdRzbDiIlyI-7vwGPU40HF2WPIG0U",
    authDomain: "mypp-367b7.firebaseapp.com",
    databaseURL: "https://mypp-367b7.firebaseio.com",
    projectId: "mypp-367b7",
    storageBucket: "mypp-367b7.appspot.com",
    messagingSenderId: "102452823500",
    appId: "1:102452823500:web:5c14f6e823711d892a0969",
    measurementId: "G-3WJGCTM4BR"
};
// Initialize Firebase

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        app.analytics();
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login() {
        var provider = new app.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        return this.auth.signInWithPopup(provider);
    }
    logout() {
        return this.auth.signOut()
    }

    userLogged() {
        return this.auth.currentUser;
    }
    isInitialized() {
        return app.apps.length !== 0;
    }
    observerLogin() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }
}

let instance = null;
const firebase = () => {
    if (!instance) {
        instance = new Firebase();
    }
    return instance;
}

export default firebase();