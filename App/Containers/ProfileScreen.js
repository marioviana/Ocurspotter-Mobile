import React, { Component } from 'react'
import { Text } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Tabs, Tab, Form, Item, Label, Input } from 'native-base'
import { connect } from 'react-redux'
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
      newPassword: ''
    };
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

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
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>First name</Label>
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>Last name</Label>
                  <Input />
                </Item>
              </Form>
            </Content>
            <Content style={styles.section}>
              <Button block info>
                <Text style={styles.buttonText}>SUBMIT</Text>
              </Button>
            </Content>
          </Tab>
          <Tab heading="Password">
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Old password</Label>
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>New password</Label>
                  <Input />
                </Item>
              </Form>
            </Content>
            <Content style={styles.section}>
              <Button block info>
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
