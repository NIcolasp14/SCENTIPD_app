import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

function HelpScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help Page</Text>
      <Image
        source={require('./spd.png')}
        style={styles.image}
      />
      <Text style={styles.text}>
        Here is some help text that will be really helpful to you.
      </Text>
      <Image
        source={require('./spd.png')}
        style={styles.image}
      />
      <Text style={styles.text}>
        Some more helpful text to assist you.
      </Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 16,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default HelpScreen;
