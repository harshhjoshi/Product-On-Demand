import {StyleSheet} from 'react-native';
import {
  borderRadius,
  colors,
  deviceHeight,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spaceVertical.large,
  },
  titleStyle: {
    fontFamily: fontFamily.bold,
    marginTop: spaceVertical.normal,
    fontSize: fontSize.large,
  },
  productlistview: {
    width: responsiveWidth(90),
    backgroundColor: colors.white,
    padding: 20,
    alignSelf: 'center',
    borderRadius: borderRadius.medium,
    elevation: 2,
    marginTop: spaceVertical.semiSmall,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productimg: {
        height: responsiveHeight(10),
        width: responsiveHeight(10),
        marginLeft: marginHorizontal.flatlistmargin,
        borderRadius:borderRadius.medium
      },
});

export {styles};
