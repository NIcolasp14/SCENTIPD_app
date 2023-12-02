import React from 'react';
import { View, Button } from 'react-native';

function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Results"
        onPress={() => navigation.navigate('Results')}
      />
      <Button
        title="Help"
        onPress={() => navigation.navigate('Help')}
      />
    </View>
  );
}

export default HomePage;
