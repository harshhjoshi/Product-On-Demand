import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Buyer from './componnet/Buyer';
import Vendor from './componnet/Vendor';
import {styles} from './styles';
import {TabView, SceneMap} from 'react-native-tab-view';
import {ThemeContext} from '../../ThemeContext';
import {useTranslation} from 'react-i18next';

const Dashboard = ({navigation}) => {
  const layout = useWindowDimensions();
  const {theme, setTheme} = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const {t, i18n} = useTranslation();

  const [routes] = useState([
    {key: 'first', title: 'Products'},
    {key: 'second', title: 'Add Products'},
  ]);

  const FirstRoute = () => <Buyer parentToChild={index} />;

  const SecondRoute = () => <Vendor parentToChild={index} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={theme == 'light' ? styles.container : styles.container_dark}>
      <View style={theme == 'light' ? styles.header : styles.header_dark}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin_screen')}
          activeOpacity={0.5}>
          <Image
            style={styles.img}
            source={require('../../Assests/Images/login.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headertext}>{t('Dashboard')}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.5}>
          <Image
            style={styles.img}
            source={require('../../Assests/Images/cartt.png')}
          />
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};
export default Dashboard;
