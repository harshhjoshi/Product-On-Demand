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
    backgroundColor:colors.lightgreen,
    elevation:2,
    borderRadius:borderRadius.bigboxradius
  },
  container_dark: {
    flex: 1,
    marginTop: spaceVertical.large,
    backgroundColor:colors.lightgreen,
    elevation:2,
    borderRadius:borderRadius.bigboxradius
  },
  container_dark: {
    flex: 1,
    marginTop: spaceVertical.large,
    backgroundColor:colors.black,
    elevation:2,
    borderRadius:borderRadius.bigboxradius
  },
  productprice:{
fontSize:fontSize.normal,color:colors.green,fontFamily:fontFamily.medium
  },
  titleStyle: {
    fontFamily: fontFamily.bold,
    marginTop: spaceVertical.large,
    fontSize: fontSize.semiLarge,
    color:colors.projectgreen,alignSelf:'center',width:responsiveWidth(99),justifyContent:'center',textAlign:'center'
  },
  
  titleStyle_dark: {
    fontFamily: fontFamily.bold,
    marginTop: spaceVertical.large,
    fontSize: fontSize.semiLarge,
    color:colors.white,alignSelf:'center',width:responsiveWidth(99),justifyContent:'center',textAlign:'center'
  },
  productname:{
    fontSize:fontSize.medium,fontFamily:fontFamily.semiBold,color:colors.purple
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
  productlistview_dark: {
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
