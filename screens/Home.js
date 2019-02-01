import React from "react";
import styles from "../styles";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { getCards } from "../redux/actions";
import SwipeCards from "react-native-swipe-cards";
import Cards from "../components/Cards.js";
import NoCards from "../components/NoCards.js";

import { Text, View, Image } from "react-native";

console.disableYellowBox = true;
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentDidMount() {
    this.props.dispatch(getCards(this.props.user.geocode));
    // console.log("this.props.cards", this.props.cards);
    // const genderFilter = () => {this.props.cards.filter(card => {
    //   card.gender
    // })}
  }

  handleYup(card) {
    firebase
      .database()
      .ref("cards/" + this.props.user.id + "/swipes")
      .update({ [card.id]: true });
    this.checkMatch(card);
  }

  handleNope(card) {
    firebase
      .database()
      .ref("cards/" + this.props.user.id + "/swipes")
      .update({ [card.id]: false });
  }

  checkMatch(card) {
    firebase
      .database()
      .ref("cards/" + card.id + "/swipes/" + this.props.user.id)
      .once("value", snap => {
        if (snap.val() == true) {
          var me = {
            id: this.props.user.id,
            photoUrl: this.props.user.photoUrl,
            name: this.props.user.name
          };
          var user = {
            id: card.id,
            photoUrl: card.photoUrl,
            name: card.name
          };
          firebase
            .database()
            .ref("cards/" + this.props.user.id + "/chats/" + card.id)
            .set({ user: user });
          firebase
            .database()
            .ref("cards/" + card.id + "/chats/" + this.props.user.id)
            .set({ user: me });
        }
      });
  }
  genderFilter = props => {
    console.log("This is props[0]: ", props[0]);
    return props

    
      // if (props[0].gender === "Male" && props[0].preference === "Male") {
      //   props.filter(card => {
      //     return card.gender === "Male" && card.preference === "Male";
      //   });
      // }
      // if (props[0].gender === "Male" && props[0].preference === "Female") {
      //   props.filter(card => {
      //     return card.gender === "Female" && card.preference === "Male";
      //   });
      // }

      // if (props[0].gender === "Female" && props[0].preference === "Male") {
      //   props.filter(card => {
      //     return card.gender === "Male" && card.preference === "Female";
      //   });
      // }
      // if (props[0].gender === "Female" && props[0].preference === "Female") {
      //   props.filter(card => {
      //     return card.gender === "Female" && card.preference === "Female";
      //   });
      // }
    

    // const filterGender = props.filter(card => card.gender === "Female");
    // return filterGender;
  };
  render() {
    return (
      <React.Fragment>
        {this.props.cards ? (
          <SwipeCards
            cards={this.props.cards}
            stack={false}
            renderCard={cardData => <Cards {...cardData} />}
            renderNoMoreCards={() => <NoCards />}
            showYup={false}
            showNope={false}
            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope.bind(this)}
            handleMaybe={this.handleMaybe}
            hasMaybeAction={false}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    user: state.user
  };
}

export default connect(mapStateToProps)(Home);
