import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
      </View>
      <View style={styles.helpcontentCenter}>
        <Text style={styles.helpText}>This is how your kit's picture should look like before uploading it. So, we want you to crop the image to include just the kit:</Text>
        <Image
          style={styles.kitImage} // Define this style in your styles.js
          source={require('../assets/kit.jpg')}
        />
      
        
      </View>
      <Image
          style={styles.logo2}
          source={require('../assets/spd.png')}
        />
    </View>
  );
};

export default Help;
