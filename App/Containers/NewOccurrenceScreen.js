import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Form, Item, Picker, Label, Input, Textarea } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NewOccurrenceScreenStyle'
import WebViewLeaflet from 'react-native-webview-leaflet';


class NewOccurrenceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      type: null,
      types: null,
    };
  }

  componentDidMount() {
    axios.get('https://ocurspotter.herokuapp.com/types')
      .then((response) => {
        this.setState({
          types: response.data
        });
      })
      .catch((error) => {
        console.tron.log(error);
      });
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

  handleType = type => {
    this.setState({
      type
    });
    console.tron.log(this.state.type);
  };

  getCoordinates = () =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  render() {
    this.getCoordinates();
    let types = [];
    if (this.state.types) {
      this.state.types.map(type =>
        types.push(<Picker.Item key={type.id} label={type.name} value={type.id} />)
      );
    }
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={this.handlePressBack}>
              <Icon name="md-arrow-back" style={styles.title} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>New occurrence</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.section}>
          <Form>
            <Item picker>
              <Label>Select type</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Select type"
                selectedValue={this.state.type}
                onValueChange={this.handleType.bind(this)}
              >
                {types}
              </Picker>
            </Item>
            <Item floatingLabel>
              <Label>Name:</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Description:</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        {/*<Container style={{ width: '80%' }}>
          <WebViewLeaflet
            // get a reference to the web view so that messages can be sent to the map
            ref={(component) => (this.webViewLeaflet = component)}

            // the component that will receive map events
            eventReceiver={this}
          />
        </Container>*/}
        <Content style={styles.section}>
          <Button block info>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOccurrenceScreen)
