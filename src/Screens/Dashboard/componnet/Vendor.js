import {View, Text, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native';
import React,{useState} from 'react';
import {colors} from '../../../styles/variables';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {
  borderRadius,
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
} from '../../../styles/variables';
import TextInputs from '../../../Components/TextInputs';
import Button from '../../../Components/Button';
import { launchImageLibrary } from 'react-native-image-picker';
const Vendor = ({navigation}) => {
  const dummyUri="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"
  const [galleryphoto,setUploadImage]=useState(dummyUri);
  const OPENPICKER = () => {
    console.log("ndbvjkbhdfvj");
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel != true) {
        setUploadImage(response?.assets[0].uri);
      }
    });
  };
  return (
    <View>
      <StatusBar
        backgroundColor={colors.HARD_WHITE}
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <ScrollView
        style={{
          backgroundColor: colors.white,
          elevation: 5,
          borderRadius: borderRadius.medium,
          width: responsiveWidth(90),
          alignSelf: 'center',
          marginTop: spaceVertical.semiSmall,
          paddingBottom: spaceVertical.normal,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.bold,
            fontSize: fontSize.medium,
            color: colors.projectgreen,
            textAlign: 'center',
            marginTop: spaceVertical.semiSmall,
          }}
        >
          Upload Image
        </Text>
        <TouchableOpacity onPress={()=>OPENPICKER()}
          style={{
            borderStyle: 'dashed',
            borderRadius: borderRadius.circle,
            height: responsiveHeight(10),
            width: responsiveHeight(10),
            borderWidth: 1,
            borderColor: colors.HARD_BLACK,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            elevation: 0.5,
            backgroundColor: colors.white,
            marginTop: spaceVertical.small,
          }}
        >
          <Image
            style={{height: responsiveHeight(9), width: responsiveWidth(10),borderRadius:borderRadius.circle}}
            source={{uri:galleryphoto,}}
          />
        </TouchableOpacity>
        <TextInputs
          label={'Add Product Name'}
          style={{
            width: responsiveWidth(80),
            alignSelf: 'center',
            marginTop: spaceVertical.semiSmall,backgroundColor:colors.HARD_WHITE
          }}
        />
        <TextInputs
          label={'Add Product Details'}
          style={{
            width: responsiveWidth(80),
            alignSelf: 'center',
            marginTop: spaceVertical.small,backgroundColor:colors.HARD_WHITE
          }}
        />

        <TextInputs
          label={' Add Price'}
          keyboardType='Numeric'

          style={{
            width: responsiveWidth(80),
            alignSelf: 'center',
            marginTop: spaceVertical.small,backgroundColor:colors.HARD_WHITE,
          }}
        />
        <Button name={"Submit"} color={colors.projectgreen} marginTop={spaceVertical.semiSmall}></Button>
      </ScrollView>
    </View>
  );
};

export default Vendor;
