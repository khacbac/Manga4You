import { AppRegistry } from "react-native";
import App from "./App";
import { createStackNavigator } from "react-navigation";

import DetailScreen from "./src/js/screen/detail/DetailSCreen";

const Navigator = createStackNavigator(
  {
    App: {
      screen: App
    },
    DetailScreen: {
      screen: DetailScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "App"
  }
);

AppRegistry.registerComponent("Manga4You", () => Navigator);
