import Firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyCRda2oG96e_-uWxCb-V5zlqs7D5tvsroY",
    authDomain: "react-firebase-b233e.firebaseapp.com",
    databaseURL: "https://react-firebase-b233e.firebaseio.com",
    projectId: "react-firebase-b233e",
    storageBucket: "",
    messagingSenderId: "554562450279",
    appId: "1:554562450279:web:3379133a004b488460b5c2"
};

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();