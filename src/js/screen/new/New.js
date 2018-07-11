import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';

import {
    requestGet
} from './../../http/HttpUtils';


export default class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    _renderItem = ({ item }) => {
        return (
            <Text>{item.title}</Text>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                {this.state.data.length === 0 && <ActivityIndicator
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    size='large'
                    color='cyan'
                />}
            </View>
        );
    }

    async componentDidMount() {
        try {
            let res = await requestGet("https://khac-bac.herokuapp.com/listNew");
            let resJson = await res.json();
            this.setState({
                data: resJson
            })
        } catch (error) {
            console.log("error == ", error);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});