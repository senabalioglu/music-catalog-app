import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './ArtistDetail.styles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useFetch from '../../hooks/useFetch/useFetch';
import ArtistAvatar from '../../components/ArtistAvatar/ArtistAvatar';
import ShowMore from '../../components/ShowMore/ShowMore';
import ContentCard from '../../components/ContentCard/ContentCard';
import ImageCard from '../../components/ImageCard/ImageCard';

function ArtistDetail({route, navigation}) {
  const {id} = route.params;

  const [related, setRelated] = useState([]);
  const [showAllContent, setShowAllContent] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.deezer.com/artist/${id}/related`)
      .then(res => setRelated(res.data.data))
      .catch(err => console.log('Veri çekilemedi', err));
  }, [id]);

  const handleMusicSelect = (id, type) => {
    const pageMap = {
      popular_songs: 'PopularMusicDetailPage',
      artists: 'ArtistDetailPage',
      playlists: 'PlaylistDetailPage',
      albums: 'PlaylistDetailPage',
    };
    navigation.navigate(pageMap[type], {id, type});
  };

  const {
    data: artistData,
    loading: loadingArtists,
    error: artistErr,
  } = useFetch(`https://api.deezer.com/artist/${id}`);

  const {
    data: topTracksData,
    loading: loadingTopTracks,
    error: topTracksErr,
  } = useFetch(`https://api.deezer.com/artist/${id}/top?limit=50`);

  const {
    data: albumsData,
    loading: loadingAlbums,
    error: albumsError,
  } = useFetch(`https://api.deezer.com/artist/${id}/albums`);

  if (loadingArtists || loadingTopTracks || loadingAlbums) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (artistErr || topTracksErr || albumsError) {
    return (
      <SafeAreaView>
        <Text>Error loading data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ImageCard img={artistData.picture_medium} imgData={artistData} contentTitle={artistData.name} nav={navigation.goBack} contentType={'artistImage'} isArtist={true}/>

        <Text style={styles.text}>Popüler</Text>
        {(showAllContent
          ? topTracksData?.data
          : topTracksData?.data?.slice(0, 5) || []
        ).map(popular => (
          <ContentCard
            key={popular.id}
            contentKey={popular.id}
            onNavigate={() => handleMusicSelect(popular.id, 'popular_songs')}
            img={popular.album.cover_medium}
            title={popular.title}
            rank={popular.rank}
            type={'popular_songs'}
          />
        ))}
        {topTracksData?.data?.length > 5 && (
          <ShowMore show={showAllContent} setShow={setShowAllContent} />
        )}

        <Text style={styles.text}>Benzer Sanatçılar</Text>
        <View style={styles.related_container}>
          {(related || []).slice(0, 6).map(item => (
            <ArtistAvatar key={item.id} avatar={item} navi={navigation} />
          ))}
        </View>

        <Text style={styles.text}>Popüler Albümler</Text>
        <View>
          
          {(showAllContent
            ? albumsData?.data
            : albumsData?.data?.slice(0, 5) || []
          ).map(album => (
            <ContentCard
              key={album.id}
              contentKey={album.id}
              onNavigate={() => handleMusicSelect(album.id, 'albums')}
              img={album.cover_medium}
              title={album.title}
              date={album.release_date}
              type={'album'}
            />
          ))}
          
          {albumsData?.data?.length > 5 && (
            <ShowMore show={showAllContent} setShow={setShowAllContent} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ArtistDetail;
