import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const ArtistAvatar = ({avatar, navi}) => {

  const navigateToDetail = id => {
    navi.push('ArtistDetailPage', {id: avatar.id});
  };

  return (
    <TouchableOpacity onPress={() => navigateToDetail(avatar.id)} style={{alignItems: 'center'}}>
      <View style={{flexDirection: 'row',}}>
        <View
          style={{flexDirection: 'column', alignItems: 'center', margin: 10}}>
          <View>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={{uri: avatar.picture_medium}}
            />
          </View>
          <View style={{ width: 90, alignItems: 'center' }} >
          <Text
            numberOfLines={2}
            style={{fontFamily: 'Poppins-Bold', fontSize: 15, textAlign: 'center'}}>
            {avatar.name}
          </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistAvatar;