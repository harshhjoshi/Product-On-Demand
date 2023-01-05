import React, {Component,useEffect} from "react";
import PushNotification from "react-native-push-notification";

const PushController = () => {
    useEffect(()  => {
        PushNotification.configure({
            onRegister: function(token) {
              console.log("TOKEN:", token);
            },
          
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
          
            },
            senderID: "1090501687137",
            permissions: {
            
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });
          
    })

        return null;
    
}

export default PushController;