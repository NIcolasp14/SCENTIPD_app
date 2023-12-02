import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const TabView = ({tabs}) => {
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // const handleTabPress = () => {
  //   navigation.navigate('BlackScreen');
  // };

  return (
    <View style={styles.container}>
      <PanGestureHandler>
        <Animated.ScrollView
          style={styles.tabsContainer}
          contentContainerStyle={{ paddingTop: 30 }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          snapToInterval={280} // Snap to the height of the tab plus marginTop
          snapToAlignment="start"
          decelerationRate="fast"
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity style={styles.tab} key={index}>
            {/* <TouchableOpacity onPress={handleTabPress} style={styles.tab} key={index}> */}
              <View style={styles.imageContainer}>
                <Image source={tab.imageSource} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ color: tab.color }}>{tab.title}</Text>
                {tab.content}
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </PanGestureHandler>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'column', // arrange tabs in a column
  },
  tab: {
    backgroundColor: '#161117',
    height: 250,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // This sets the thickness of the border.
    borderColor: 'white', // This sets the color of the border.
    marginTop: 30,
    borderRadius: 25,
  },
  imageContainer: {
    flex: 0.5, // take up half of the tab
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5, // take up the other half of the tab
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 25, // match tab's border radius
    borderTopRightRadius: 25, // match tab's border radius
  },
});

export default TabView;


