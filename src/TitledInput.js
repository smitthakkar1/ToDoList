import React, { Component } from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';


export const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label.toUpperCase()}</Text>
            <TextInput
                autoCorrect={false}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={styles.inputStyle}
                underlineColorAndroid="white"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        height: 50,
        width:'100%'
    },
    labelStyle: {
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '200',
        flex: 1
    },
    containerStyle: {
        margin:10,
        height:'20%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        borderColor: '#D4D4D4',
        borderBottomWidth: 1,
        backgroundColor:'white'

    }
});

