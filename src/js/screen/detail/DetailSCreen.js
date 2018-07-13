import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList,Dimensions } from "react-native";

import { requestGet } from "./../../http/HttpUtils";

const { width, height } = Dimensions.get("window");

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <View style={styles.container}>
      <Text>adadddadd</Text>
        <FlatList 
            data={this.state.data}
            renderItem={({item})=>{
                return (
                    <Text>{item.title}</Text>
                )
            }}
        />
      </View>
    );
  }

  async componentDidMount() {
    try {
      let res = await requestGet("https://khac-bac.herokuapp.com/listChapter/0");
      let resJson = await res.json();
      this.setState({
        data: resJson
      });
    } catch (error) {
      console.log("error == ", error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
