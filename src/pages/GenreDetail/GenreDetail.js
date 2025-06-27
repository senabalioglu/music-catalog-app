import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import useFetch from '../../hooks/useFetch/useFetch';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './GenreDetail.styles';
import ArtistAvatar from '../../components/ArtistAvatar/ArtistAvatar';
import axios from 'axios';
import ContentCard from '../../components/ContentCard/ContentCard';
import ImageCard from '../../components/ImageCard/ImageCard';

function GenreDetail({route, navigation}) {
  const {id} = route.params;

  const [genreArtists, setGenreArtists] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.deezer.com/genre/${id}/artists`)
      .then(res => {
        setGenreArtists(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log('Veri çekilemedi', err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: genreData,
    loading: loadingGenre,
    error: genreErr,
  } = useFetch(`https://api.deezer.com/genre/${id}`);

  const {
    data: tracksData,
    loading: loadingTracks,
    error: errorTracks,
  } = useFetch(`https://api.deezer.com/editorial/${id}/charts `);

  const {
    data: radioData,
    loading: loadingRadio,
    error: errorRadio,
  } = useFetch(`https://api.deezer.com/genre/${id}/radios`);
  console.log(radioData.data);

  const {
    data: editorialData,
    loading: loadingEditorial,
    error: errorEditorial,
  } = useFetch(`https://api.deezer.com/editorial/${id}/selection`);

  const navigateToDetail = id => {
    navigation.navigate('PopularMusicDetailPage', {id});
  };

  const renderGenreArtists = ({item}) => (
    <ArtistAvatar avatar={item} navi={navigation} />
  );

  const handleSelect = (id, type) => {
    const navigationPageMap = {
      popular_songs: 'PopularMusicDetailPage', //music detail page bu direkt (popüler deil yani)
      artists: 'ArtistDetailPage',
      playlists: 'PlaylistDetailPage',
      radios: 'PlaylistDetailPage',
      genrePlaylists: 'PlaylistDetailPage',
    };

    const navigationPage = navigationPageMap[type];

    navigation.navigate(navigationPage, {id, type});
  };

  if (loadingTracks || loadingGenre || loadingRadio || loadingEditorial) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (errorTracks || genreErr || errorRadio || errorEditorial) {
    return (
      <SafeAreaView>
        <View>
          <Text>Error</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageCard imgData={genreData} contentTitle={genreData.name} nav={navigation.goBack} isArtist={false} contentType={"contentGenre"} />
        <Text style={styles.text}>Popüler</Text>
        {tracksData?.tracks?.data?.length > 0 ? (
          tracksData.tracks.data
            .slice(0, 5)
            .map(tracks => (
              <ContentCard
                key={tracks.id}
                contentKey={tracks.id}
                onNavigate={() => handleSelect(tracks.id, 'popular_songs')}
                img={tracks.album.cover_medium}
                title={tracks.title}
                type={'genre'}
                artistName={tracks.artist.name}
              />
            ))
        ) : (
          <Text>Loading or no tracks</Text>
        )}
        <Text style={styles.text}>Sanatçılar</Text>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={genreArtists.slice(0, 6)}
            renderItem={renderGenreArtists}
            //horizontal
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <Text style={styles.text}>Albümler</Text>
        <ScrollView horizontal>
          {editorialData?.data?.length > 0 ? (
            editorialData.data
              .slice(0, 5)
              .map(playlist => (
                <ContentCard
                  key={playlist.id}
                  contentKey={playlist.id}
                  onNavigate={() => handleSelect(playlist.id, 'genrePlaylists')}
                  img={playlist.cover_medium}
                  title={playlist.title}
                  type={'genrePlaylists'}
                  artistName={playlist.artist.name}
                />
              ))
          ) : (
            <Text>Loading or no tracks</Text>
          )}
        </ScrollView>
        <Text style={styles.text}>Radyolar</Text>
        <ScrollView horizontal>
          {radioData?.data?.length > 0 ? (
            radioData.data.slice(0, 5).map(radio => (
              <ContentCard key={radio.id}
                  contentKey={radio.id}
                  onNavigate={() => handleSelect(radio.id, 'radios')}
                  img={radio.picture_medium}
                  title={radio.title}
                  type={'radio'}
                  />
            ))
          ) : (
            <Text>Loading or no tracks</Text>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default GenreDetail;
