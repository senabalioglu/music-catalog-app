import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import useFetch from '../../hooks/useFetch/useFetch';
import styles from './PopularMusicDetail.styles';
import {ActivityIndicator} from 'react-native';
import MusicPreview from '../../components/MusicPreview/MusicPreview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArtistAvatar from '../../components/ArtistAvatar/ArtistAvatar';

const PopularMusicDetail = ({route, navigation}) => {
  const {id} = route.params;
  console.log('Music ID: ', id);

  const {data, loading, error} = useFetch(
    `${Config.API_POPULAR_MUSIC_DETAIL_URL}/${id}`,
    console.log(data),
  );

  if (loading) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text>Error</Text>
        </View>
      </SafeAreaView>
    );
  }

  const shortTitle =
    data.title.length > 40 ? data.title.substring(0, 50) + '...' : data.title;
  const shortAlbum =
    data.album.title.length > 20
      ? data.album.title.substring(0, 10) + '...'
      : data.album.title;

  const handleAlbumSelect = (id, type) => {
    navigation.navigate('PlaylistDetailPage', {id, type});
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#999999'}}>
      <View style={styles.container_1}>
        <Icon
          name={'arrow-left'}
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.container_2}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{uri: data.album.cover_medium}}
            />
            <View style={styles.playIconContainer}>
              <MusicPreview
                style={{alignItems: 'center', justifyContent: 'center'}}
                previewUrl={data.preview}
              />
            </View>
          </View>
          <View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.song_title}>
              {shortTitle}
            </Text>
          </View>

          <Text style={styles.artist_name}>{data.artist.name}</Text>
          <Text style={styles.release_date}>
            {' '}
            Yayın Tarihi: {data.release_date}
          </Text>
          <Text style={styles.duration}> Süre: {data.duration} saniye</Text>
          <View style={styles.album_container}>
            <View
              style={{
                flexDirection: 'column',
                //margin: 10,
                justifyContent: 'center',
              }}>
              <Text style={styles.album_title}> Albüm: {shortAlbum}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => handleAlbumSelect(data.album.id, 'albums')}>
                <Image
                  style={styles.album_img}
                  source={{uri: data.album.cover_medium}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20}}>
            Sanatçılar
          </Text>
          <View style={{flexDirection: 'row'}}>
            {data?.contributors?.length > 0 ? (
              data.contributors.map((contributor, index) => (
                <ArtistAvatar
                  key={contributor.id || index}
                  avatar={contributor}
                  navi={navigation}
                />
              ))
            ) : (
              <Text>Loading or no tracks</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PopularMusicDetail;
