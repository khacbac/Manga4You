import { AppRegistry } from "react-native";
import React, { Component } from "react";
import App from "./App";
import { createStackNavigator } from "react-navigation";

import DetailScreen from "./src/js/screen/detail/DetailSCreen";

import { createStore } from "redux";
import { Provider } from "react-redux";

const defaultState = {
  data: 0,
  screenState: "App",
  footerVisible: true,
  // Danh sách các item bottom footer.
  footerData: [
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
  ],
  // Lưu trữ toàn bộ  danh sách truyện .
  homeData: [],
  // Lưu trữ danh sách truyện xem nhiều.
  topData: [],
  // Lưu trữ danh sách truyện mới đăng.
  newData: [],
  // Lưu trữ danh sách truyện đã hoàn thành.
  finishData: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_SCREEN_STATE":
      return { ...state, screenState: action.screen };
    case "VISIBILITY_FOOTER":
      return { ...state, footerVisible: action.footerState };
    case "CHANGE_STATE_FOOTER":
      return {
        ...state,
        footerData: state.footerData.map(item => {
          if (item.id === action.id) return { ...item, isActive: true };
          return { ...item, isActive: false };
        })
      };
    case "ADD_HOME_DATA":
      return {
        ...state,
        homeData: [...state.homeData, ...action.data],
      }
    case "ADD_TOP_DATA":
      return {
        ...state,
        topData: action.data,
      };
    case "ADD_NEW_DATA":
      return {
        ...state,
        newData: action.data,
      }
    case "ADD_FINISH_DATA":
      return {
        ...state,
        finishData: action.data,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

class AppIndex extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("Manga4You", () => AppIndex);
