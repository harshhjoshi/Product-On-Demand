import React, { useRef, useState } from 'react';
import {
    FlatList,
    ImageBackground, Text,
    View
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Button from '../../Components/Button'
import Page1 from '../../Components/Pager/Page1/Page1';
import Page2 from '../../Components/Pager/Page2/Page2';
import Page3 from '../../Components/Pager/Page3/Page3';
import { AuthContext } from '../../contexts/authContext';
import { colors, deviceHeight, marginHorizontal } from '../../styles/variables';
import { styles } from './styles';

const Introduction = ({ navigation }) => {

    const pager = useRef();
    const [activeIndex, setactiveIndex] = useState(0);


    const getCurrentPageIndex = (e) => {
        setactiveIndex(e.nativeEvent.position);
    }

    const next = () => {
        pager.current?.setPage(activeIndex + 1);
        setactiveIndex(activeIndex + 1);
    }

    const [pagination, setPagination] = useState([
        { key: '', index: 0 },
        { key: '', index: 1 },
        { key: '', index: 2 }
    ])
    const {getStarted}  = React.useContext(AuthContext)

    const Submit = () => {
        navigation.navigate('Tabs' );
    }

    return (
        <>
            {/* background image */}
            <ImageBackground source={require('../../Assests/Images/onboardingBg.png')} style={styles.image1}></ImageBackground>
            {/* pager component */}
            <View style={{ height: deviceHeight }}>
                {/* pagerview plugin */}
                <PagerView style={styles.pager} initialPage={0} ref={pager} onPageSelected={e => { getCurrentPageIndex(e) }}>
                    <View key="1">
                        <Page1  navigation={navigation}/>
                    </View>
                    <View key="2">
                        <Page2  navigation={navigation}/>
                    </View>
                    <View key="3">
                        <Page3 navigation={navigation}/>
                    </View>
                </PagerView>

                <View style={styles.content}>
                    {/* dots */}
                    <View style={styles.row}>
                        <FlatList
                            data={pagination}
                            numColumns={3}
                            renderItem={({ item, index }) => (
                                <>
                                    <View key={index}>
                                        <View style={{ marginRight: marginHorizontal.extraSmall }}>
                                            <Text style={[styles.dot, activeIndex == item.index ? styles.activeColor : styles.inactiveColor]}>{item.key}</Text>
                                        </View>
                                    </View>
                                </>
                            )}></FlatList>
                    </View>

                    {/* buttons */}
                    {
                        activeIndex < 2 ?
                            <Button name={'Next'}
                                onPress={next} color={colors.black} />
                            :
                            <Button name={'Get Started'}
                                onPress={Submit} color={colors.primary} />
                    }

                </View>
            </View>
        </>
    );
};

export default Introduction;
