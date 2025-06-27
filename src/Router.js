import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PopularMusics from './pages/PopularMusics/PopularMusics';
import PopularMusicDetail from './pages/PopularMusicDetail/PopularMusicDetail';
import Genres from './pages/Genres/Genres';
import Radio from './pages/Radio/Radio';
import Playlists from './pages/Playlists/Playlists';
import ArtistDetail from './pages/ArtistDetail/ArtistDetail';
import PlaylistDetail from './pages/PlaylistDetail/PlaylistDetail';
import GenreDetail from './pages/GenreDetail/GenreDetail';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import SearchTabButton from './components/SearchBarButton/SearchBarButton';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const EmptyScreen = () => null;

const ArtistStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ArtistDetailPage" component={ArtistDetail} />
      <Stack.Screen
        name="PopularMusicDetailPage"
        component={PopularMusicDetail}
      />
      <Stack.Screen
        name="PlaylistDetailPage"
        component={PlaylistDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// Popüler sekmesinde stack yapısı:
const PopularStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PopularTracksPage"
        component={PopularMusics}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PopularMusicDetailPage"
        component={PopularMusicDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ArtistDetailPage"
        component={ArtistDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaylistDetailPage"
        component={PlaylistDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Artist" component={ArtistStack} />
    </Stack.Navigator>
  );
};

const GenresStack = ({type}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GenresPage"
        //component={Genres}
        options={{headerShown: false}}>
        {props => <Genres {...props} type={type} />}
      </Stack.Screen>

      <Stack.Screen
        name="GenreDetailPage"
        component={GenreDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PopularMusicDetailPage"
        component={PopularMusicDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlaylistDetailPage"
        component={PlaylistDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ArtistDetailPage" component={ArtistDetail} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#444',
          },
        }}>
        <Tab.Screen
          name="Popular"
          component={PopularStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: () => <Icon name="music" size={30} color={'#fff'} />,
            tabBarLabelStyle: {fontSize: 12},
          }}
        />
        <Tab.Screen
          name="Genres"
          //component={GenresStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: () => (
              <Icon style={{color: 'white'}} name={'music-box'} size={30} />
            ),
            tabBarLabelStyle: {fontSize: 12},
          }}>
          {() => <GenresStack type="genre" />}
        </Tab.Screen>

        <Tab.Screen
          name="SearchTrigger"
          component={EmptyScreen} // ekran göstermeyecek
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <SearchTabButton {...props} />,
          }}
        />

        <Tab.Screen
          name="Radyo"
          //component={Radio}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: () => (
              <Icon style={{color: 'white'}} name={'radio'} size={28} />
            ),
            tabBarLabelStyle: {fontSize: 12},
          }}>
          {() => <GenresStack type="radios" />}
        </Tab.Screen>

        <Tab.Screen
          name="Playlistler"
          //component={Playlists}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: () => (
              <Icon
                style={{color: 'white'}}
                name={'playlist-music'}
                size={30}
              />
            ),
            tabBarLabelStyle: {fontSize: 12},
          }}>
          {() => <GenresStack type="playlists" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
