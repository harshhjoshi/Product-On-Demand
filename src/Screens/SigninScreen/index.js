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
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {colors, marginHorizontal, spaceVertical} from '../../styles/variables';
import {db} from '../../Firebase/config';
import {ref,set} from "@firebase/database";
import CheckBox from '@react-native-community/checkbox';


const Signin = ({navigation}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  GoogleSignin.configure({
    webClientId:"332937348569-0dq0bifplk1j75kg79eu0v54cs101f0u.apps.googleusercontent.com"
    
  });

  const signIn = async (email, password) => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter all fields')
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
    } catch (err) {
      // return Alert.alert(err.code, err.message);
      console.log("error",err.message)
    }
  }

  const signinwithGoogle = async()=>{
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
 const user_sign_in = auth().signInWithCredential(googleCredential);
 user_sign_in.then((user)=>{
  if(user){
    console.log("user..........",user.user.uid);
    storeData(user);
    // navigation.navigate('Dashboard')
  }
  console.log("ugogle",user.user);
 }).catch((error)=>{
  console.log(error);
 })
  }

  const storeData =(user)=>{
    set(ref(db,'users/'+ user.user.uid),{
      userName:user.user.displayName,
      email:user.user.email,
      photoURL:user.user.photoURL,
    }).then (()=>{
    console.log("data update")
  }).catch((error)=>{
    console.log("error")
  })
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
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
        <View >
          <TextInputs label="Email" style={styles.textinput} value={email}  onChangeText={(e)=>setEmail(e)} />
          <TextInputs label="Password" style={styles.textinput} value={password} onChangeText={(e)=>setPassword(e)}/>
        </View>
        <Text style={styles.fgPass}>Forgot Password? </Text>

        <View style={{flexDirection:'row'}}>
        
  </View>
        <Button
          onPress={() => signIn(email, password)}
          name="Login"
          color={colors.projectgreen}
          marginTop={spaceVertical.tiny}
        />
        <View style={styles.bottomstyles}>
          <Text style={styles.subTitleBottom}>Don't have an account?</Text>
          <TouchableOpacity
            style={{marginTop: spaceVertical.tiny1 + 3}}
            onPress={() => navigation.navigate('signup_screen')}
          >
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
