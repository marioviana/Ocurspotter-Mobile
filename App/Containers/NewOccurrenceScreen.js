import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Form, Item, Picker, Label, Input, Textarea } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NewOccurrenceScreenStyle'


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
      .then( (response) => {
        this.setState({
          types: response.data
        });
      })
      .catch( (error) => {
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

  handleImage() {
    console.tron.log("LOL");
  }

  render() {
    let types = [];
    if (this.state.types) {
      this.state.types.map( type =>
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
              <Label>Select your type</Label>
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
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input />
            </Item>
            <Button onPress={this.handleImage.bind(this)}><Text>Image</Text></Button>
          </Form>
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
