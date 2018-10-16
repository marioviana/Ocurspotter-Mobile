import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    height: "10%"
  },
  header: {
    marginTop: "-4%"
  },
  left: {
    marginLeft: "5%"
  },
  right: {
    marginRight: "5%"
  },
  centered: {
    alignItems: 'center'
  },
})