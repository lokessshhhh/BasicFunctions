import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      newTodo: '',
      editTodo: '',
      editIndex: null,
    };
  }

  async componentDidMount() {
    const todoList = await AsyncStorage.getItem('todoList');
    if (todoList) {
      this.setState({ todoList: JSON.parse(todoList) });
    }
  }

  handleNewTodo = (text) => {
    this.setState({ newTodo: text });
  };

  handleEditTodo = (text) => {
    this.setState({ editTodo: text });
  };

  handleAddTodo = async () => {
    const { newTodo, todoList } = this.state;
    if (newTodo) {
      const newTodoList = [...todoList, { text: newTodo, completed: false }];
      await AsyncStorage.setItem('todoList', JSON.stringify(newTodoList));
      this.setState({ todoList: newTodoList, newTodo: '' });
    }
  };

  handleEditStart = (index) => {
    const { todoList } = this.state;
    const editTodo = todoList[index].text;
    this.setState({ editIndex: index, editTodo });
  };

  handleEditCancel = () => {
    this.setState({ editIndex: null, editTodo: '' });
  };

  handleEditSave = async () => {
    const { editIndex, editTodo, todoList } = this.state;
    if (editTodo) {
      const newTodoList = [...todoList];
      newTodoList[editIndex].text = editTodo;
      await AsyncStorage.setItem('todoList', JSON.stringify(newTodoList));
      this.setState({ todoList: newTodoList, editIndex: null, editTodo: '' });
    }
  };

  handleToggleComplete = async (index) => {
    const { todoList } = this.state;
    const newTodoList = [...todoList];
    newTodoList[index].completed = !newTodoList[index].completed;
    await AsyncStorage.setItem('todoList', JSON.stringify(newTodoList));
    this.setState({ todoList: newTodoList });
  };

  handleDelete = async (index) => {
    const { todoList } = this.state;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    await AsyncStorage.setItem('todoList', JSON.stringify(newTodoList));
    this.setState({ todoList: newTodoList });
  };

  render() {
    const { todoList, newTodo, editTodo, editIndex } = this.state;
    return (
      <View>
        <TextInput value={newTodo} onChangeText={this.handleNewTodo} />
        <Button title="Add Todo" onPress={this.handleAddTodo} />
        <FlatList
          data={todoList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              {editIndex === index ? (
                <View>
                  <TextInput value={editTodo} onChangeText={this.handleEditTodo} />
                  <Button title="Save" onPress={this.handleEditSave} />
                  <Button title="Cancel" onPress={this.handleEditCancel} />
                </View>
              ) : (
                <View>
                  <Text>{






/// Second method 

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

export default class TodoList extends Component {
  state = {
    newTodo: '',
    todos: [],
  };

  async componentDidMount() {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos !== null) {
        this.setState({ todos: JSON.parse(todos) });
      }
    } catch (error) {
      console.log(error);
    }
  }

  addTodo = async () => {
    const { newTodo, todos } = this.state;
    if (newTodo !== '') {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        this.setState({ todos: updatedTodos, newTodo: '' });
      } catch (error) {
        console.log(error);
      }
    }
  };

  completeTodo = async (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      this.setState({ todos: updatedTodos });
    } catch (error) {
      console.log(error);
    }
  };

  removeTodo = async (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      this.setState({ todos: updatedTodos });
    } catch (error) {
      console.log(error);
    }
  };


  updateTodo = async (index, text) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos[index].text = text;
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      this.setState({ todos: updatedTodos });
    } catch (error) {
      console.log(error);
    }
    console.log(todos);
  };

  render() {
    const { newTodo, todos } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="New Todo"
          value={newTodo}
          onChangeText={(text) => this.setState({ newTodo: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.addTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
        <View style={styles.todos}>
          {todos.map((todo, index) => (
            <TouchableOpacity key={index} style={styles.todo} onPress={() => this.completeTodo(index)}>
              <Text style={[styles.todoText, todo.completed && styles.completed]}>{todo.text}</Text>
              <TouchableOpacity style={styles.remove} onPress={() => this.removeTodo(index)}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
  todos: {
    width: '100%',
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:
    
    
    
    
    
    
    
    export const getVehiclesData = async (Key, filter = '', type) => {

  const keyValue = Key !== '' ? `'${Key}'` : '';

  const filterString = filter !== '' ? `${filter}` : "";

  const filterData = type === 'Certified' ? `Certified=true AND Type=${keyValue} AND ${filterString}` : type === 'Special' ? Key === 'NEW' || Key === 'USED' ? `isspecial=true AND Type=${keyValue} AND ${filterString}` : `isspecial=true AND ${filterString}` : `Type=${keyValue} AND ${filterString}`

  const RooftopCollection = 'metrohonda';
  const FieldList = 'VIN,type,stock,year,make,model,extcolor, extcolorgeneric,extcolor_code ,type,make,trim,sellingprice,imagelist,chromemultiviewext1url,hnilotid,vehicletitle,standardbody,miles';
  const InventoryFilter = filterData;
  const token = '3f051f8c-348d-440e-9d6a-8c9364544ce1'

  const myPromise = new Promise((resolve, reject) => {
    fetch(BASE_URL + `LoadCompressedVehicles?IntegrationToken=${token}&RooftopCollection=${RooftopCollection}&FieldList=${FieldList}&InventoryFilter=${InventoryFilter}&type=${keyValue}&UpdatedSinceDate=''`, 'GET')
      .then((res) => {
        return res.text()
      }).then(async (results) => {
        xml2js.parseStringPromise(results, { trim: true }).then(async function (result) {
          const MyNewData = result?.CompressedInventoryResults?.CompressedVehicles?.toString()?.replace(/\"/gi, '"');
          const jsonResult = await convert.xml2json(MyNewData); // convert xml to json
          const data = JSON.parse(jsonResult);
          const finalData = [];
          data?.elements[0]?.elements[0]?.elements[0]?.elements[0]?.elements?.map(d => {
            const fields = Object?.values(data?.elements[0]?.attributes);
            const val = Object?.keys(data?.elements[0]?.attributes);
            let valueD = {};
            fields?.map((f, i) => {
              valueD = { ...valueD, [`${f}`]: d?.attributes[val[i]] }
            });
            finalData?.push(valueD);
          })
          resolve(finalData);
        }).catch(function (err) {
          console.log('err :: ', err);
          reject(err);
        });
      }).catch((err) => {
        console.log("getVehiclesData err", err);
      })
  });

  return myPromise.then((data) => {
    return data;
  })
};


