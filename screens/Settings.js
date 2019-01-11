import React from "react";
import styles from "../styles";
import * as firebase from "firebase";
import { Slider } from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';
import { connect } from 'react-redux';
import getLocation, { updateRange } from '../redux/actions';

import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
  } from 'react-native';
class Settings extends React.Component {


testFunc(){
    console.log(this.props.user.range)
}

    render(){
        return(
            <View>
                {/* Test Button */}
         <TouchableOpacity style={styles.button} onPress={() => this.testFunc()} >
        <Text>Test</Text>
        </TouchableOpacity>
               


                <Slider 
                step={1}
                minimumValue={1}
                maximumValue={50}
                value={this.props.user.range}
                onSlidingComplete={(value) => this.props.dispatch(updateRange(value))}
                />
                <Text>Range: {this.props.user.range}</Text>


            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

export default connect(mapStateToProps)(Settings);