import React from "react";
import styles from "../styles";
import * as firebase from "firebase";
import { Slider } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import { connect } from "react-redux";
import getLocation, {
  updateRange,
  changePreference,
  changeMyGender
} from "../redux/actions";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
class Settings extends React.Component {
  state = {
    preference: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ],
    gender: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ]
  };

  changePref = preference => {
    this.setState({ preference });
    let data = preference.find(e => e.selected == true);
    this.props.dispatch(changePreference(data.label));
  };

  changeMyGen = gender => {
    this.setState({ gender });
    let data = gender.find(e => e.selected == true);
    this.props.dispatch(changeMyGender(data.label));
  };

  testFunc() {
    console.log(this.props.user.range);
    console.log("token", this.props.user);
  }

  render() {
    let selectedGender = this.state.gender.find(e => e.selected == true);
    selectedGender = selectedGender
      ? selectedGender.value
      : this.state.gender[0].label;

      let selectedPref = this.state.preference.find(e => e.selected == true);
      selectedPref = selectedPref
      ? selectedPref.value
      : this.state.preference[0].label;
    return (
      <View>
        {/* Test Button */}
        <TouchableOpacity style={styles.button} onPress={() => this.testFunc()}>
          <Text>Test</Text>
        </TouchableOpacity>

        <Slider
          step={1}
          minimumValue={1}
          maximumValue={50}
          value={this.props.user.range}
          onSlidingComplete={value => this.props.dispatch(updateRange(value))}
        />
        <Text>Range: {this.props.user.range}</Text>

        <View>
            <Text>I am:</Text>
          <RadioGroup
            radioButtons={this.state.gender}
            onPress={this.changeMyGen}
          />
        </View>

        <View>
            <Text>looking for a:</Text>
          <RadioGroup
            radioButtons={this.state.preference}
            onPress={this.changePref}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Settings);
