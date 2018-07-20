import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { requestGet } from '../../http/HttpUtils';


class LoadScreen extends Component {

    /**
     * Load danh sách truyện cho màn hình Home.
     */
    loadDataForHomeScreen = async () => {

        try {
            let res = await requestGet("https://khac-bac.herokuapp.com/listTruyen/1");
            let resJson = await res.json();

            console.log("resJson -> ", resJson)

            this.props.dispatch({
                type: "ADD_HOME_DATA",
                data: resJson
            });
        } catch (error) {
            console.log("error == ", error);
        }
    }

    /**
     * Load danh sách truyện cho màn hình Top.
     */
    loadDataForTopScreen = async () => {

        try {
            let res = await requestGet("https://khac-bac.herokuapp.com/listHot");
            let resJson = await res.json();

            console.log("resJson -> ", resJson)

            this.props.dispatch({
                type: "ADD_TOP_DATA",
                data: resJson
            });
        } catch (error) {
            console.log("error == ", error);
        }
    }

    /**
     * Load danh sách truyện cho màn hình New.
     */
    loadDataForNewScreen = async () => {

        try {
            let res = await requestGet("https://khac-bac.herokuapp.com/listPostNew/1");
            let resJson = await res.json();

            console.log("resJson -> ", resJson)

            this.props.dispatch({
                type: "ADD_NEW_DATA",
                data: resJson
            });
        } catch (error) {
            console.log("error == ", error);
        }
    }

    /**
     * Load danh sách truyện cho màn hình FullChap.
     */
    loadDataForFullChapScreen = async () => {

        try {
            let res = await requestGet("https://khac-bac.herokuapp.com/listFullChap/1");
            let resJson = await res.json();

            console.log("resJson -> ", resJson)

            this.props.dispatch({
                type: "ADD_FINISH_DATA",
                data: resJson
            });
        } catch (error) {
            console.log("error == ", error);
        }
    }

    /**
    * Ẩn layout footer và header khi đang ở màn hình LoadScreen.
    */
    hideFooterLayout = () => {
        this.props.dispatch({
            type: "VISIBILITY_FOOTER",
            footerState: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading data ...</Text>
            </View>
        );
    }

    componentDidMount() {
        /**
         * Load danh sách truyện cho màn hình FullChap.
         */
        this.loadDataForHomeScreen();

        /**
         * Load danh sách truyện cho màn hình FullChap.
         */
        this.loadDataForTopScreen();

        /**
         * Load danh sách truyện cho màn hình FullChap.
         */
        this.loadDataForNewScreen();

        /**
         * Load danh sách truyện cho màn hình FullChap.
         */
        this.loadDataForFullChapScreen();

        /**
         * Ẩn layout footer và header khi đang ở màn hình LoadScreen.
         */
        this.hideFooterLayout();

        /**
         * Chuyển sang màn hình Home.
         */
        setTimeout(() => {
            this.props.navigation.navigate("Home");
            this.props.dispatch({
                type: "VISIBILITY_FOOTER",
                footerState: true
            })
        }, 3000);
    }
}

export default connect()(LoadScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});