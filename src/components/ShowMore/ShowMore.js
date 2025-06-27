import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

const ShowMore = ({show, setShow}) => {
  return (
    <TouchableOpacity
      onPress={() => setShow(prev => !prev)}
      style={{alignSelf: 'center', marginTop: 10}}>
      <Text style={{color: '#888'}}>
        {show ? 'Daha azını göster' : 'Daha fazlasını gör'}
      </Text>
    </TouchableOpacity>
  );
};

export default ShowMore;
