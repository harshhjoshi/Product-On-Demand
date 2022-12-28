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
    backgroundColor:colors.lightblue
  },
  logoContainer: {
    backgroundColor:colors.lightblue,
    flex: 0.8,
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(47),
    resizeMode: 'cover',
  },
  textContainer: {
    backgroundColor:colors.lightblue,
    flex: 1,
    paddingHorizontal: marginHorizontal.xsmall,
    paddingVertical: spaceVertical.semiSmall,
    borderTopLeftRadius: borderRadius.bigboxradius,
    borderTopRightRadius: borderRadius.bigboxradius,
    backgroundColor: colors.lightblue,
   
  },

  title: {
    fontSize: fontSize.semiLarge,
    fontFamily: fontFamily.bold,

    color: colors.black,
  },
  fgPass: {
    textAlign: 'right',
    color: colors.blue,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.medium,
    marginTop: spaceVertical.small,
  },
  subTitleBottom: {
    textAlign: 'center',
    marginTop: spaceVertical.tiny,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.normal,
  },
  subTitleRight: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.normal,
    color: colors.blue,
  },
  txt: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.semiBold,

    color: colors.graytext,
  },
  textinput: {
    width: responsiveWidth(90),
    marginTop: spaceVertical.tiny,
  },
  bottomstyles: {
    flexDirection: 'row',
  justifyContent:"center",
  
    marginTop: spaceVertical.tiny,
  },
  bottomstylesicon: {
    flexDirection: 'row',
marginLeft:responsiveWidth(20),
  
    marginTop: spaceVertical.small,
  },
  icons:{
    height:responsiveWidth(10),
    width:responsiveWidth(10),
    marginLeft:marginHorizontal.large
 
  },
  inputvalidStyle:{
    fontSize: 12,
    color:colors.red,
    fontFamily:fontFamily.medium
  },
});
export default styles;
