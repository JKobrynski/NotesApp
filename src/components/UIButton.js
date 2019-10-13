import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flex: 1,
  },
  label: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 12,
    textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    fontFamily: 'Montserrat-medium',
  },
});

// Uniwersalny komponent przycisku
const UIButton = ({color, style, label, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: color,
        ...style,
      }}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default UIButton;
