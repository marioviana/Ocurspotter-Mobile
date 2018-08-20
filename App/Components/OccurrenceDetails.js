import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Header, Body, Title, Content, Left, Right, Icon, Container } from 'native-base'
import styles from './Styles/OccurrenceDetailsStyle'

export default class OccurrenceDetails extends Component {

  constructor(props) {
    super(props);
  }

  handlePressBack() {
    this.props.close();
  }

  handleOccurrence() {
    this.props.goToOcc();
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    else {
      return (
        <Header>
          <Left style={[styles.header, styles.left]}>
            <Icon name="ios-close" onPress={this.handlePressBack.bind(this)} />
          </Left>
          <Body style={styles.header}>
            <Title style={styles.title}>{this.props.selected.title}</Title>
          </Body>
          <Right style={[styles.header, styles.right]}>
            <Icon name="ios-arrow-round-forward" onPress={this.handleOccurrence.bind(this)}/>
          </Right>
        </Header>
      )
    }
  }
}
