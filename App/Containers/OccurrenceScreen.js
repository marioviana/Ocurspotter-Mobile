import React, { Component } from 'react'
import { Text, AsyncStorage, Image } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, List, ListItem, Separator, Card, CardItem } from 'native-base'
import axios from 'axios'
import { stringify } from "qs"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OccurrenceScreenStyle'

class OccurrenceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
            user: this.state.userId,
            occurrence: this.state.occurrence.id
          }
        })
          .then((response) => {
            console.log(response);
            if (response.data === true) {
              this.setState({
                upvoteColor: "#2185d0",
                upvoteExists: true,
                upvotes: this.state.occurrenceData.upvotes - this.state.occurrenceData.downvotes
              });
            } else if (response.data === false) {
              this.setState({
                downvoteColor: "#db2828",
                upvoteExists: true,
                upvotes: this.state.occurrenceData.upvotes - this.state.occurrenceData.downvotes
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }

  handleUpvote() {
    if (this.state.upvoteColor !== '#2185d0') {
      axios.post('https://ocurspotter.herokuapp.com/occurrenceVotes/new', 
        stringify({
          user: this.state.userId,
          occurrence: this.state.occurrenceData.id,
          vote: true,
          exists: this.state.upvoteExists
        })
      )
        .then( (response) => {
          let upvotes = this.state.upvoteExists ? this.state.upvotes + 2 : this.state.upvotes + 1;
          this.setState({
            upvoteColor: "#2185d0",
            downvoteColor: "grey",
            upvotes: upvotes
          });
        })
        .catch( (error) => {
          console.log(error);
        }); 
    }
  }

  handleDownvote() {
    if (this.state.downvoteColor !== '#db2828') {
      axios.post('https://ocurspotter.herokuapp.com/occurrenceVotes/new', 
        stringify({
          user: this.state.userId,
          occurrence: this.state.occurrenceData.id,
          vote: false,
          exists: this.state.upvoteExists
        })
      )
        .then( (response) => {
          let upvotes = this.state.upvoteExists ? this.state.upvotes - 2 : this.state.upvotes - 1;
          this.setState({
            downvoteColor: "#db2828",
            upvoteColor: "grey",
            upvotes: upvotes
          });
        })
        .catch( (error) => {
          console.log(error);
        }); 
    }
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
            <Separator style={styles.centered}>
              <Text style={styles.centered}>{this.state.occurrence.title}</Text>
            </Separator>
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
                <Text style={{ fontWeight: "bold" }}>Votes: &nbsp;</Text>
                <Icon onPress={this.handleUpvote.bind(this)}  style={{ color: this.state.upvoteColor }} name="ios-arrow-round-up" />
                <Text style={{ marginRight: "3%" }}>{this.state.upvotes} </Text>
                <Icon onPress={this.handleDownvote.bind(this)}  style={{ color: this.state.downvoteColor }} name="ios-arrow-round-down" />
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{ fontWeight: "bold" }}>Description: </Text>
                <Text>{this.state.occurrenceData.description}</Text>
              </Left>
            </ListItem>
          </List>
          <Card>
            <CardItem cardBody>
              <Image source={{ uri: this.state.occurrenceData.image }} style={{ height: 150, width: null, flex: 1 }} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default OccurrenceScreen;