import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {View, Text} from 'react-native';
import Main from './Main';
import Login from './Login'
import Header from './Header'
const Tabs = TabNavigator({
   All:{
       screen: Main,
   },
    Open:{
       screen: Main,
    },
    Completed:{
       screen: Main,
    }
});

export const nav = StackNavigator({
    Login:{
        screen: props => <Login navigation={props.navigation} />
        // screen:<View><Text>Hi</Text></View>
    },
    Main:{
      screen: Tabs,
    }
},{
    headerMode:'screen',
    navigationOptions:{
        header: () => <Header/>
    }});