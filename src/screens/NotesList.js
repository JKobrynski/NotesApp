import React from 'react';
import {View, Text} from 'react-native';

const NotesList = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: 'red',
          fontWeight: '500',
        }}>
        Notes List
      </Text>
    </View>
  );
};

export default NotesList;
