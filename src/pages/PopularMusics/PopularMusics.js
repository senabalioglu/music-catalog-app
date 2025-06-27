import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import PopularMusicCard from '../../components/PopularMusicCard/PopularMusicCard';
import Config from 'react-native-config';
import SearchBar from '../../components/SearchBar/SearchBar';

function PopularMusics({navigation}) {
  const [tracks, setTracks] = useState([]);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get(Config.API_POPULAR_MUSIC_URL)
      .then(res => {
        setTracks(res.data.tracks.data);
      })
      .catch(err => {
        console.log('Veri çekilemedi', err);
      });

      axios.get(Config.API_ARTISTS_URL).then(response => {
        setAlbumTracks(response.data.data); // Albümden gelen şarkılar
      });

      axios.
      get(Config.API_PLAYLISTS_URL).then(resp => {
        setPlaylists(resp.data.data);
      });
  }, []);

  const handleMusicSelect = (id, type) => {
    const navigationPageMap = {
      popular_songs: 'PopularMusicDetailPage', //music detail page bu direkt (popüler deil yani)
      artists: 'ArtistDetailPage',
      playlistMain: 'PlaylistDetailPage',
      playlists: 'PlaylistDetailPage',
      album: 'PlaylistDetailPage',
    };

    const navigationPage = navigationPageMap[type];

    navigation.navigate(navigationPage, {id, type});
  }

  const renderPopularMusics = ({item}) => (
    <PopularMusicCard
    type={'popular_songs'}
      handleSelect={() => handleMusicSelect(item.id, 'popular_songs')}
      popularMusic={item}
      //artists için farklı fonk oluşturup her ikisine de "type" göndermece
    />
  );

  const renderArtists = ({item}) => (
    <PopularMusicCard
      type={'artists'}
      handleSelect={() => handleMusicSelect(item.id, 'artists')}
      popularMusic={item}
      //artists için farklı fonk oluşturup her ikisine de "type" göndermece
    />
  );

  const renderPlaylists = ({item}) => (
    <PopularMusicCard
    type={'playlistMain'}
      handleSelect={() => handleMusicSelect(item.id, 'playlistMain')}
      popularMusic={item}
      //artists için farklı fonk oluşturup her ikisine de "type" göndermece
    />
  );

  return (
    <SafeAreaView style={styles.mainpage}>
      <ScrollView>

        <Text style={styles.main_title}>Popüler Müzikler</Text>
        <FlatList
          style={styles.flatlist}
          horizontal
          data={tracks}
          renderItem={renderPopularMusics}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.main_title}>Popüler Sanatçılar</Text>
        <FlatList
          style={styles.flatlist}
          horizontal
          data={albumTracks}
          renderItem={renderArtists}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.main_title}>Popüler Playlistler</Text>
        <FlatList
        style = {styles.flatlist}
        horizontal
        data={playlists}
        renderItem={renderPlaylists}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        //scrollEnabled = {false}
        //numColumns={2}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main_title: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 15,
    marginTop: 20,
    fontSize: 24,
    textAlign: 'left',
  },
  flatlist: {
    marginLeft: 15,
    marginVertical: 10,
  },
});

export default PopularMusics;
