import React from 'react';
import styles from './PopularMusicCard.styles';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const PopularMusicCard = ({popularMusic, handleSelect, type}) => {
  // Text içeriği
  const title =
    type === 'artists' || type === 'genre'
      ? popularMusic.name
      : popularMusic.title;

  // Image kaynağı
  const imageUrl =
    type === 'popular_songs'
      ? popularMusic.album?.cover_medium
      : popularMusic.picture_medium;

  // Stil birleştirmeleri
  const cardStyle = [
    styles.cardBase,
    type === 'genre' || type === 'radios' || type === 'playlists'
      ? styles.genreCard
      : styles.card,
  ];

  const imageStyle = [
    styles.imgBase,
    type === 'genre' || type === 'radios' || type === 'playlists'
      ? styles.genreImg
      : styles.img,
  ];

  const textStyle =
    type === 'genre' || type === 'radios' || type === 'playlists'
      ? styles.genreTitle
      : type === 'playlists' || type === 'artists'
      ? styles.artist
      : styles.title;
  //böyle else if yapılabiliyormuş tmam mı

  const containerStyle =
    type === 'genre' || type === 'radios' || type === 'playlists'
      ? styles.genreContainer
      : styles.innerContainer;

  return (
    <TouchableOpacity style={cardStyle} onPress={handleSelect}>
      <Image style={imageStyle} source={{uri: imageUrl}} />
      <View style={containerStyle}>
        {type !== 'playlists' && <Text style={textStyle}>{title.length > 20 ? title.slice(0, 10) + '...' : title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default PopularMusicCard;
