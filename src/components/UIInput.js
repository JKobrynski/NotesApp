import React from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import {vh} from '../constants/sheet';

const UIInput = ({value, setValue, color, style, secure, autoFocus}) => {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      style={{
        borderBottomWidth: 2,
        borderBottomColor: color,
        width: '100%',
        ...style,
        textAlign: 'center',
      }}
      fontSize={3 * vh}
      secureTextEntry={secure}
      color={colors.onBackground}
      autoFocus={autoFocus}
    />
  );
};

export default UIInput;
