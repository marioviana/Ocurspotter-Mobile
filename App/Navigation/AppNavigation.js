import { StackNavigator } from 'react-navigation'
import OccurrenceScreen from '../Containers/OccurrenceScreen'
import MyOccurrencesScreen from '../Containers/MyOccurrencesScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import StatsScreen from '../Containers/StatsScreen'
import NewOccurrenceScreen from '../Containers/NewOccurrenceScreen'
import MapScreen from '../Containers/MapScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  OccurrenceScreen: { screen: OccurrenceScreen },
  MyOccurrencesScreen: { screen: MyOccurrencesScreen },
  ProfileScreen: { screen: ProfileScreen },
  StatsScreen: { screen: StatsScreen },
  NewOccurrenceScreen: { screen: NewOccurrenceScreen },
  MapScreen: { screen: MapScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  //initialRouteName: 'LaunchScreen',
  initialRouteName: 'MapScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
