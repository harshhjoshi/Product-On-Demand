import { StyleSheet } from "react-native";
import { borderRadius, colors, deviceHeight, fontFamily, fontSize, responsiveHeight, responsiveWidth, spaceVertical } from '../../styles/variables';

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    pager: {
        height: responsiveHeight(80),
        alignItems: 'center',
    },

    content: {
        flex:1,
        justifyContent:'flex-end',
        bottom:responsiveHeight(7)
    },

    row: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: responsiveWidth(16),
        marginVertical:spaceVertical.small
    },

    dot: {
        width: responsiveHeight(1.25),
        height: responsiveHeight(1.25),
        borderRadius: 6,
    },

    activeColor: {
        backgroundColor: colors.dotsActive,
        width:responsiveWidth(6)
    },

    inactiveColor: {
        backgroundColor: colors.inputBorder
    },
    image1: {
        flex: 1,
        width: '100%',
        height: deviceHeight,
    },

    btnNext: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        height: responsiveHeight(6),
        width: responsiveWidth(80),
        borderRadius: borderRadius.semiLarge
    },

    btnGetStarted: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        height: responsiveHeight(6),
        width: responsiveWidth(80),
        borderRadius: borderRadius.semiLarge
    },

    btnText: {
        color: colors.white,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.normal
    }
});

export { styles };