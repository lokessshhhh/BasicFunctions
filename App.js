import React, { Component } from 'react';
import { Text, View, TextInput, FlatList } from 'react-native';

const data = [
  { name: 'Apple', price: 1.5 },
  { name: 'Banana', price: 0.5 },
  { name: 'Cherry', price: 2.0 },
  { name: 'Durian', price: 3.0 },
  { name: 'Eggplant', price: 1.0 },
  { name: 'Fig', price: 2.5 },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterPrice: null,
      filterAlpha: null,
      searchText: '',
    };
  }

   onChange = (e) => {
    const value = e.target.value

    switch(value) {
        case "ascending":
            setDisplayPage(displayPage.sort((a, b) => a.label.localeCompare(b.label)))
            break
        case "descending":
            setDisplayPage(displayPage.sort((a, b) => b.label.localeCompare(a.label)))
            break
        case "high-price":
            setDisplayPage(displayPage.sort((a, b) => b.price - a.price))
            break
        case "low-price":
             setDisplayPage(displayPage.sort((a, b) => a.price - b.price))
            break
    }
}

  filterData(filterPrice, filterAlpha) {
    let filteredData = data;
    if (filterPrice) {
      filteredData = filteredData.filter(item => item.price <= filterPrice);
    }
    if (filterAlpha) {
      filteredData = filteredData.filter(item => item.name.toLowerCase().startsWith(filterAlpha.toLowerCase()));
    }
    return filteredData;
  }

  renderItem({ item }) {
    return (
      <View style={{ padding: 10 }}>
        <Text>{item.name}: ${item.price.toFixed(2)}</Text>
      </View>
    );
  }

  render() {
    const { filterPrice, filterAlpha, searchText } = this.state;

    const filteredData = this.filterData(filterPrice, filterAlpha);

    const searchData = filteredData.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <View style={{ padding: 20 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
          placeholder="Search"
          onChangeText={text => this.setState({ searchText: text })}
          value={searchText}
        />
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10 }}
            placeholder="Price filter"
            keyboardType="numeric"
            onChangeText={text => this.setState({ filterPrice: parseFloat(text) || null })}
            value={filterPrice?.toString() || ''}
          />
          <TextInput
            style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder="Alphabetical filter"
            onChangeText={text => this.setState({ filterAlpha: text.trim() || null })}
            value={filterAlpha || ''}
          />
        </View>
        <FlatList
          data={searchData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default App;
