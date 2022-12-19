import {StyleSheet} from 'react-native';
import { borderRadius, colors, darkColors,spaceVertical, marginHorizontal, responsiveHeight, responsiveWidth,fontSize ,fontFamily} from '../../styles/variables';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,

  },
  logo: {
    width:responsiveWidth(100),
    height:responsiveHeight(55),  
    resizeMode:"cover",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal:marginHorizontal.xsmall,
    paddingVertical:spaceVertical.semiSmall,
    borderTopLeftRadius:borderRadius.bigboxradius,
    borderTopRightRadius:borderRadius.bigboxradius,
    backgroundColor:colors.grayline,
    justifyContent:"space-between",
    alignContent:"space-between",
  },
 
  title:{
    fontSize:fontSize.semiLarge,
    fontFamily:fontFamily.bold,
    fontWeight:"bold",
    color:colors.black
  },
  fgPass:{
    textAlign:"right",
  color:colors.blue,
  },
  subTitleBottom:{
    textAlign:"center",
    marginVertical:spaceVertical.extraSmall,
  },
  subTitleRight:{
    fontFamily:fontFamily.bold,
    fontWeight:"bold",
    color:colors.black,
    top:5,
  }
});
export default styles;
