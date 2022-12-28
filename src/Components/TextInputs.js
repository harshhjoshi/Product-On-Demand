import {React, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {borderRadius, colors, fontFamily} from '../styles/variables';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {responsiveWidth, responsiveHeight} from '../styles/variables';

const TextInputs = ({label, value, secureTextEntry,keyboardType,style,onChangeText,onBlur}) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style>
      <TextInput
      
    //   right={<TextInput.Icon name="email" />}
    right={<IonIcon name='eye-off-outline' ></IonIcon>}
        style={style}
        label={label}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        mode="outlined"
        onChangeText={onChangeText}
        onBlur={onBlur}
        // outlineColor="black"
        placeholderTextColor={'black'}
        activeOutlineColor={colors.black}        
        theme={{
          colors: {text: 'black', placeholder: 'black'},
          fonts: {text:fontFamily.bold,placeholder:fontFamily.medium},
       
          roundness: borderRadius.large,
          
          
        }}
      ></TextInput>
    </View>
  );
};
export default TextInputs;
