import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { requestGet } from "./../../http/HttpUtils";

const { width, height } = Dimensions.get("window");
import { connect } from 'react-redux';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

    };
    console.log("Main => ", this.props.main)
  }

  _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, margin: 5, borderRadius: 10 }}>
        <Image
          style={{ width: "100%", height: height / 3, borderRadius: 10 }}
          source={{ uri: item.img.src }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            width: "100%",
            padding: 10,
            alignItems: "center",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
        >
          <Text
            style={{ color: "white", fontSize: 16 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />

        {this.state.data.length === 0 && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            size="large"
            color="cyan"
          />
        )}
      </View>
    );
  }

  componentDidMount() {
    // add data from store.
    this.setState({
      data: [...this.state.data, ...this.props.data]
    })
  }


  // async componentDidMount() {
  //   try {
  //     let res = await requestGet("https://khac-bac.herokuapp.com/listHot");
  //     let resJson = await res.json();
  //     this.setState({
  //       data: resJson
  //     });
  //   } catch (error) {
  //     console.log("error == ", error);
  //   }
  // }
}

mapStateToProp = (state) => {
  return {
    data: state.topData
  }
}

export default connect(mapStateToProp)(Top);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  }
});
