import React from 'react';
import styles from '../styles'

import {
    Text,
    View
} from 'react-native';

class Profile extends React.Component {
    state = {}


    componentWillMount() {}

    render() {
        return(
            <View>
                <Text>Profile</Text>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
      loggedIn: state.loggedIn
    };
  }
  
  export default connect(mapStateToProps)(Profile);