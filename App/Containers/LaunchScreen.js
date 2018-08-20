import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container } from 'native-base'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import RoundedButton from '../Components/RoundedButton.js';
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

  handleLogin = () => {
    this.props.navigation.navigate("LoginScreen");
  };

  render () {
    return (
      <Container>
          <Content style={styles.section}>
            <Image source={Images.fundo} style={styles.logo} />
            <Text style={styles.sectionTextBlack}>
              Your city app. 
            </Text>
            <Button block info onPress={this.handleLogin} style={styles.login}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Button>
            <Button block info onPress={this.handleLogin}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </Button>
          </Content>
      </Container>
    )
  }
}
