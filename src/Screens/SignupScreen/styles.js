import {StyleSheet} from 'react-native';
import { borderRadius, colors, darkColors,spaceVertical, marginHorizontal, responsiveHeight, 
    responsiveWidth,fontSize ,fontFamily} from '../../styles/variables';
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:marginHorizontal.xsmall,
        paddingVertical:spaceVertical.large,
    },
    cameraLogo:{
        position:"absolute",
         top:"45%",
        left:"60%",
        zIndex:5
    },
    Logo:{ 
        height:100,
        width:100, 
        borderRadius:50,
        borderWidth:2,
    },
    profileLogo:{
        height:97,
        borderRadius:50,
        width:97, 
    },
    profileContainer:{
        alignItems:"center",
        justifyContent:"space-evenly",
        height:responsiveHeight(25), 
    },
    title:{
        fontSize:fontSize.semiLarge,
        fontFamily:fontFamily.bold,
        fontWeight:"bold",
        color:colors.black, 
        textAlign:"center"
    },
    subtitle:{
        textAlign:"center"
    },
    checkStyle:{
        flexDirection:"row",
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