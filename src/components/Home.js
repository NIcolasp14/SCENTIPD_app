import React, { useState } from 'react';
import { View, Text, Image, Linking, Animated, Easing, TouchableOpacity } from 'react-native'; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button2}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const spinValue = useState(new Animated.Value(0))[0]

  Animated.loop(
    Animated.timing(
      spinValue,
    {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true
    }
    )
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const BACKEND_URL = 'http://0.0.0.0:5001/scentipd/image_processing';
  
  const handleCameraOpen = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      // maxHeight: 200,
      // maxWidth: 200,
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        sendImageToBackend({
          base64: response.assets[0].base64,
          type: response.assets[0].type
        });
      } else {
        console.log('No asset found in response');
      }
    });
  };
  
  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        sendImageToBackend({
          base64: response.assets[0].base64,
          type: response.assets[0].type
        });
      }
    });
  };
  

  const sendImageToBackend = async (image) => {
    const patientId = await AsyncStorage.getItem('@patient_id'); // Get the patientId from AsyncStorage
  
    // No need to create a FormData object or split the URI to get the file type
    // Instead, directly use the base64 image data that you get from the response

    const options = {
      method: 'POST',
      body: JSON.stringify({
        patientId: patientId,
        image: image.base64,
    }),    
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    return fetch(BACKEND_URL, options);
  };
  
  

  const handleShowResults = () => {
    navigation.navigate('Results');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentCenter}>
        <Animated.Image
          style={{ 
            ...styles.logo,
            transform: [{rotate: spin}]
          }}
          source={require('../assets/spd.png')}
        />

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.logoText}>SCENTI</Text>
          <Text style={styles.logoText2}>PD</Text>
        </View>

        <CustomButton title="Open Camera" onPress={handleCameraOpen} />
        <CustomButton title="Upload Image" onPress={handleImageUpload} />
        <CustomButton title="Show Results" onPress={handleShowResults} />
        <CustomButton title="Help" onPress={handleHelp} />
        <Text style={styles.link} onPress={() => Linking.openURL('https://2023.igem.wiki/athens/')}>
          www.scentipd.com
        </Text>
      </View>
    </View>
  );
};

export default Home;
