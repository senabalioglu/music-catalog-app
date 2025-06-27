import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container_1: {
    padding: 18,
  },
  container_2: {
    flex: 15,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    alignItems: 'center',
  },

  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 45,
    borderWidth: 3,
    padding: 10,
    borderRadius: 150,
  },

  image: {
    borderWidth: 1.7,
    width: 230,
    height: 230,
    borderRadius: 115,
  },

  playIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  song_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  artist_name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#656F77',
  },
  release_date: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  duration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#656F77',
  },
  album_container: {
    flexDirection: 'row',
    margin: 10,
    //marginLeft: 35,
    //marginRight: 35,
  },
  album_img: {
    height: 68,
    width: 68,
    marginLeft: 10,
  },
  album_title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});
