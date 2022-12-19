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
  } from'../../styles/variables';

  
  
  const styles = StyleSheet.create({

container:{
    // backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    
    justifyContent: 'center',
  },
  logo:{height: responsiveHeight(20), width: responsiveWidth(100)},

logotext:{
          fontSize: fontSize.extraLarge0,
          color: colors.black,
        
          marginTop: spaceVertical.small,
          fontFamily:fontFamily.bold
        }

  });
  export {styles};