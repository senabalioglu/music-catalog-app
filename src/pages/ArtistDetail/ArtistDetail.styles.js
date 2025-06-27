import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  back_container: {
    position: 'absolute',
    margin: 15,
  },
  container: {},
  artist_img: {
    height: 375,
    width: '%100',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  artist_name_container: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  artist_name: {
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
  },

  album_container: {
    //flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    width: 100,
  },

  track_img: {
    height: 68,
    width: 68,
    borderRadius: 8,
  },
  song_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  song_rank: {
    color: '#ACB8C2',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },

  related_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
