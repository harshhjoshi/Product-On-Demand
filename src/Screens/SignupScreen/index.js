import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import TextInputs from '../../Components/TextInputs';
import Button from '../../Components/Button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {db} from '../../Firebase/config';
import {ref, set} from '@firebase/database';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors, responsiveWidth, spaceVertical} from '../../styles/variables';
import * as yup from 'yup';
import {Formik} from 'formik';

const Signup = ({navigation}) => {
  const dummyUri =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png';
  const [galleryphoto, setUploadImage] = useState(dummyUri);

  const OPENPICKER = () => {
    console.log('ndbvjkbhdfvj');
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

  const signUp = async (email, password,userName) => {
    console.log('e,p', email, password);
    try {
      const cred = await auth().createUserWithEmailAndPassword(email, password);
      console.log(cred.user);
      if (cred.user.uid) {
        set(ref(db, 'users/' + cred.user.uid), {
          userName: userName,
          email: email,
          photoURL: galleryphoto,
          role:'',
        })
          .then(() => {
            navigation.navigate('Signin_screen');
          })
          .catch(error => {
            console.log('error', error.message);
          });
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.cameraLogo}>
          <Pressable onPress={() => OPENPICKER()}>
            <IonIcon name="camera-outline" size={35}></IonIcon>
          </Pressable>
        </View>

        <Image
          style={styles.profileLogo}
          source={{
            uri: galleryphoto,
          }}
        />

        <View>
          <Text style={styles.title}>Create Account!</Text>
          <Text style={styles.subtitle}>Quickly create an account.</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confrompassword: '',
          }}
          onSubmit={values => {
            console.log('values', values);
            signUp(values.email,values.password,values.name)
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required('Please, provide your name!'),
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
            confrompassword: yup
              .string()
              .oneOf([yup.ref('password')], 'Passwords do not match')
              .required('Confirm password is required'),
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
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.inputvalidStyle}>
                  {errors.name}
                </Text>
              )}
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
              <TextInputs
                label="Conform Password"
                value={values.confrompassword}
                onChangeText={handleChange('confrompassword')}
                onBlur={() => setFieldTouched('confrompassword')}
                secureTextEntry={true}
              />
              {touched.confrompassword && errors.confrompassword && (
                <Text style={styles.inputvalidStyle}>
                  {errors.confrompassword}
                </Text>
              )}

              <Button
                name="Signup"
                color={isValid && dirty  ? colors.projectgreen : colors.shadowgreen}
                marginTop={spaceVertical.small}
                disableTrue={!(isValid && dirty) }
                onPress={handleSubmit}

              />
            </View>
          )}
        </Formik>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={styles.subTitleBottom}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Signin_screen')}>
            <Text style={[styles.subTitleRight, {marginTop: 5}]}> Signin</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
