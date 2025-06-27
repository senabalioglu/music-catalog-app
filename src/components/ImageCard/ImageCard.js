
import React from 'react';
import {Image, View, Text} from 'react-native';
import styles from './ImageCard.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ImageCard = ({img, imgData, contentTitle, nav, contentType, isArtist}) => {
  const pictureMedium =
    contentType === 'playlists' ||
    contentType === 'playlistMain' ||
    contentType === 'radios' ||
    contentType === 'contentGenre'
      ? imgData.picture_medium
      : imgData.cover_medium;

  return (
    <View style={styles.container}>
      <Image style={styles.playlist_img} source={{uri: isArtist ? img : pictureMedium}} />
      <View style={styles.back_container}>
        <Icon
          name={'arrow-left'}
          size={30}
          onPress={() => {
            if (typeof nav === 'function') {
              nav();
            }
          }}
        />
      </View>
      <View style={styles.playlist_name_container}>
        <Text style={styles.playlist_name}>{contentTitle}</Text>
      </View>
    </View>
  );
};

export default ImageCard;