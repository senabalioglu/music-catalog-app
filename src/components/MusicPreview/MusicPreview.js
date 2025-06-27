import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Sound.setCategory('Playback');

const MusicPreview = ({previewUrl}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    if (sound) {
      sound.play(() => {
        setIsPlaying(false);
        sound.release();
        setSound(null);
      });
      setIsPlaying(true);
    } else {
      const newSound = new Sound(previewUrl, null, error => {
        if (error) {
          console.log('Hata oluştu: ', error);
          return;
        }
        newSound.play(() => {
          setIsPlaying(false);
          newSound.release();
          setSound(null);
        });
        setIsPlaying(true);
        setSound(newSound);
      });
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
      }}
      onPress={isPlaying ? stopSound : playSound}>
      <Icon name={isPlaying ? 'pause' : 'play'} size={55} color="#a6a6a6" />
    </TouchableOpacity>
  );
};

export default MusicPreview;
