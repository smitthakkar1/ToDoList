import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    TouchableHighlight,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';
import { CheckBox } from 'native-base';
import * as firebase from "firebase";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from "./Header";

const width = Dimensions.get('window').width; // 360
const height = Dimensions.get('window').height; // 592
var user = firebase.auth().currentUser;

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.allRef = firebase.database().ref().child('All');
        this.openRef = firebase.database().ref().child('Open');
        this.completedRef = firebase.database().ref().child('Completed');
        this.state = {
            completedToDo: '',
            openToDo:'',
            allToDo:'',
            AlltodoSource: new ListView.DataSource({rowHasChanged:(row1,row2) => row1 !== row2}),
            OpentodoSource: new ListView.DataSource({rowHasChanged:(row3,row4) => row3 !== row4}),
            CompletedtodoSource: new ListView.DataSource({rowHasChanged:(row5,row6) => row5 !== row6})
        };
        this.all = [];
        this.open = [];
        this.completed = [];
    }

    componentDidMount(){
        this.allRef.on('child_added', (data) => {
            this.all.push({ id : data.key, text: data.val() });
            this.setState({
                AlltodoSource:  this.state.AlltodoSource.cloneWithRows(this.all)
            });
        });

        this.allRef.on('child_removed', (data) => {
            this.all = this.all.filter((removed) => removed.id != data.key);
            this.setState({
                AlltodoSource:  this.state.AlltodoSource.cloneWithRows(this.all)
            })
        });

        this.openRef.on('child_added', (data) => {
            this.open.push({ id : data.key, text: data.val() });
            this.setState({
                OpentodoSource:  this.state.OpentodoSource.cloneWithRows(this.open)
            });
        });

        this.openRef.on('child_removed', (data) => {
            this.open = this.open.filter((removed) => removed.id != data.key);
            this.setState({
                OpentodoSource:  this.state.OpentodoSource.cloneWithRows(this.open)
            })
        });

        this.completedRef.on('child_added', (data) => {
            this.completed.push({ id : data.key, text: data.val() });
            this.setState({
                CompletedtodoSource:  this.state.CompletedtodoSource.cloneWithRows(this.completed)
            });
        });

        this.completedRef.on('child_removed', (data) => {
            this.completed = this.completed.filter((removed) => removed.id != data.key);
            this.setState({
                CompletedtodoSource:  this.state.CompletedtodoSource.cloneWithRows(this.completed)
            })
        });
    }

    add(){

        if (user != null) {
            uid = user.uid;
            firebase.database().ref('/users/'+uid).push({
                AllToDo : this.allRef.push({
                    AllToDo: this.state.completedToDo
                }),
                OpenToDo: this.openRef.push({
                    OpenToDo: this.state.openToDo
                }),
                completedToDo: this.setState({
                    completedToDo: ''
                })
        });
        }
    }

    removeToDo(data){
        this.allRef.child(data.id).remove();
    }

    toCompleted(data){
        if(data.text != '') {
            this.completedRef.push({
                completedToDo: data
            });
            this.openRef.child().remove();
        }
    }

    
    renderData(data) {
        return (
            <View>
                <View style={styles.row}>
                    <CheckBox checked={false} onPress={() => this.toCompleted(data)} />
                    <Text style={styles.todoText}>{data.text.AllToDo}</Text>
                    <MaterialIcons.Button name="delete" size={25} color="black" onPress={() => this.removeToDo(data)} backgroundColor="rgba(0,0,0,0)" />
                </View>
                <View style={styles.lineStyle} />
            </View>
        );
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <StatusBar
                    backgroundColor="#ff7f50"
                />
                <View style={styles.inputcontainer}>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({completedToDo: text})} value={this.state.completedToDo} underlineColorAndroid="white"/>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.add()}
                        underlayColor='#dddddd'>
                        <Text style={styles.btnText}>Add</Text>
                    </TouchableHighlight>
                </View>
                <ListView
                    dataSource={this.state.AlltodoSource}
                    renderRow={this.renderData.bind(this)} />
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },

    inputcontainer: {
        marginTop: 0.01*height,
        padding: 0.02*height,
        flexDirection: 'row'
    },
    button: {
        height: 0.07*height,
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#ffd92e',
        justifyContent: 'center',
        // color: '#FFFFFF',
        borderRadius: 4,
    },
    btnText: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#fff',
        marginTop: 0.01*height,
    },
    input: {
        height: 0.07*height,
        padding: 0.01*height,
        marginRight: 0.015*width,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ffd92e',
        borderRadius: 4,
    },
    row: {
        flex:1,
        flexDirection: 'row',
        padding: 0.02*height,
        height: 0.1*height,
    },
    lineStyle: {
        height: 1,
        borderWidth:0.5,
        backgroundColor: '#CCCCCC',
    },
    todoText: {
        marginLeft: 0.08*width,
        textAlign:'center',
        flex: 1,
        fontSize:18,
    }
});
