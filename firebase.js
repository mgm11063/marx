import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAzwLQRo-iqgTuK5byPV7SVX_LHEKHFeNc",
    authDomain: "marx-1a2a6.firebaseapp.com",
    projectId: "marx-1a2a6",
    storageBucket: "marx-1a2a6.appspot.com",
    messagingSenderId: "686539125823",
    appId: "1:686539125823:web:1a35a1a47e68e3a538748a"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { auth, db, storage };