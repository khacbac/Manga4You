import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
import { requestGet } from '../../http/HttpUtils';


export default class SearchManga extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Tìm truyện"
                    onChangeText={text => {
                        if (text.length > 2) {
                            requestGet("http://khac-bac.herokuapp.com/searchmanga/" + text)
                                .then(response => response.json())
                                .then(responseJson => {
                                    this.setState({ data: responseJson });
                                });
                        }
                    }}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});