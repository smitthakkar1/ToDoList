import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBzfHW5mv_8gu7x_PeAtozqmHj4JnnAvNc",
    authDomain: "todoapp-c5d27.firebaseapp.com",
    databaseURL: "https://todoapp-c5d27.firebaseio.com",
    projectId: "todoapp-c5d27",
    storageBucket: "todoapp-c5d27.appspot.com",
    messagingSenderId: "414720284433"
};
firebase.initializeApp(config);

class ToDoList extends Component {
    constructor(props) {
        super(props);
        var database = firebase.database().ref();
    }
}

AppRegistry.registerComponent('ToDoList', () => ToDoList);
