import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAz9VTl0cXZpzNQs6uBZyTN1_Efu6qs2eI",
    authDomain: "todolist-8bbf8.firebaseapp.com",
    databaseURL: "https://todolist-8bbf8.firebaseio.com",
    projectId: "todolist-8bbf8",
    storageBucket: "todolist-8bbf8.appspot.com",
    messagingSenderId: "131237513819"
};
export const firebaseref = firebase.initializeApp(config);