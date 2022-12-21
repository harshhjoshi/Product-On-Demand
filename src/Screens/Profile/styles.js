import {StyleSheet} from 'react-native';
import { borderRadius, colors, darkColors,spaceVertical, marginHorizontal, responsiveHeight, 
    responsiveWidth,fontSize ,fontFamily} from '../../styles/variables';
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal:marginHorizontal.xsmall,
        paddingVertical:spaceVertical.large,
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    topContainer:{
        flexDirection:"row",
    },
    userInfo:{
        marginVertical:spaceVertical.small,
    },
    logo:{
        height:100,
        width:100,
        borderRadius:50,
    },
    textStyle:{
        justifyContent:"center",
        marginLeft:marginHorizontal.xsmall,
    },
    title:{
        fontSize: fontSize.semiLarge,
        fontFamily: fontFamily.bold,
        color: colors.black,
    },
    renderStyle:{
        flexDirection:"row",
        paddingVertical:spaceVertical.extraSmall,
    },
    label:{
        alignSelf:"center",
        marginLeft:marginHorizontal.xsmall,
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize.normal,
    },
    profilealign:{
        fontSize: fontSize.semiLarge,
        fontFamily: fontFamily.medium,
        color: colors.black,
    },
    emailStyle:{
        fontFamily: fontFamily.semiBold, 
        fontSize: fontSize.normal, 
    }
   
});
export default styles;