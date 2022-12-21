import {StyleSheet} from 'react-native';
import {
  borderRadius,
  colors,
  darkColors,
  spaceVertical,
  marginHorizontal,
  fontSize,
  fontFamily,
} from '../../styles/variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spaceVertical.small,
    paddingHorizontal: marginHorizontal.xsmall,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightgreen,
    borderTopLeftRadius: borderRadius.XLarge,
    borderTopRightRadius: borderRadius.XLarge - 5,
    paddingHorizontal: marginHorizontal.xsmall,
    paddingVertical: spaceVertical.small,
  },
  row: {
    flexDirection: 'row',
  },
  abc: {
    backgroundColor: colors.projectgreen,
  },
  profilealign: {
    fontSize: fontSize.medium + 2,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  userEmailStyle: {
    flexDirection: 'row',
    marginVertical: spaceVertical.small,
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 50,
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
    elevation: 1.5,
  },
});
export default styles;
