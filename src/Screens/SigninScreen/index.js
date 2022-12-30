import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import React from 'react';
import Images from '../../Constants/Images';
import styles from './styles';
import TextInputs from '../../Components/TextInputs';
import Button from '../../Components/Button';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {colors, marginHorizontal, spaceVertical} from '../../styles/variables';
import {db} from '../../Firebase/config';
import {ref, set} from '@firebase/database';
import * as yup from 'yup';
import {Formik} from 'formik';

const Signin = ({navigation}) => {
  const [errorfb,setErrorFB]=useState("");
  const signIn = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      if(userCredential.user){
        setErrorFB("")
        setTimeout(() =>{
          navigation.navigate('Tabs')
        },1000)
      }
    } catch (err) {
      setErrorFB(err.message)
      console.log('error', err.message);
    }
  };

  GoogleSignin.configure({
    webClientId:
      '332937348569-0dq0bifplk1j75kg79eu0v54cs101f0u.apps.googleusercontent.com',
  });

  const signinwithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(user => {
        if (user) {
          storeData(user);
        }
        console.log('ugogle', user.user);
      })
      .catch(err => {
        console.log("err messgae",err.message);
      });
  };

  const storeData = user => {
    set(ref(db, 'users/' + user.user.uid), {
      userName: user.user.displayName,
      email: user.user.email,
      photoURL: user.user.photoURL,
    })
      .then(() => {
        console.log('data update');
        navigation.navigate('Tabs')
      })
      .catch(error => {
        console.log('error');
      });
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
        hidden={false}
        translucent={true}
      />
      <View style={styles.logoContainer}>
        <ImageBackground source={Images.foodgive} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.textContainer}>
        <View style={{marginLeft: marginHorizontal.small}}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.txt}>Sign in to your account.</Text>
        </View>
        {/*  */}

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => {
            console.log('values', values);
            signIn(values.email,values.password)
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required('Email is required'),
            password: yup
              .string()
              .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
              .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
              .matches(/\d/, 'Password must have a number')
              .matches(
                /[!@#$%^&*()\-_"=+{}; :,<.>]/,
                'Password must have a special character',
              )
              .min(8, ({min}) => `Passowrd must be at least ${min} characters`)
              .required('Password is required'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            dirty,
            handleSubmit,
            
          }) => (
            <View>
              <TextInputs
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.inputvalidStyle}>
                  {errors.email}
                </Text>
              )}
              <TextInputs
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.inputvalidStyle}>
                  {errors.password}
                </Text>
              )}

              {errorfb &&<Text style={styles.inputvalidStyle}>{errorfb}</Text>}
              <Button
                name="Login"
                color={isValid && dirty ? colors.projectgreen : colors.shadowgreen}
                marginTop={spaceVertical.small}
                disableTrue={!(isValid && dirty) }
                onPress={handleSubmit}
              />

            </View>
          )}
        </Formik>

        {/*  */}
        <View style={styles.bottomstyles}>
          <Text style={styles.subTitleBottom}>Don't have an account?</Text>
          <TouchableOpacity
            style={{marginTop: spaceVertical.tiny1 + 3}}
            onPress={() => navigation.navigate('signup_screen')}>
            <Text style={styles.subTitleRight}> Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomstylesicon}>
          <TouchableOpacity onPress={signinwithGoogle}>
            <Image
              style={styles.icons}
              source={require('../../Assests/Images/google.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onFacebookButtonPress}>
            <Image
              style={styles.icons}
              source={require('../../Assests/Images/facebook.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signin;
