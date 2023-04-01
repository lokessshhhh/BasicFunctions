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
