import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center',
    justifyContent: "center",
    fontSize: 16
  }
})
