import {StyleSheet} from 'react-native';
import {
  borderRadius,
  colors,
  darkColors,
  spaceVertical,
  marginHorizontal,
  responsiveHeight,
  responsiveWidth,
  fontSize,
  fontFamily,
} from '../../styles/variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: marginHorizontal.xsmall,
    paddingVertical: spaceVertical.large,
    backgroundColor:colors.lightblue
  },
  cameraLogo: {
    position: 'absolute',
    top: '40%',
    left: '58%',
    zIndex: 5,
  },
  Logo: {
    height: responsiveHeight(12.5),
    width: responsiveWidth(27.5),
    borderRadius: 50,
    borderWidth: 2,
  },
  profileLogo: {
    height: 97,
    borderRadius: 50,
    width: 97,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: responsiveHeight(25),
  },
  title: {
    fontSize: fontSize.semiLarge,
    fontFamily: fontFamily.bold,

    color: colors.black,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily:fontFamily.medium
  },
  checkStyle: {
    flexDirection: 'row',
    
  },
  subTitleBottom: {
    textAlign: 'center',
    marginVertical: spaceVertical.extraSmall,
    fontFamily: fontFamily.medium,
  },
  subTitleRight: {
    fontFamily: fontFamily.bold,

    color: colors.blue,
    top: 5,
  },
  inputvalidStyle:{
    fontSize: 12,
    color:colors.red,
    fontFamily:fontFamily.medium
  },
});
export default styles;
