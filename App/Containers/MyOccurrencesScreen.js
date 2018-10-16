import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, AsyncStorage, Image } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Card, CardItem } from 'native-base'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MyOccurrencesScreenStyle'

class MyOccurrencesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      cards: []
    }
  }

  handleOccurrence(id) {
    this.props.navigation.navigate("OccurrenceScreen", { occurrence: id });
  }

  componentDidMount = () => {
    AsyncStorage.getItem("user_id").then((value) => {
      this.setState({ userId: value });
    })
      .then(res => {
        axios.get('https://ocurspotter.herokuapp.com/occurrences/', {
          params: {
            user: this.state.userId
          }
        })
          .then((response) => {
            let cards = [];
            for (let i = 0; i < response.data.length; i++) {
              cards.push(
                <Card key={response.data[i].id}>
                  <CardItem header button onPress={() => this.handleOccurrence(response.data[i])}>
                    <Text style={{ fontWeight: "bold" }}>{response.data[i].title}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {response.data[i].description}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={{ uri: response.data[i].image }} style={{ height: 150, width: null, flex: 1 }} />
                  </CardItem>
                </Card>
              )
            }
            this.setState({
              cards
            })
          })
          .catch((error) => {
            console.log(error);
          });
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
            <Title style={styles.title}>My occurrences</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.section}>
          {this.state.cards}
        </Content>
      </Container>
    )
  }
}

export default MyOccurrencesScreen;
