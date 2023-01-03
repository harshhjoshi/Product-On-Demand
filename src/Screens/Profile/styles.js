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
  header: {
    flexDirection: 'row',
  alignSelf:'center',
  backgroundColor:colors.white,

    
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
    row: {
    flexDirection: 'row',
  },
  abc: {
    backgroundColor: colors.projectgreen,
  },
  profilealign: {
    fontSize: fontSize.semiLarge,
    fontFamily: fontFamily.bold,
    color: colors.black,
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
  ml: {
    marginLeft: marginHorizontal.extraSmall,
    fontFamily: fontFamily.medium,
    color: colors.black,
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
  userRenderStyle: {
    backgroundColor: colors.lightgreen,
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
