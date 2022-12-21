import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import Button from '../../Components/Button';
import {
  borderRadius,
  colors,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../styles/variables';
import {Picker} from '@react-native-picker/picker';
const UserSelection = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  console.log(selectedLanguage)
  return (
    <View style={{flex: 1, backgroundColor: colors.white,justifyContent:'center'}}>
      <Image
        style={{height: responsiveHeight(30), width: responsiveWidth(100)}}
        source={require('../../Assests/Images/4565.jpg')}
      ></Image>
      <Text
        style={{
          fontFamily: fontFamily.semiBold,
          fontSize: fontSize.medium,
          alignSelf: 'center',
          color: colors.black,
        }}
      >
        Please Choose Your Role
      </Text>
      <View
        style={{
          width: responsiveWidth(50),
          borderRadius: borderRadius.medium,
          borderWidth: 1,
          alignSelf: 'center',
        }}
      >
        <Picker
          style={{
            width: responsiveWidth(50),
            borderRadius: borderRadius.medium,
            borderWidth: 0.5,
            borderColor: colors.grayline,
          }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Choose Role" value="Role" />

          <Picker.Item label="User" value="User" />
          <Picker.Item label="Vendor" value="Venndor" />
        </Picker>
      </View>
      <Button
        name="Save"
        color={colors.bluebtn}
        marginTop={spaceVertical.small}
        onPress={()=>selectedLanguage==='User'?navigation.navigate('AuthNavigation'):null}
      ></Button>
    </View>
  );
};
export default UserSelection;
