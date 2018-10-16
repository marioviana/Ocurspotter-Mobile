import React, { Component } from 'react'
import { Text, AsyncStorage } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Tabs, Tab, Form, Item, Label, Input } from 'native-base'
import axios from 'axios'
import { Buffer } from 'buffer'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      oldPassword: '',
      newPassword: '',
      userId: 0
    };
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

  componentWillMount() {
    AsyncStorage.getItem("user_id").then((value) => {
      this.setState({ userId: value });
    })
      .then(() => {
        axios.get('https://ocurspotter.herokuapp.com/users/' + this.state.userId)
          .then((response) => {
            this.setState({
              email: response.data.email,
              firstName: response.data.firstName,
              lastName: response.data.lastName
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }

  handleSubmitProfile() {
    console.log(JSON.stringify({
      user: this.state.userId,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }));
    axios.post(`https://ocurspotter.herokuapp.com/profile?user=${this.state.userId}&email=${this.state.email}&firstName=${this.state.firstName}&lastName=${this.state.lastName}`)
      .then( () => {
        console.log('Success');
      })
      .catch( (error) => {
        console.log(error);
      });  
  }

  handleSubmitPassword() {
    let oldPassword = new Buffer(this.state.oldPassword).toString('base64'),
      newPassword = new Buffer(this.state.newPassword).toString('base64');
    axios.post(`https://ocurspotter.herokuapp.com/password?user=${this.state.userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`)
      .then( () => {
        console.log('Success');
      })
      .catch( (error) => {
        console.log(error);
      });  
  }

  render() {
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left>
            <Button transparent onPress={this.handlePressBack}>
              <Icon name="md-arrow-back" style={styles.title} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="Profile">
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input value={this.state.email} onChangeText={(e) => this.setState({email: e})}/>
                </Item>
                <Item floatingLabel>
                  <Label>First name</Label>
                  <Input value={this.state.firstName} onChangeText={(e) => this.setState({firstName: e})}/>
                </Item>
                <Item floatingLabel>
                  <Label>Last name</Label>
                  <Input value={this.state.lastName} onChangeText={(e) => this.setState({lastName: e})}/>
                </Item>
              </Form>
            </Content>
            <Content style={styles.section}>
              <Button block info onPress={() => this.handleSubmitProfile()}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </Button>
            </Content>
          </Tab>
          <Tab heading="Password">
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Old password</Label>
                  <Input secureTextEntry={true} value={this.state.oldPassword} onChangeText={(e) => this.setState({oldPassword: e})}/>
                </Item>
                <Item floatingLabel>
                  <Label>New password</Label>
                  <Input secureTextEntry={true} value={this.state.newPassword} onChangeText={(e) => this.setState({newPassword: e})}/>
                </Item>
              </Form>
            </Content>
            <Content style={styles.section}>
              <Button block info onPress={() => this.handleSubmitPassword()}>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </Button>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default ProfileScreen
