import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import styles from './SearchBar.styles';

const SearchBar = ({visible, onClose, onSelect}) => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [showAllArtists, setShowAllArtists] = useState(false);
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      axios.get(`https://api.deezer.com/search/artist?q=${query}`).then(res => setArtists(res.data.data));
      axios.get(`https://api.deezer.com/search/album?q=${query}`).then(res => setAlbums(res.data.data));
      axios.get(`https://api.deezer.com/search/track?q=${query}`).then(res => setTracks(res.data.data));
      axios.get(`https://api.deezer.com/search/playlist?q=${query}`).then(res => setPlaylists(res.data.data));
    } else {
      setArtists([]);
      setAlbums([]);
      setTracks([]);
      setPlaylists([]);
    }
  }, [query]);

  const formattedImage = (item, type) => {
    switch (type) {
      case 'artists':
        return item.picture_medium;
      case 'album':
        return item.cover_medium;
      case 'popular_songs':
        return item.album?.cover_medium;
      case 'playlists':
        return item.picture_medium;
      default:
        return '';
    }
  };

  const renderSection = (
    title,
    data,
    type,
    showAll,
    toggleShowAll,
    keyProp = 'title',
  ) => {
    if (data.length === 0) return null;

    const slicedData = showAll ? data : data.slice(0, 5);

    return (
      <>
        <Text style={{marginTop: 20, fontFamily: 'Poppins-Bold', fontSize: 20}}>
          {title}
        </Text>
        {slicedData.map(item => (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', margin: 5}}
            key={item.id}
            onPress={() => onSelect(item.id, type)}>
            <Image
              source={{uri: formattedImage(item, type)}}
              style={{width: 50, height: 50, borderRadius: 5, marginRight: 10}}
            />
            <Text style={styles.resultText}>{item[keyProp]}</Text>
          </TouchableOpacity>
        ))}
        {data.length > 5 && (
          <TouchableOpacity
            onPress={toggleShowAll}
            style={{
              alignSelf: 'center',
              marginTop: 10,
              padding: 6,
              borderRadius: 35,
              borderWidth: 1,
              borderColor: '#ccc',
            }}>
            <Text style={{color: '#888'}}>
              {showAll ? 'Daha azını göster' : 'Daha fazlasını gör'}
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{padding: 20, flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="magnify" size={24} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Şarkı, sanatçı, albüm ara..."
            style={styles.input}
            autoFocus
          />
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {renderSection(
            '🎤 Sanatçılar',
            artists,
            'artists',
            showAllArtists,
            () => setShowAllArtists(prev => !prev),
            'name',
          )}
          {renderSection(
            '💿 Albümler',
            albums,
            'album',
            showAllAlbums,
            () => setShowAllAlbums(prev => !prev),
          )}
          {renderSection(
            '🎵 Şarkılar',
            tracks,
            'popular_songs',
            showAllTracks,
            () => setShowAllTracks(prev => !prev),
          )}
          {renderSection(
            '🎧 Playlistler',
            playlists,
            'playlists',
            showAllPlaylists,
            () => setShowAllPlaylists(prev => !prev),
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SearchBar;
