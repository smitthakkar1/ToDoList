import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';
import {nav} from './src/routes';

const ToDoList = nav;

AppRegistry.registerComponent('ToDoList', () => ToDoList);


