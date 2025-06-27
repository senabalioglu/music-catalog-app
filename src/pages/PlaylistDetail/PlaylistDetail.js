import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import useFetch from '../../hooks/useFetch/useFetch';
import ContentCard from '../../components/ContentCard/ContentCard';
import ImageCard from '../../components/ImageCard/ImageCard';

function PlaylistDetail({route, navigation}) {
  const {id} = route.params;
  const {type} = route.params;
  console.log('Playlist ID: ', id);
  console.log('Gönderilen tip: ', type);

  const fetchTracksURL =
    type === 'playlists' || type === 'playlistMain'
      ? `https://api.deezer.com/playlist/${id}/tracks`
      : type === 'radios'
      ? `https://api.deezer.com/radio/${id}/tracks`
      : `https://api.deezer.com/album/${id}/tracks`;
  type === 'genrePlaylists'
    ? `https://api.deezer.com/album/${id}/tracks`
    : null;

  const fetchImageURL =
    type === 'playlists' || type === 'playlistMain'
      ? `https://api.deezer.com/playlist/${id}`
      : type === 'radios'
      ? `https://api.deezer.com/radio/${id}`
      : `https://api.deezer.com/album/${id}`;
  type === 'genrePlaylists' ? `https://api.deezer.com/album/${id}` : null;

  const {
    data: playlistData,
    loading: loadingPlaylist,
    error: errorPlaylist,
  } = useFetch(fetchTracksURL);
  console.log(playlistData.data);

  const {
    data: imageData,
    loading: loadingImage,
    error: errorImage,
  } = useFetch(fetchImageURL);

  if (loadingPlaylist || loadingImage) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (errorPlaylist || errorImage) {
    return (
      <SafeAreaView>
        <View>
          <Text>Error</Text>
        </View>
      </SafeAreaView>
    );
  }

      const handleSelect = id => {
        navigation.navigate('PopularMusicDetailPage', {id});
      };

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageCard imgData={imageData} contentTitle={imageData.title} nav={navigation.goBack} contentType={type} />
        <View>
          {playlistData?.data?.length > 0 ? (
            playlistData.data.map((data, index) => (
              <ContentCard
              key={`${data.id}-${index}`}
              contentKey={`${data.id}-${index}`}
              onNavigate={() => handleSelect(data.id)}
              title={data.title}
              rank={data.rank}
              img={data.album?.cover_medium}
              type={type}
              artistName={data.artist.name}
              date={data.release_date}
              />
            ))
          ) : (
            <Text>Loading or no tracks</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PlaylistDetail;
