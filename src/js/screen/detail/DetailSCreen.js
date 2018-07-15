import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions,BackHandler } from "react-native";

import { requestGet } from "./../../http/HttpUtils";

import {connect} from 'react-redux';

const { width, height } = Dimensions.get("window");

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: []
    // };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>adadddadd</Text>
        {/* <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return <Text>{item.title}</Text>;
          }}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </View>
    );
  }

  // async componentDidMount() {
  //   try {
  //     let res = await requestGet(
  //       "https://khac-bac.herokuapp.com/listChapter/0"
  //     );
  //     let resJson = await res.json();
  //     this.setState({
  //       data: resJson
  //     });
  //   } catch (error) {
  //     console.log("error == ", error);
  //   }
  // }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.dispatch({
      type: "VISIBILITY_FOOTER",
      footerState: true
    });
    this.goBack();
    return true;
  };

  goBack = async () => {
    await this.props.navigation.goBack();
  };
}

export default connect()(DetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
