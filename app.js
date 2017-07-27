import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner, CardSection } from'./components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null};

  componentWillMount() {
    firebase.initializeApp({
    apiKey: "AIzaSyBORHm3eVkPnyiYAN4niLDqYyCqgAhIEpU",
    authDomain: "project-1-f5538.firebaseapp.com",
    databaseURL: "https://project-1-f5538.firebaseio.com",
    projectId: "project-1-f5538",
    storageBucket: "project-1-f5538.appspot.com",
    messagingSenderId: "1015841124739"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
   });
  }


  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return(
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.centeredStyle}>
            <Spinner size="large" />
          </View>
        );
      }
    }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  centeredStyle: {
    flex:1,
    marginTop:275,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default App;
