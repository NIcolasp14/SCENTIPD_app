import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#161117',
  },
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpcontentCenter: {
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top of the container
    padding: 20, // This gives some space around the items
  },
  
  tabViewContainer: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  
  tabScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  logo2: {
    width: 50,
    height: 50,
    marginBottom: 0,
    bottom: 578,
    left: 280
  },
  kitImage: {
    width: '120%', // or any specific size
    height: 400, // or any specific size
    resizeMode: 'contain', // or 'cover' depending on how you want to display the image
    marginTop: 30, // add some space below the image
  },
  
  logo3: {
    bottom: 50, // Adjust this as needed
    left: 280, // Adjust this as needed
    width: 50,
    height: 50,
  },
  
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoText2: {
    color: '#78FAFA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  helpText: {
    color: 'white',
    fontSize: 16,
  },
  backArrow: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  backArrowContainer2: {
    position: 'absolute',
    bottom: 200,
    left: 2,
  },
  
  backArrowContainer: {
    position: 'absolute',
    left: 5,
  },
  showPasswordButton: {
    alignSelf: 'flex-end', // aligns the button to the right
    marginBottom: 20, // add some space below the button
  },
  
  showPasswordText: {
    color: 'white',
    fontSize: 14, // adjust this value to change the text size
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,  // Add this line to add 20 pixels of space below the title.
  },

  link: {
    color: 'blue',
    marginTop: 60,
  },
  button2: {
    // backgroundColor: '#1976d2', // replace with your desired color
    // padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  
  buttonText: {
    color: '#2A63CB',
    fontSize: 18,
  },  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputField: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: 'white', // This changes the text color.
    borderRadius: 10,
    backgroundColor: '#2A2A2A', //'#161117',
  },  
  textContainer: {
    flex: 0.5, // take up the other half of the tab
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10, // add some padding to ensure text isn't too close to the edge
  },
  
  button: {
    backgroundColor: '#59bdbd',
    color: 'white', 
    padding: 10,
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
