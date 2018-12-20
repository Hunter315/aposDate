import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { uploadImages } from "../redux/actions";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

class Profile extends React.Component {
  deleteImage() {
    this.self.props.dispatch(
      deleteImage(this.self.props.user.images, this.key)
    );
  }

  addImage() {
    this.props.dispatch(uploadImages(this.props.user.images));
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.container, styles.center]}>
          <View style={styles.container}>
            <Image
              style={StyleSheet.img}
              source={{ uri: this.props.user.photoUrl }}
            />
            <Text style={[styles.center, styles.bold]}>
              {this.props.user.name}
            </Text>
          </View>
          <View style={styles.imgRow}>
            {this.props.user.images.map((uri, key) => {
              return (
                <TouchableOpacity
                  key={{ key }}
                  onPress={this.deleteImage.bind({ self: this, key: key })}
                >
                  <Image style={styles.img} source={{ uri: uri }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Profile);
