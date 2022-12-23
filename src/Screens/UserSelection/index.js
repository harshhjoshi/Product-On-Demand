import React, {useEffect, useState} from 'react';
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
import {db} from '../../Firebase/config';
import {ref,update} from "@firebase/database";
import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';

const UserSelection = ({navigation,route}) => {
  const [userrole, setUserRole] = useState();
  const [user, setUser] = useState("");

    useEffect(() => { 
    setUser(auth().currentUser)
    },[user]);

  const updateData = ()=>{
 if(user){
  console.log("user ....userselction", user.uid );
  update(ref(db,'users/'+ user.uid),{
    role:userrole,
   }).then (()=>{
   console.log("data update succesfully")
 }).catch((error)=>{
   console.log("error",error.meassage)
 })
 }  
  }

  // update data **//
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
          selectedValue={userrole}
          onValueChange={(itemValue, itemIndex) =>
            setUserRole(itemValue)
          }
        >
          <Picker.Item label="Choose Role" value="Role" />

          <Picker.Item label="Buyer" value="Buyer" />
          <Picker.Item label="Seller" value="Seller" />
        </Picker>
      </View>
      <Button
        name="Save"
        color={colors.bluebtn}
        marginTop={spaceVertical.small}
          onPress={()=>updateData()}
      ></Button>
    </View>
  );
};
export default UserSelection;
