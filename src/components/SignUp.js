import React, { useState } from 'react';
import styles from '../styles/styles';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@patient_id', value);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignUp = async () => {
    // Check if all fields are filled
    if (!fullName || !age || !gender || !username || !email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill all the fields before proceeding.');
      return;
    }

    // Check if email is valid
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      Alert.alert('Invalid email', 'Please provide a valid email.');
      return;
    }

    if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
      Alert.alert('Invalid gender', 'Gender must be either "male" or "female".');
      return;
    }
    
    // Check age is between 0 and 130
    if (age < 0 || age > 130) {
      Alert.alert('Invalid age', 'Age must be between 0 and 130 years old.');
      return;
    }

    // Check if age is less than 50
    if (age < 50) {
      Alert.alert(
        'Warning',
        'Please make sure the age provided is for the patient, not the user.',
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => submitSignUpData() }
        ]
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please confirm your password correctly.');
      return;
    }

    await submitSignUpData();
  };

  const submitSignUpData = async () => {
    const response = await fetch('http://0.0.0.0:5001/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: email,
        fullName: fullName,
        age: age,
        gender: gender,
        images: [],
        username: username,
        password: password  // You should hash this before sending!
      })
    });
  
    if (!response.ok) {
      Alert.alert('Signup failed', 'An error occurred. Please try again.');
      return;
    }
  
    console.log('response ok, navigating to home');
  
    // Save the email as patientId in AsyncStorage
    await AsyncStorage.setItem('@patient_id', email);
  
    navigation.navigate('Home');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      
      <TextInput placeholder="Full Name" style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setFullName(text)} autoCapitalize='none' />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput placeholder="Age" style={[styles.inputField, { flex: 1, marginRight: 10 }]} placeholderTextColor='lightgrey' keyboardType='numeric' onChangeText={text => setAge(text)} autoCapitalize='none' />
        <TextInput placeholder="Gender" style={[styles.inputField, { flex: 1, marginLeft: 10 }]} placeholderTextColor='lightgrey' onChangeText={text => setGender(text)} autoCapitalize='none' />
      </View>
      <TextInput placeholder="Username" style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setUsername(text)} autoCapitalize='none' />
      <TextInput placeholder="Email" style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setEmail(text)} autoCapitalize='none' />
      <TextInput placeholder="Password" secureTextEntry={!isPasswordVisible} style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setPassword(text)} autoCapitalize='none' />
      <TextInput placeholder="Confirm Password" secureTextEntry={!isPasswordVisible} style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setConfirmPassword(text)} autoCapitalize='none' />

      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordButton}>
        <Text style={styles.showPasswordText}>{isPasswordVisible ? 'Hide Password' : 'Show Password'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{marginTop: 20}}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Already have an account? 
        <Text style={{ color: '#78FAFA' }}> Log In</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}



// import React, { useState } from 'react';
// import styles from '../styles/styles';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Import Picker

// export default function SignUp({ navigation }) {
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [fullName, setFullName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!isPasswordVisible);
//   };

//   const handleSignUp = async () => {
//     // Check if all fields are filled
//     if (!fullName || !age || !gender || !username || !email || !password || !confirmPassword) {
//       Alert.alert('Missing fields', 'Please fill all the fields before proceeding.');
//       return;
//     }

//     // Check if email is valid
//     if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
//       Alert.alert('Invalid email', 'Please provide a valid email.');
//       return;
//     }

//     if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
//       Alert.alert('Invalid gender', 'Gender must be either "male" or "female".');
//       return;
//     }
    

//     // Check age is between 0 and 130
//     if (age < 0 || age > 130) {
//       Alert.alert('Invalid age', 'Age must be between 0 and 130 years old.');
//       return;
//     }

//     // Check if age is less than 50
//     if (age < 50) {
//       Alert.alert(
//         'Warning',
//         'Please make sure the age provided is for the patient, not the user.',
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "OK", onPress: () => submitSignUpData() }
//         ]
//       );
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Passwords do not match', 'Please confirm your password correctly.');
//       return;
//     }

//     await submitSignUpData();
//   };

//   const submitSignUpData = async () => {
//     const response = await fetch('http://0.0.0.0:5001/api/patients', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         _id: email,
//         fullName: fullName,
//         age: age,
//         gender: gender,
//         images: [],
//         username: username,
//         password: password  // You should hash this before sending!
//       })
//     });

//     if (!response.ok) {
//       Alert.alert('Signup failed', 'An error occurred. Please try again.');
//       return;
//     }

//     console.log('response ok, navigating to home');

//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Sign Up</Text>
//       </View>
      
//       <TextInput placeholder="Full Name" style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setFullName(text)} autoCapitalize='none' />
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//         <TextInput placeholder="Age" style={[styles.inputField, { flex: 1, marginRight: 10 }]} placeholderTextColor='lightgrey' keyboardType='numeric' onChangeText={text => setAge(text)} autoCapitalize='none' />
//         <TextInput placeholder="Gender" style={[styles.inputField, { flex: 1, marginLeft: 10 }]} placeholderTextColor='lightgrey' onChangeText={text => setGender(text)} autoCapitalize='none' />
//       </View>
//       <TextInput placeholder="Username" style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setUsername(text)} autoCapitalize='none' />
//       <TextInput placeholder="Email" style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setEmail(text)} autoCapitalize='none' />
//       <TextInput placeholder="Password" secureTextEntry={!isPasswordVisible} style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setPassword(text)} autoCapitalize='none' />
//       <TextInput placeholder="Confirm Password" secureTextEntry={!isPasswordVisible} style={styles.inputField} placeholderTextColor='lightgrey' onChangeText={text => setConfirmPassword(text)} autoCapitalize='none' />

//       <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordButton}>
//         <Text style={styles.showPasswordText}>{isPasswordVisible ? 'Hide Password' : 'Show Password'}</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//         <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{marginTop: 20}}>
//         <Text style={{ color: 'white', textAlign: 'center' }}>Already have an account? 
//         <Text style={{ color: '#78FAFA' }}> Log In</Text>
//         </Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

