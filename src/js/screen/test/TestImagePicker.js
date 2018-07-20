import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    // customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: {}
        }
    }

    openCamera() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            // else if (response.customButton) {
            //     console.log('User tapped custom button: ', response.customButton);
            // }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image

                    style={{ width: 200, height: 200 }}
                    source={this.state.avatarSource}
                />
                <TouchableOpacity onPress={() => this.openCamera()}>

                    <Text>Open Image</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});