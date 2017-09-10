import React, {Component} from 'react';
import {View, StyleSheet, Text,Dimensions} from 'react-native';

const width = Dimensions.get('window').width; // 360
const height = Dimensions.get('window').height; // 592

export default class Header extends Component {
    render() {
        return(
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    To-Do List
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        backgroundColor: '#ff7f50',
        paddingTop: 0.05*height,
        paddingBottom: 0.02*height,
        flexDirection: 'row'
    },
    titleText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 30,
    },
});