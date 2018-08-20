import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: "90%",
    width: "90%",
    resizeMode: 'contain',
    marginLeft: "6%"
  },
  centered: {
    alignItems: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  button: {
    textAlign: 'center',
    width: '80%'
  },
  login: {
    marginBottom: '5%'
  }
})
