import {StyleSheet} from 'react-native';

import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  marginHorizontal,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../styles/variables';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  container_dark: {flex: 1, backgroundColor: colors.black},

  header: {
    // marginTop: spaceVertical.normal,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header_dark: {
    // marginTop: spaceVertical.normal,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  img: {
    height: responsiveHeight(5),
    width: responsiveWidth(11),
    // alignSelf:'flex-end',left:80
  },
  headertext: {
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
  img: {
    height: responsiveHeight(5),
    width: responsiveWidth(11),
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
    paddingStart: 10,
    borderColor: '#bbb',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: spaceVertical.small,
    borderRadius: borderRadius.large,
  },
  verticleLine: {
    height: '50%',
    width: 1,
    backgroundColor: colors.nocolor,
  },
  searchbarview: {
    flexDirection: 'row',
    width: responsiveWidth(65),
    backgroundColor: colors.white,
    borderWidth: 1.5,
    paddingStart: 10,
    borderColor: '#bbb',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: spaceVertical.small,
    borderRadius: borderRadius.large,
  },
  pill: {
    backgroundColor: colors.projectgreen,
    height: 23,
    width: 25,
    borderRadius: borderRadius.large,
    position: 'absolute',
    top: 6,
  },
  textpill: {
    textAlign: 'center',
    color: colors.white,
  },
});

export {styles};
