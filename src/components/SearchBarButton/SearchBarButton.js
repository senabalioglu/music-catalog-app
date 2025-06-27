import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigation, getStateFromPath} from '@react-navigation/native';

const SearchTabButton = () => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSelect = (id, type) => {
    setSearchModalVisible(false);

    // Hedef ekranı ve parametreleri belirle
    let targetScreen = '';
    switch (type) {
      case 'artists':
        targetScreen = 'ArtistDetailPage';
        break;
      case 'popular_songs':
        targetScreen = 'PopularMusicDetailPage';
        break;
      case 'playlists':
      case 'album':
        targetScreen = 'PlaylistDetailPage';
        break;
      default:
        return;
    }

    // Aktif stack neresi olursa olsun, yönlendirmeyi yap
    navigation.navigate('Popular', {
      screen: targetScreen,
      params: {id, type},
    });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setSearchModalVisible(true)}
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 12,
          borderRadius: 30,
          marginTop: -20,
          elevation: 3,
        }}>
        <Icon name="magnify" size={24} />
      </TouchableOpacity>

      <SearchBar
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSelect={handleSelect}
      />
    </>
  );
};

export default SearchTabButton;
