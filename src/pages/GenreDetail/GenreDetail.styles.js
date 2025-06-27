import { StyleSheet } from "react-native";

export default StyleSheet.create({
    back_container:{
        position: 'absolute',
        margin: 15,
      },
      container: {},
      genre_img: {
        height: 375,
        width: '%100',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      },
      genre_name_container: {
        position: 'absolute',
        bottom: 10,
        left: 10,
      },
      genre_name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        margin: 10,
        color: 'white',
      },
      main: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        //alignItems: 'center'
      },
      text: {
        margin: 15,
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
      },
      song_container: {
        flexDirection: 'row',
        //backgroundColor: 'red',
        margin: 10,
        marginLeft: 35,
        marginRight: 35,
        alignItems: 'center',
      },
      
      track_img: {
        height: 68,
        width : 68,
        borderRadius: 8,
        margin: 10,
      },
      song_title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
      },
      artist: {
        //marginLeft: 12,
        color: '#ACB8C2',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
      },
      album_container: {
        margin: 5,
      }
})