import { StyleSheet } from "react-native";

export default StyleSheet.create({

  categoryTitle: {
  fontWeight: 'bold',
  fontSize: 16,
  marginTop: 10,
  marginBottom: 5,
  color: '#333',
},

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EEF3',
    padding: 5,
    margin: 15,
    borderRadius: 10,
    height: 50,
  },

  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    flex: 1,
    paddingHorizontal: 10,
  },

  dropdown: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    //marginTop: -10,
    borderRadius: 10,
    maxHeight: 250,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  resultItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },

  resultText: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  resultTitle: {
     marginTop: 20,
     fontFamily: 'Poppins-Bold'
  }
});
