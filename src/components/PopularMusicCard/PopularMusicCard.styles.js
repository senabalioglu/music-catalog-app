import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Ortak kart yapısı
  cardBase: {
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
  },

  // Type'a göre gelen farklı boyutlar
  card: {
    width: 240,
    height: 240,
  },

  genreCard: {
    flex: 1,
  },

  // Ortak img yapısı
  imgBase: {
    width: '100%',
  },

  img: {
    height: 170,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  genreImg: {
    height: 170,
    borderRadius: 15,
  },

  // İçerik alanları
  innerContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },

  genreContainer: {
    position: 'absolute',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },

  // Text stilleri
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: 5,
  },

  artist: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },

  genreTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: 5,
    color: 'white',
  },
});
