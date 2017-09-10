import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';
import {nav} from './src/routes';
// import * as firebase from 'firebase';
import {firebaseref} from './src/firebase'

const ToDoList = nav;


AppRegistry.registerComponent('ToDoList', () => ToDoList);