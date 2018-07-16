/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import Home from "./src/js/screen/home/Home";
import New from "./src/js/screen/new/New";
import Top from "./src/js/screen/top/Top";
import FullChap from "./src/js/screen/fullchap/FullChap";

import { createStackNavigator } from "react-navigation";

const Navigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    New: {
      screen: New
    },
    Top: {
      screen: Top
    },
    FullChap: {
      screen: FullChap
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      screen: null,
      data: [
        {
          screen: "Home",
          title: "Trang chủ",
          isActive: true,
          id: 0,
          color: "red"
        },
        {
          screen: "Top",
          title: "Xem nhiều",
          isActive: false,
          id: 1,
          color: "black"
        },
        {
          screen: "New",
          title: "Mới đăng",
          isActive: false,
          id: 2,
          color: "black"
        },
        {
          screen: "FullChap",
          title: "Hoàn thành",
          isActive: false,
          id: 3,
          color: "black"
        }
      ]
    };
  }

  _navigateToDetailScreen = () => {
    this.props.navigation.navigate("DetailScreen");
  }

  _renderContentView(type, id) {
    console.log("main = ", this);

    let screen = "";
    switch (type) {
      case "Home":
        screen = <Home main={this} />;
        break;
      case "Top":
        screen = <Top />;
        break;
      case "New":
        screen = <New />;
        break;
      case "FullChap":
        screen = <FullChap />;
        break;
      default:
        screen = <Home />;
        break;
    }
    this.setState({
      screen: screen,
      data: this.state.data.map(item => {
        return { ...item, color: item.id === id ? "red" : "black" };
      })
    });
  }

  componentDidMount() {
    this._renderContentView("Home", 0);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "yellow", height: 45 }} />

        {/* {this.state.screen} */}
        <Navigator screenProps={this} />

        <View
          style={{
            backgroundColor: "yellow",
            height: 45,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          {this.state.data.map(item => {
            return (
              <TouchableOpacity
                key={item.title}
                // onPress={() => this._renderContentView(item.screen, item.id)}
                // onPress={() => this.props.navigation.navigate(item.screen)}
                onPress={() => console.log("this.refs.navigation", this.refs.navigation)}
              >
                <Text style={{ color: item.color }}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
