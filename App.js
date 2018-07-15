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
  BackHandler,
  TouchableOpacity
} from "react-native";

import Home from "./src/js/screen/home/Home";
import New from "./src/js/screen/new/New";
import Top from "./src/js/screen/top/Top";
import FullChap from "./src/js/screen/fullchap/FullChap";

import DetailScreen from "./src/js/screen/detail/DetailSCreen";

import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";

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
    },
    DetailScreen: {
      screen: DetailScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props);
  }

  _navigateToDetailScreen = () => {
    this.props.navigation.navigate("DetailScreen");
  };

  _naviagteTabScreen(item) {
    this.refs.navigator._navigation.navigate(item.screen);
    this.props.dispatch({
      type: "CHANGE_STATE_FOOTER",
      id: item.id
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "yellow", height: 45 }} />

        <Navigator ref="navigator" main={this} />

        {this.props.footerVisible && (
          <View
            style={{
              backgroundColor: "yellow",
              height: 45,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            {this.props.footerData.map(item => {
              return (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => this._naviagteTabScreen(item)}
                >
                  <Text style={{ color: item.isActive ? "red" : "black" }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    data: state.data,
    screenState: state.screenState,
    footerVisible: state.footerVisible,
    footerData: state.footerData
  };
};

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
