import { StyleSheet } from "react-native";
import { borderRadius, colors, fontFamily, fontSize, responsiveHeight, responsiveWidth, spaceVertical } from "../../styles/variables";

const styles = StyleSheet.create({
    img: {
        width: responsiveWidth(80),
        height: responsiveHeight(40),
        borderBottomRightRadius: responsiveHeight(4),
        borderBottomLeftRadius: responsiveHeight(4),
    },
    title: {
        color: colors.textDark,
        fontSize: fontSize.extraLarge0,
        width: responsiveWidth(80),
        fontFamily: fontFamily.semiBold,
        textAlign:'center'
    },

    subTitle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: fontSize.normal,
        height:responsiveHeight(21),
        width: responsiveWidth(80),
        marginTop:spaceVertical.extraSmall,
        fontFamily: fontFamily.regular,  
        textAlign:'center', 
    },

    skipButton: {
        position: 'absolute',
        right: responsiveWidth(10),
        top: responsiveHeight(4),
        backgroundColor: colors.gray,
        padding: 10,
        borderRadius: borderRadius.boxRadius,
        width: responsiveWidth(15)
    },

    skipText: {
        color: colors.black,
        fontFamily: fontFamily.bold,
        textAlign: 'center'
    }

});

export { styles };