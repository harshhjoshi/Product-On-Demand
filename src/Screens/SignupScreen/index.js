import { View, Text, ScrollView,Pressable,Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles';
import TextInputs from '../../Components/TextInputs';
import Button from '../../Components/Button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import auth from "@react-native-firebase/auth";
import {db} from '../../Firebase/config';
import {child, database, ref,set} from "@firebase/database";
import {launchImageLibrary} from 'react-native-image-picker';
import { colors, responsiveWidth, spaceVertical } from '../../styles/variables';

const Signup = ({navigation}) => {
  const dummyUri="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"
  const [galleryphoto,setUploadImage]=useState(dummyUri);
  const [ userName, setUserName ]= useState()
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()

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
  const signUp = async (email, password) => {

    if(!email || !password){
       console.log('Error', 'Please enter all fields')
    }
    try {
      const cred = await auth().createUserWithEmailAndPassword(email, password);
      const { uid } = cred.user;
      const uid_1 = uid;
      if(uid_1){
        storeData(uid_1);
      }
      console.log("uid_1 ", uid_1 );
      return createUserInDb(uid_1, email);
    } catch (err) {
      console.log("err messgae",err.message)
    }
}

const storeData =(id)=>{
  set(ref(db,'users/'+ id),{
    userName:userName,
    email:email,
    photoURL:galleryphoto,
    role:"",
  }).then (()=>{
  console.log("data update")
}).catch((error)=>{
  console.log("error")
})
}
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      
      <View style={styles.cameraLogo}>
      <Pressable onPress={()=>OPENPICKER()} >
      <IonIcon name="camera-outline" size={35} ></IonIcon>
      </Pressable>
      
      
        </View>

        <Image
        style={styles.profileLogo}
        source={{
          uri:galleryphoto,
        }}/>

        
        <View>
        <Text style={styles.title}>Create Account!</Text>
        <Text style={styles.subtitle}>Quickly create an account.</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>


      <View>
      <TextInputs label="Name" value={userName}    onChangeText={(e)=>setUserName(e)}/>
      <TextInputs label="Email" value={email}  onChangeText={(e)=>setEmail(e)}/>
      <TextInputs label="Password"  value={password} onChangeText={(e)=>setPassword(e)} />  
      <TextInputs label="Confirm password"/>  
      <TextInputs label="Location"/>  
      <TextInputs label="Phone no"/> 
      <View style={styles.checkStyle}>

      </View> 
    
      </View>
    
          <Button name="Signup" color={colors.projectgreen} marginTop={spaceVertical.small}
           onPress={()=> signUp(email,password)}/>
          <View style={{flexDirection:'row',alignSelf:'center'}}>
          <Text style={styles.subTitleBottom}>
           Already have an account?
        
          </Text>
          <Pressable onPress={() => navigation.navigate('Signin_screen')}>
              <Text style={[styles.subTitleRight ,{marginTop:5}]}> Signin</Text>
            </Pressable>
            </View>

      </ScrollView>
    </View>
  )
}

export default Signup