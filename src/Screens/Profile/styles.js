import {StyleSheet} from 'react-native';
import {
  borderRadius,
  colors,
  darkColors,
  spaceVertical,
  marginHorizontal,
  fontSize,
  fontFamily,
  responsiveWidth,
  responsiveHeight,
} from '../../styles/variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
  alignSelf:'center',
  backgroundColor:colors.white,

    
  marginTop:spaceVertical.normal
  },
  header_dark: {
    flexDirection: 'row',
  alignSelf:'center',
  backgroundColor:colors.black,

    
  marginTop:spaceVertical.normal
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightgreen,
    borderTopLeftRadius: borderRadius.XLarge,
    borderTopRightRadius: borderRadius.XLarge - 5,
    paddingHorizontal: marginHorizontal.xsmall,
    paddingVertical: spaceVertical.small,marginTop:spaceVertical.semiSmall
  },
  mainContainer_dark: {
    flex: 1,
    backgroundColor: colors.black,
    borderTopLeftRadius: borderRadius.XLarge,
    borderTopRightRadius: borderRadius.XLarge - 5,
    paddingHorizontal: marginHorizontal.xsmall,
    paddingVertical: spaceVertical.small,marginTop:spaceVertical.semiSmall
  },
    row: {
    flexDirection: 'row',
  },
 
  profilealign: {
    fontSize: fontSize.semiLarge,
    fontFamily: fontFamily.bold,
    color: colors.black,
    textAlign:'center',left:10
  },
  profilealign_dark: {
    fontSize: fontSize.semiLarge,
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign:'center',left:10
  },
  userEmailStyle: {
    flexDirection: 'row',
    marginVertical: spaceVertical.small,
  },
  logo: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    borderRadius:borderRadius.circle,
  },
  img:{
height:responsiveHeight(5),width:responsiveWidth(10),
  },
  emailTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.normal,
    color: colors.black,
    marginLeft: marginHorizontal.extraSmall,
  },
  emailTitle_dark: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.normal,
    color: colors.white,
    marginLeft: marginHorizontal.extraSmall,
  },
  emailTitle_dark: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.normal,
    color: colors.white,
    marginLeft: marginHorizontal.extraSmall,
  },
  ml: {
    marginLeft: marginHorizontal.extraSmall,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  ml_dark: {
    marginLeft: marginHorizontal.extraSmall,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  usernameInfo: {
    justifyContent: 'center',
    marginLeft: marginHorizontal.small,
  },
  title: {
    fontSize: fontSize.medium + 2,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  title_dark: {
    fontSize: fontSize.medium + 2,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  userRenderStyle: {
    backgroundColor: colors.lightgreen,
  },
  userRenderStyle_dark: {
    backgroundColor: colors.black,
  },

  userInfoStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spaceVertical.small,
    marginBottom: spaceVertical.extraSmall,
    elevation:2,
  },

});
export default styles;
