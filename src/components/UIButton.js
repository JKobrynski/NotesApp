import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const UIButton = ({color, style, label, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          fontWeight: '500',
          color: '#fff',
          fontSize: 18,
          paddingVertical: 12,
          textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
          fontFamily: 'Montserrat-medium',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default UIButton;
