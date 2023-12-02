import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import TabView from './TabView'; 
import axios from 'axios'; 

const Results = ({ navigation }) => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      const patientEmail = await AsyncStorage.getItem('@patient_id');
      if (patientEmail) {
        axios.get(`http://0.0.0.0:5001/api/patients/${patientEmail}`)
          .then(response => {
            const patientTabs = response.data.images.map((image, index) => {
              const content = image.prediction === 1
                ? <Text style={{color: '#59bdbd'}}>Indication of PD. Contact a neurologist.</Text>
                : <Text style={{color: '#59bdbd'}}>No indication of PD.</Text>;

              // Extract the date from the image object and format it.
              const dateTimeParts = image.date.split(' ');
              const dateString = dateTimeParts[0];
              const timeString = dateTimeParts[1];

              // Combine the date string and time string into an ISO 8601 compliant string
              const isoDateString = `${dateString}T${timeString}`;

              // Now you can create a Date object from isoDateString
              const date = new Date(isoDateString);

              const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
              const formattedDate = date.toLocaleDateString(undefined, options);

              return {
                title: `Diagnosis ${index + 1}, ${formattedDate}`,
                content: content,
                color: 'white',
                imageSource: require('../assets/colors.png'),
              };
            });

            setTabs(patientTabs.reverse());  // Reverse the array
          })
          .catch(error => {
            console.error(error);
          });
      }
    };

    fetchPatientData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Results</Text>
      </View>
      <Image
        style={styles.logo3}
        source={require('../assets/spd.png')}
      />
      <TabView tabs={tabs} />
    </ScrollView>
  );
};

export default Results;












// latest-------------------------------------------------------------------------------------------------------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from '../styles/styles';
// import TabView from './TabView'; 
// import axios from 'axios'; 

// const Results = ({ navigation }) => {
//   const [tabs, setTabs] = useState([]);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       const patientEmail = await AsyncStorage.getItem('@patient_id');
//       if (patientEmail) {
//         axios.get(`http://0.0.0.0:5001/api/patients/${patientEmail}`)
//           .then(response => {
//             const patientTabs = response.data.images.map((image, index) => {
//               const content = image.prediction === 1
//                 ? <Text style={{color: '#59bdbd'}}>Indication of PD. Contact a neurologist.</Text>
//                 : <Text style={{color: '#59bdbd'}}>No indication of PD.</Text>;

//               return {
//                 title: `Diagnosis ${index + 1}, ${new Date().toLocaleDateString()}`,
//                 content: content,
//                 color: 'white',
//                 imageSource: require('../assets/colors.png'),
//               };
//             });

//             setTabs(patientTabs.reverse());  // Reverse the array
//           })
//           .catch(error => {
//             console.error(error);
//           });
//       }
//     };

//     fetchPatientData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
//           <Image
//             source={require('../assets/arrow.png')}
//             style={styles.backArrow}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Results</Text>
//       </View>
//       <Image
//         style={styles.logo3}
//         source={require('../assets/spd.png')}
//       />
//       <TabView tabs={tabs} />
//     </ScrollView>
//   );
// };

// export default Results;
















// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from '../styles/styles';
// import TabView from './TabView'; 
// import axios from 'axios'; 

// const Results = ({ navigation }) => {
//   const [tabs, setTabs] = useState([]);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       const patientEmail = await AsyncStorage.getItem('@patient_id');
//       if (patientEmail) {
//         axios.get(`http://0.0.0.0:5001/api/patients/${patientEmail}`)
//           .then(response => {
//             const patientTabs = response.data.images.map((image, index) => {
//               const content = image.prediction === 1
//                 ? <Text style={{color: '#59bdbd'}}>Indication of PD. Contact a neurologist.</Text>
//                 : <Text style={{color: '#59bdbd'}}>No indication of PD.</Text>;

//               return {
//                 title: `Diagnosis ${index + 1}, ${new Date().toLocaleDateString()}`,
//                 content: content,
//                 color: 'white',
//                 imageSource: require('../assets/colors.png'),
//               };
//             });

//             setTabs(patientTabs);
//           })
//           .catch(error => {
//             console.error(error);
//           });
//       }
//     };

//     fetchPatientData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
//           <Image
//             source={require('../assets/arrow.png')}
//             style={styles.backArrow}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Results</Text>
//       </View>
//       <Image
//         style={styles.logo3}
//         source={require('../assets/spd.png')}
//       />
//       <TabView tabs={tabs} />
//     </ScrollView>
//   );
// };

// export default Results;



// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import styles from '../styles/styles';
// import TabView from './TabView'; // Import TabView component

// // Dummy content for the tabs
// const TabScreen1 = <Text style={{color: '#59bdbd'}}>Indication of PD. Contact a neurologist. </Text>; // Wrapped content with <Text>
// const TabScreen2 = <Text style={{color: '#59bdbd'}}>No indication of PD.</Text>; // Wrapped content with <Text>
// const TabScreen3 = <Text style={{color: '#59bdbd'}}>No indication of PD.</Text>; // Wrapped content with <Text>

// const Results = ({ navigation }) => {
//   const tabs = [
//     { title: 'Diagnosis 3, 22/05/25', content: TabScreen1, color: 'white', imageSource: require('../assets/colors.png') },
//     { title: 'Diagnosis 2, 14/03/24', content: TabScreen2, color: 'white', imageSource: require('../assets/colors2.png') },
//     { title: 'Diagnosis 1, 26/12/23', content: TabScreen3, color: 'white', imageSource: require('../assets/colors3.png') },
//   ];
  
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
//           <Image
//             source={require('../assets/arrow.png')}
//             style={styles.backArrow}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Results</Text>

      
//       </View>
//       <Image
//           style={styles.logo3}
//           source={require('../assets/spd.png')}
//         />
//       <TabView tabs={tabs} />
//     </ScrollView>
//   );
// };

// export default Results;
