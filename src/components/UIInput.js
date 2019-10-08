import React from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../constants/colors';

const UIInput = ({value, setValue, color, style, secure}) => {
  return (
    <View
      style={{
        borderWidth: 0.8,
        borderColor: color,
        width: '100%',
        borderRadius: 25,
        ...style,
      }}>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{paddingVertical: 10, paddingHorizontal: 16}}
        fontSize={18}
        secureTextEntry={secure}
        color={colors.onBackground}
      />
    </View>
  );
};

export default UIInput;
