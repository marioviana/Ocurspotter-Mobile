import React, { Component } from 'react'
import { Text, AsyncStorage } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Item, Input, Label } from 'native-base'
import { Buffer } from 'buffer'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

  handleLogin() {
    let authTemp = `${this.state.username}:${this.state.password}`;
    let auth = new Buffer(authTemp).toString('base64');
    axios.get('https://ocurspotter.herokuapp.com/login/' + auth)
      .then((response) => {
        if (response.data.id) {
          AsyncStorage.setItem('user_id', JSON.stringify(response.data.id), () => {
            /*let storage = async () => await AsyncStorage.getItem('user_id');
            storage().then((res)=>{
              if(res) {
                console.tron.log(res);
              } 
            }).catch((err)=>{
              console.tron.log(err);
            });*/
            this.props.navigation.navigate("MapScreen");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={this.handlePressBack}>
              <Icon name="md-arrow-back" style={styles.title} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.section}>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input autoCapitalize='none' autoCorrect={false} onChangeText={(user) => this.setState({ username: user })} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry={true} onChangeText={(pass) => this.setState({ password: pass })} />
          </Item>
        </Content>
        <Content style={styles.section}>
          <Button block info onPress={this.handleLogin.bind(this)}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default LoginScreen
