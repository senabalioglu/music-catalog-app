import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
import axios from 'axios';
import PopularMusicCard from '../../components/PopularMusicCard/PopularMusicCard';
import Config from 'react-native-config';
import SearchBar from '../../components/SearchBar/SearchBar';

const Genres = ({type, navigation}) => {
  const [genres, setGenres] = useState([]);

  console.log('Tip gelsin :((', type);

  const requestURL =
    type === 'genre'
      ? Config.API_GENRE_URL
      : type === 'playlists'
      ? Config.API_PLAYLISTS_URL
      : 'https://api.deezer.com/radio';

  const navigatePage =
    type === 'genre'
      ? 'GenreDetailPage'
      : type === 'playlists'
      ? 'PlaylistDetailPage'
      : type === 'radios'
      ? 'PlaylistDetailPage'
      : null;
  useEffect(() => {
    axios
      .get(requestURL)
      .then(response => {
        setGenres(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log('Bir hata oluştu', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenreSelect = id => {
    navigation.navigate(navigatePage, {id, type});
  };

  const renderGenres = ({item}) => (
    <PopularMusicCard
      handleSelect={() => handleGenreSelect(item.id, type)}
      popularMusic={item}
      type={type}
      //key={`${type}-${item.id}-${item.name}`}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView>
        <FlatList
          data={genres}
          renderItem={renderGenres}
          keyExtractor={(item, index) =>
            `${type}-${item.id}-${
              item.title || item.name || 'no-name'
            }-${index}`
          }
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Genres;
