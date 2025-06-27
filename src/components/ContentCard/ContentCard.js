import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './ContentCard.styles';

const ContentCard = ({
  contentKey,
  onNavigate,
  img,
  title,
  rank,
  type,
  date,
  artistName,
}) => {
  return (
    <TouchableOpacity
      key={contentKey}
      onPress={onNavigate}
      style={
        type === 'genrePlaylists' || type === 'radio'
          ? styles.album_container
          : styles.song_container
      }>
      
      {type !== 'albums' && img && img.startsWith('http') ? (
        <View style={styles.image_container}>
          <Image style={styles.track_img} source={{uri: img}} />
        </View>
      ) : null}

      <View style={{marginLeft: 10, justifyContent: 'center'}}>
        <Text style={styles.song_title}>
          {title.length > 15 ? title.slice(0, 10) + '...' : title}
        </Text>

        {/* Albümde tarih göstermek */}
        {type === 'album' && !rank ? (
          <Text style={styles.song_rank}>
            {date?.slice(0, 4) || 'Tarih yok'} • Albüm
          </Text>
        ) : null}

        {/* Artist adı */}
        {type === 'genre' ||
        type === 'genrePlaylists' ||
        type === 'playlists' ||
        type === 'radios' ||
        type === 'playlistMain' ? (
          <Text style={styles.artist}>{artistName}</Text>
        ) : null}

        {/* Rank varsa onu her zaman göster */}
        {rank !== undefined && rank !== null ? (
          <Text style={styles.song_rank}>#{rank}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ContentCard;
