import {View, Text, Image, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import Images from '../../Constants/Images';
import styles from './styles';
import TextInputs from '../../Components/TextInputs';
import Button from '../../Components/Button';

const Signin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImageBackground source={Images.foodgive} style={styles.logo} />
      </View>

      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>Welcome back!</Text>
          <Text>Sign in to your account.</Text>
        </View>
        <View>
          <TextInputs label="Email" />
          <TextInputs label="password" />

          <Text style={styles.fgPass}>Forgot Password</Text>
        </View>
        <View>
          <Button name="Login"  color="red"/>
          <Text style={styles.subTitleBottom}>
            Don't have an account?
            <Pressable onPress={() => navigation.navigate('signup_screen')}>
              <Text style={styles.subTitleRight}> Signup</Text>
            </Pressable>
          </Text>
         
        </View>
      </View>
    </View>
  );
};

export default Signin;
