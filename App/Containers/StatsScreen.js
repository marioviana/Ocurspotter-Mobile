import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, List, ListItem } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/StatsScreenStyle'

class StatsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      occurrences: 0,
      solutions: 0,
      users: 0,
      occurrenceVotes: 0,
      solutionVotes: 0,
      types: 0
    }
  }

  componentDidMount() {
    axios.get('https://ocurspotter.herokuapp.com/stats')
      .then((response) => {
        this.setState({
          occurrences: response.data.occurrences,
          solutions: response.data.solutions,
          users: response.data.users,
          occurrenceVotes: response.data.occurrenceVotes,
          solutionVotes: response.data.solutionVotes,
          types: response.data.types,
        });
      })
      .catch((error) => {
        console.tron.log(error);
      });
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

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
            <Title style={styles.title}>Statistics</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.section}>
          <List>
            <ListItem first>
              <Left><Text>Occurrences</Text></Left>
              <Right><Text>{this.state.occurrences}</Text></Right>
            </ListItem>
            <ListItem >
              <Left><Text>Solutions</Text></Left>
              <Right><Text>{this.state.solutions}</Text></Right>
            </ListItem>
            <ListItem>
              <Left><Text>Users</Text></Left>
              <Right><Text>{this.state.users}</Text></Right>
            </ListItem>
            <ListItem>
              <Left><Text>Votes in occurrences</Text></Left>
              <Right><Text>{this.state.occurrenceVotes}</Text></Right>
            </ListItem>
            <ListItem>
              <Left><Text>Votes in solutions</Text></Left>
              <Right><Text>{this.state.solutionVotes}</Text></Right>
            </ListItem>
            <ListItem>
              <Left><Text>Types</Text></Left>
              <Right><Text>{this.state.types}</Text></Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default StatsScreen;
