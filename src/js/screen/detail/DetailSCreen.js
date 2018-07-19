import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { requestGet } from "./../../http/HttpUtils";

import { connect } from 'react-redux';

import colors from '../../../res/colors';

const { width, height } = Dimensions.get("window");

const data = require('./data.json');

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  renderFLItem = ({ item }) => {
    return (
      <FlatListItem item={item} />
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>Chapter</Text>
        </View>

        <FlatList
          data={this.state.data}
          renderItem={this.renderFLItem}
          keyExtractor={(item, index) => index.toString()}
        />

        {this.state.data.length === 0 && (
          <ActivityIndicator
            style={{ ...StyleSheet.absoluteFillObject }}
            size="large"
            color={colors.colorMain}
          />
        )}
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
  //       data: this.state.data.push(resJson)
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

class FlatListItem extends Component {

  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.state = {
      isActive: false
    }
  }

  render() {

    // Màu cho text khi đã click vào  xem.
    let colorActive = this.state.isActive ? colors.colorRed : colors.colorBlack;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            isActive: true
          })
        }}
        style={flStyles.container}>

        {/* text chapter */}
        <Text
          style={[flStyles.title, { color: colorActive }]}
        >{this.item.title}
        </Text>

        {/* thời gian update chap */}
        <Text
          style={[flStyles.updateTime, { color: colorActive }]}
        >{`Update time: ${this.item.updateTime}`}
        </Text>

      </TouchableOpacity>
    )
  }
}

export default connect()(DetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: colors.colorMain,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTxt: {
    fontSize: 18,
    color: colors.colorRed,
    fontWeight: 'bold'
  }
});


const flStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.colorWhite
  },
  updateTime: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 16,
  }
})