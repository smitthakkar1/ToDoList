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
    StatusBar
} from 'react-native';
import * as firebase from "firebase";

const width = Dimensions.get('window').width; // 360
const height = Dimensions.get('window').height; // 592

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
        // var database = firebase.database().ref();
        this.todoRef = firebase.database().ref().child('ToDo');
        this.state = {
            todo: '',
            todoSource: new ListView.DataSource({rowHasChanged:(row1,row2) => row1 !== row2})
        };
        this.todoItems = [];
    }

    componentDidMount(){
        this.todoRef.on('child_added', (data) => {
            this.todoItems.push({ id : data.key, text: data.val() });
            this.setState({
                todoSource:  this.state.todoSource.cloneWithRows(this.todoItems)
            });
        });

        this.todoRef.on('child_removed', (data) => {
            this.todoItems = this.todoItems.filter((removed) => removed.id != data.key);
            this.setState({
                todoSource:  this.state.todoSource.cloneWithRows(this.todoItems)
            })
        });
    }

    add(){
        if(this.state.todo != ''){
            this.todoRef.push({
                todo: this.state.todo
            });
            this.setState({
                todo: ''
            });
        }
    }

   removeToDo(data){
        this.todoRef.child(data.id).remove();
    }

    renderData(data) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'
                onPress={() => this.removeToDo(data)}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.todoText}>{data.text.todo}</Text>
                    </View>
                    <View style={styles.lineStyle} />
                </View>
            </TouchableHighlight>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#ffd92e"
                />
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        To-Do List
                    </Text>
                </View>
                <View style={styles.inputcontainer}>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({todo: text})} value={this.state.todo} underlineColorAndroid="white"/>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.add()}
                        underlayColor='#dddddd'>
                        <Text style={styles.btnText}>Add</Text>
                    </TouchableHighlight>
                </View>
                <ListView
                    dataSource={this.state.todoSource}
                    renderRow={this.renderData.bind(this)} />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    title:{
        backgroundColor: '#ffd92e',
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
        height: 0.08*height,
    },
    lineStyle: {
        height: 1,
        borderWidth:0.5,
        backgroundColor: '#CCCCCC',
    },
    todoText: {
        flex: 1,
        fontSize:18,
    }
});

AppRegistry.registerComponent('ToDoList', () => ToDoList);
