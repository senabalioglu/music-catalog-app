import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  back_container: {
    position: 'absolute',
    margin: 15,
  },
  playlist_img: {
    height: 375,
    width: '%100',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  playlist_name_container: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  playlist_name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    margin: 10,
    color: 'white',
  },
  song_container: {
    flexDirection: 'row',
    //backgroundColor: 'red',
    margin: 10,
    marginLeft: 35,
    marginRight: 35,
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
});
