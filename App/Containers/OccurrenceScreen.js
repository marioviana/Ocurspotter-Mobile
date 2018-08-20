import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, List, ListItem } from 'native-base'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OccurrenceScreenStyle'

class OccurrenceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      occurrence: this.props.navigation.state.params.occurrence,
      occurrenceData: {},
      upvoteColor: "grey",
      downvoteColor: "grey",
      upvoteExists: false
    }
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount = () => {
    AsyncStorage.getItem("user_id").then((value) => {
      this.setState({ userId: value });
    })
      .then(res => {
        axios.get('https://ocurspotter.herokuapp.com/occurrences/' + this.state.occurrence.id)
          .then((response) => {
            console.log(response);
            this.setState({
              loading: false,
              occurrenceData: response.data
            });
          })
          .catch((error) => {
            console.log(error);
          });
        axios.get('https://ocurspotter.herokuapp.com/occurrenceVotes/pair', {
          params: {
            user: this.state.user,
            occurrence: this.state.occurrence.id
          }
        })
          .then((response) => {
            console.log(response);
            if (response.data === true) {
              this.setState({
                upvoteColor: "#2185d0",
                upvoteExists: true
              });
            } else if (response.data === false) {
              this.setState({
                downvoteColor: "#db2828",
                upvoteExists: true
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }

  render() {
    console.log(this.state.occurrenceData);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      openDate = this.state.occurrenceData.openDate ? new Date(this.state.occurrenceData.openDate).toLocaleDateString('en-US', options) : '',
      name = this.state.occurrenceData.user ? `${this.state.occurrenceData.user.firstName} ${this.state.occurrenceData.user.lastName}` : '';
    console.log(name);
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={this.handlePressBack}>
              <Icon name="md-arrow-back" style={styles.title} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Details</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.section}>
          <List>
            <ListItem itemHeader first>
              <Text>{this.state.occurrence.title}</Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{ fontWeight: "bold" }}>Type: </Text>
                <Text>{this.state.occurrenceData.type && this.state.occurrenceData.type.name || ''}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{ fontWeight: "bold" }}>Open data: </Text>
                <Text>{openDate}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{ fontWeight: "bold" }}>Creator: </Text>
                <Text>{name}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{ fontWeight: "bold" }}>Description: </Text>
                <Text>{this.state.occurrenceData.description}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{ fontWeight: "bold" }}>Votes: </Text>
                <Icon style={{ color: this.state.upvoteColor }} name="ios-arrow-round-up" />
                <Text style={{ marginRight: "3%" }}>{this.state.occurrenceData.upvotes - this.state.occurrenceData.downvotes} </Text>
                <Icon style={{ color: this.state.downvoteColor }} name="ios-arrow-round-down" />
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}
export default OccurrenceScreen;