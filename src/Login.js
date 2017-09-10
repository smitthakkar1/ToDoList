import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import {TitledInput} from './TitledInput';
import {firebaseref} from './firebase'
export default class Login extends Component {
    constructor(props){
        super(props);
        // const { navigation } = this.props.navigation;

    }

    state = { email: '', password: '', error: '', loading: false };

    onLoginPress() {

        this.setState({ error: '', loading: true });
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        this.setState({ error: '', loading: false });
                        this.props.navigation.navigate('Main');
                        alert('Congratulations ! Your New Account Has Been Created !');

                    })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false });
                    });
            });
    }
    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.onLoginPress.bind(this)} title="Sign Up / Log In" />;
    }
    render() {
        return (
            <View>
                <TitledInput
                    label='Email Address'
                    placeholder='enter your email'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TitledInput
                    label='Password'
                    autoCorrect={false}
                    placeholder='enter your password'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                {this.renderButtonOrSpinner()}
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
};
