import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

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
    },
    Main:{
      screen: Tabs,
    }
},{
    headerMode:'screen',
    navigationOptions:{
        header: () => <Header/>
    }});