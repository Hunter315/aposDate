import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { getCards } from '../redux/actions';
import SwipeCards from 'react-native-swipe-cards';


import {
    Text,
    View,
    Alert,
    Image
} from 'react-native';

class Card extends React.Component {
    render() {
        return(
            <View>
                <Image source={{uri: this.props.images[0]}} />
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

class NoMoreCards extends React.Component {
    render() {
        return(
            <View>
                <Text>No more cards...</Text>
            </View>
        )
    }
}
class Home extends React.Component {
    state = {
        cards: [
            {name: 'male 1'},
            {name: 'female 1'}
        ]
    }

handleYup (card) {
    console.log(`Yup for ${card.name}`)
}

handleNope (card) {
    console.log(`Nope for ${card.name}`)
}

handleMaybe (card) {
    console.log(`Maybe for ${card.name}`)
}





    componentWillMount() {
     this.props.dispatch(getCards());
    }
    
      

    render() {
        return(
            <SwipeCards
                cards={this.props.cards}
                stacks={false}
                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={false}
                showNope={false}
                handleYup={this.handleYup}
                handleNope={this.handleNope}
                handleMaybe={this.handleMaybe}
                hasMaybeAction={false} />
        )
    }
}

function mapStateToProps(state) {
    return { 
        loggedIn: state.loggedIn,
        cards: state.cards
    };
}

export default connect(mapStateToProps)(Home);