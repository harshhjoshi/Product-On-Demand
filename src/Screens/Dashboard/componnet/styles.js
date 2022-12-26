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
} from '../../../styles/variables';

const styles = StyleSheet.create({
  imgselection:{
   
    borderRadius: borderRadius.circle,
    height: responsiveHeight(18),
    width: responsiveHeight(18),
    borderWidth: 2,
    borderColor: colors.HARD_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 0.5,
    backgroundColor: colors.white,
    marginTop: spaceVertical.small,
  },
  listview:{
    backgroundColor: colors.lightgreen,
    borderTopLeftRadius: borderRadius.XLarge,
    borderTopRightRadius: borderRadius.XLarge,
    alignItems:'center'
  },
  buyercontainer:{
    flex: 1,
    backgroundColor: colors.white,
    marginTop: spaceVertical.semiSmall,
  },
  pricetext:{color: colors.green, fontFamily: fontFamily.medium},
  productname:{
    color: colors.purple,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.normal,
  },
  buyeradd:{
    height: responsiveHeight(4),
    width: responsiveWidth(20),
    backgroundColor: colors.projectgreen,
    borderRadius: borderRadius.normal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productimg:{
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    marginLeft: marginHorizontal.flatlistmargin,
  },
  productlistview:{
    width: responsiveWidth(90),
    // height: responsiveHeight(20),
    backgroundColor: colors.white,
    padding:20,
    alignSelf: 'center',
    borderRadius: borderRadius.medium,
    elevation: 2,
    marginTop: spaceVertical.semiSmall,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyerbtntext:{color: colors.HARD_BLACK, fontFamily: fontFamily.semiBold},
  vendortext:{color: colors.HARD_BLACK, fontFamily: fontFamily.semiBold},
  img:{
    height: responsiveHeight(17),
    width: responsiveWidth(36),
    borderRadius: borderRadius.circle,
  },
  TextInputs:{
    width: responsiveWidth(80),
    alignSelf: 'center',
    marginTop: spaceVertical.small,
    backgroundColor: colors.HARD_WHITE,
  },

  headerview:{
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: borderRadius.medium,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: spaceVertical.semiSmall,
    paddingBottom: spaceVertical.normal,
  },
  headertext:{
    fontFamily: fontFamily.bold,
    fontSize: fontSize.medium,
    color: colors.projectgreen,
    textAlign: 'center',
    marginTop: spaceVertical.semiSmall,
  },

  searchicon: {
    height: responsiveHeight(2.5),
    width: responsiveWidth(5),
    marginLeft: marginHorizontal.extraSmall,
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

});

export { styles };


