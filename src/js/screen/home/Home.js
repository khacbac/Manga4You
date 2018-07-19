import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { requestGet } from "./../../http/HttpUtils";

import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

class Home extends Component {
  constructor(props) {
    super(props);
    this.main = this.props.screenProps;
    this.state = {
      data: []
    };

    // console.log("Main => ",this.props.navigation.getParam("item"))
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("DetailScreen", {
            LINK_MANGA: item.href
          });
          this.props.dispatch({
            type: "VISIBILITY_FOOTER",
            footerState: false
          });
          console.log("data from store = ", item);
        }}
        style={{ flex: 1, margin: 5, borderRadius: 10 }}
      >
        <Image
          style={{ width: "100%", height: height / 4, borderRadius: 10 }}
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
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Tìm truyện"
          onChangeText={text => {
            if (text.length > 3) {
              requestGet("http://khac-bac.herokuapp.com/searchmanga/" + text)
                .then(response => response.json())
                .then(responseJson => {
                  this.setState({ data: responseJson });
                });
            }
            if (text === "") {
              requestGet("https://khac-bac.herokuapp.com/listTruyen/1" + text)
                .then(response => response.json())
                .then(responseJson => {
                  this.setState({ data: responseJson });
                });
            }
          }}
        />
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
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

  async componentDidMount() {
    try {
      let res = await requestGet("https://khac-bac.herokuapp.com/listTruyen/1");
      let resJson = await res.json();
      this.setState({
        data: resJson
      });
    } catch (error) {
      console.log("error == ", error);
    }
  }
}

mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  }
});
