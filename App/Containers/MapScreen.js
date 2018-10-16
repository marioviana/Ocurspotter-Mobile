import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Icon, Header, Left, Right, Button, Body, Title, Content, Container, Footer, FooterTab } from 'native-base'
import MapView from 'react-native-maps';
import WebViewLeaflet from 'react-native-webview-leaflet';
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MapScreenStyle'
import OccurrenceDetails from '../Components/OccurrenceDetails';

class MapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalDetails: false,
      selectedOcc: null,
      lat: 0,
      lon: 0
    }
  }

  componentDidMount() {
    AsyncStorage.setItem('user_id', JSON.stringify(1), () => {
      console.log('DONE');
    });
    this.handleMap();
  }

  handlePressBack = () => {
    this.props.navigation.goBack();
  };

  handleCreate = () =>  {
    this.props.navigation.navigate("NewOccurrenceScreen");
  }

  handleOccurrences = () =>  {
    this.props.navigation.navigate("MyOccurrencesScreen");
  }

  handleStats = () =>  {
    this.props.navigation.navigate("StatsScreen");
  }

  handleProfile = () =>  {
    this.props.navigation.navigate("ProfileScreen");
  }

  handleOccurrenceDetails = () => {
    axios.get(`https://ocurspotter.herokuapp.com/occurrences/${occID}`)
    .then(response => console.log('OCC', response.data.title))
    .catch(error => console.log("OCC DETAILS", error))
  }

  getCoordinates = () =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      (error) => console.log("GETTING COORDS", error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    colorType = type => {
      let color = "grey";
      switch (type) {
        case "Animals":
          color = '🐕';
          break;
        case "Roads and Signs":
          color = "🛑";
          break;
        case "Lightning and Energy":
          color = "💡";
          break;
        case "Gardens and Environment":
          color = "🏡";
          break;
        case "Forest":
          color = "🌳";
          break;
        case "Cleansing and conservation":
          color = "🛁";
          break;
        case "Pavement and Sidewalks":
          color = "🚶‍";
          break;
        case "Waters and Sewers":
          color = "🚰";
          break;
        case "Garbage collection":
          color = "🗑️";
          break;
        case "Vehicles":
          color = "🚙";
          break;
        case "Suggestion":
          color = "💬";
          break;
        default:
          color = "❓";
          break;
      }
      return color;
    };

  handleMap() {
    let markers = [];
    axios.get('https://ocurspotter.herokuapp.com/occurrences/map', {
      params: {
        status: 1
      }
    })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let icon = this.colorType(response.data[i].type.name);
          markers.push({
            id: response.data[i].id, // The ID attached to the marker. It will be returned when onMarkerClicked is called
            coords: [response.data[i].latitude, response.data[i].longitude], // Latitude and Longitude of the marker
            icon: icon, // HTML element that will be displayed as the marker.  It can also be text or an SVG string.

            // The child object, "animation", controls the optional animation that will be attached to the marker.
            // See below for a list of available animations

            // optional size for this individual icon
            // will default to the WebViewLeaflet `defaultIconSize` property if not provided
            size: [120, 120]
          });
        }
        return markers;
      })
      .then(markers => {
        this.getCoordinates();
        this.webViewLeaflet.sendMessage({
          centerPosition: { lat: 41, lng: -8},
          locations: markers,
          zoom: 7
        })
      })
      .catch(error => console.log("ERROR MARKERS", error))
  }

  onMapClicked = ({ payload }) => {
    console.log(`Map Clicked: app received: ${payload.coords}`);
  };

  onMapMarkerClicked = ({ payload }) => {
    axios.get(`https://ocurspotter.herokuapp.com/occurrences/${payload.id}`)
    .then(response => {
      this.setState({
        modalDetails: true,
        selectedOcc: response.data
      })
    })
    .catch(error => console.log("ERROR CLICK MARKER", error))
    console.log(`Marker Clicked: ${payload.id}`);
  };

  closeModal = () => {
    this.setState({
      modalDetails: false,
      selectedOcc: null
    })
  }

  handleOccurrence = () => {
    this.props.navigation.navigate("OccurrenceScreen", { occurrence: this.state.selectedOcc });
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Map</Title>
          </Body>
        </Header>
        <WebViewLeaflet
          // get a reference to the web view so that messages can be sent to the map
          ref={(component) => (this.webViewLeaflet = component)}
      
          // the component that will receive map events
          eventReceiver={this}
        />
        <OccurrenceDetails visible={this.state.modalDetails} close={this.closeModal} selected={this.state.selectedOcc} goToOcc={this.handleOccurrence}/>
        <Footer>
          <FooterTab>
            <Button onPress={this.handleCreate}>
              <Icon name="create" />
            </Button>
            <Button onPress={this.handleOccurrences}>
              <Icon name="list" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
            <Button onPress={this.handleStats}>
              <Icon name="ios-stats" />
            </Button>
            <Button onPress={this.handleProfile}>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default MapScreen;
