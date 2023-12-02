import React, { useState } from 'react';
import styles from '../styles/styles';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@patient_id', value);
    } catch (e) {
      console.error(e);
    }
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://0.0.0.0:5001/api/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
  
      const data = await response.json();
  
      // Save the email as patientId in AsyncStorage
      await AsyncStorage.setItem('@patient_id', email);
  
      // Navigate to Home on successful login
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.toString());
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer2}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Log In</Text>
      </View>
      <TextInput
        placeholder="Email"
        style={styles.inputField}
        placeholderTextColor='lightgrey'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      <TextInput
        placeholder="Password"
        style={styles.inputField}
        secureTextEntry
        placeholderTextColor='lightgrey'
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}











// import React, { useState } from 'react';
// import styles from '../styles/styles';
// import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';

// export default function Login({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://0.0.0.0:5001/api/patients/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const message = await response.text();
//         throw new Error(message);
//       }

//       const data = await response.json();

//       // Navigate to Home on successful login
//       navigation.navigate('Home');
//     } catch (error) {
//       Alert.alert('Login Failed', error.toString());
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer2}>
//           <Image
//             source={require('../assets/arrow.png')}
//             style={styles.backArrow}
//           />
//         </TouchableOpacity>
//         <Text style={styles.title}>Log In</Text>
//       </View>
//       <TextInput
//         placeholder="Email"
//         style={styles.inputField}
//         placeholderTextColor='lightgrey'
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize='none'
//       />
//       <TextInput
//         placeholder="Password"
//         style={styles.inputField}
//         secureTextEntry
//         placeholderTextColor='lightgrey'
//         value={password}
//         onChangeText={setPassword}
//         autoCapitalize='none'
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={{ color: 'white', textAlign: 'center' }}>Log In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }