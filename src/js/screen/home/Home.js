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
import colors from "../../../res/colors";

const { width, height } = Dimensions.get("window");

class Home extends Component {
  constructor(props) {
    super(props);
    this.main = this.props.screenProps;
    this.state = {
      index: 1,
      isLoadMore: false,
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

  onEndReached = () => {
    // this.setState({ isLoadMore: true, index: this.state.index + 1 }, async () => {
    //   try {
    //     let res = await requestGet("https://khac-bac.herokuapp.com/listTruyen/" + this.state.index);
    //     let resJson = await res.json();

    //     // this.props.dispatch({
    //     //   type: "ADD_HOME_DATA",
    //     //   data: resJson
    //     // });

    //     this.setState({
    //       data: [...this.state.data, ...resJson]
    //     })

    //   } catch (error) {
    //     console.log("error == ", error);
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />

        {this.state.isLoadMore && <ActivityIndicator size="large" color={colors.colorMain} />}

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
            color={colors.colorMain}
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
  //     let res = await requestGet("https://khac-bac.herokuapp.com/listTruyen/1");
  //     let resJson = await res.json();
  //     this.setState({
  //       data: resJson
  //     });
  //   } catch (error) {
  //     console.log("error == ", error);
  //   }
  // }
}

mapStateToProps = state => {
  return {
    data: state.homeData
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  }
});
