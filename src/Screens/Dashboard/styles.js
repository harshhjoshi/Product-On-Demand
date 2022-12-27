import { StyleSheet } from 'react-native';

import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  marginHorizontal,
  responsiveHeight,
  responsiveWidth,
  spaceVertical
} from '../../styles/variables';

const styles = StyleSheet.create({
container:{flex: 1, backgroundColor: colors.white},
header:{
  marginTop: spaceVertical.large,
  backgroundColor: colors.white,
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
},
headertextview:{
  backgroundColor: colors.white,
  elevation: 5,
  borderRadius: borderRadius.medium,
  width: responsiveWidth(56),
},
headertext:{
  fontFamily: fontFamily.bold,
  fontSize: fontSize.medium,
  color: colors.projectgreen,
  textAlign: 'center',
},
  searchicon: {
    height: responsiveHeight(2.5),
    width: responsiveWidth(5),
    marginLeft: marginHorizontal.extraSmall,
  },

verticleLine: {
  height: '50%',
  width: 1,
  backgroundColor: colors.nocolor,
},
searchbarview: {
  flexDirection: 'row',
  width: responsiveWidth(93),
  borderWidth: 1.5,
  paddingStart:10,
  borderColor: "#bbb",
  alignSelf: 'center',
  alignItems: 'center',
  marginTop: spaceVertical.small,
  borderRadius: borderRadius.large
},
  verticleLine: {
    height: '50%',
    width: 1,
    backgroundColor: colors.nocolor,
  },
  searchbarview: {
    flexDirection: 'row',
    width: responsiveWidth(65),
    backgroundColor:colors.white,
    borderWidth: 1.5,
    paddingStart:10,
    borderColor: "#bbb",
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: spaceVertical.small,
    borderRadius: borderRadius.large
  },

});

export { styles };


