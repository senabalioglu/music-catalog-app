import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  song_container: {
    flexDirection: 'row',
    //backgroundColor: 'red',
    margin: 10,
    marginLeft: 35,
    marginRight: 35,
  },

  album_container: {
    margin: 5,
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
  artist: {
    //marginLeft: 12,
    color: '#ACB8C2',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  image_container:  {
    alignItems: 'center',
  },
});
