import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {colors} from '../constants/colors';
import {SafeAreaView} from 'react-navigation';
import {vh, vw} from '../constants/sheet';
import UIButton from '../components/UIButton';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const NotesList = ({navigation}) => {
  const [title, setTitle] = useState('Moja notatka');
  const [note, setNote] = useState('');
  const [visible, setVisible] = useState(false);

  const _titleInput = useRef(null);
  const _noteInput = useRef(null);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  useEffect(() => {
    AsyncStorage.getItem('@title').then(savedTitle => {
      if (savedTitle) {
        setTitle(savedTitle);
      }
    });
    AsyncStorage.getItem('@note').then(savedNote => {
      if (savedNote) {
        setNote(savedNote);
      }
    });
  }, []);

  const _onClear = () => {
    const {current} = _titleInput;

    if (current.isFocused()) {
      setTitle('');
    } else {
      setNote('');
    }
  };

  const _onSave = async () => {
    try {
      await AsyncStorage.setItem('@title', title);
      await AsyncStorage.setItem('@note', note);

      if (_titleInput.current.isFocused()) {
        _titleInput.current.blur();
      } else if (_noteInput.current.isFocused()) {
        _noteInput.current.blur();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingTop: 2 * vh,
            paddingHorizontal: 3 * vw,
          }}>
          <Icon name="ios-settings" size={6 * vh} color={colors.secondary} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 1 * vh,
            paddingHorizontal: 5 * vw,
          }}>
          <TextInput
            ref={_titleInput}
            style={{
              width: '100%',
              textAlign: 'center',
            }}
            value={title}
            onChangeText={setTitle}
            fontSize={5 * vh}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
          />
          <TextInput
            ref={_noteInput}
            style={{
              width: '100%',
              flex: 1,
              color: '#fff',
              marginTop: 4 * vh,
              marginBottom: 2 * vh,
            }}
            value={note}
            onChangeText={setNote}
            fontSize={3 * vh}
            multiline
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
          />
          {visible ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 8 * vh,
                borderWidth: 1,
                borderColor: 1,
              }}>
              <UIButton
                color={colors.error}
                label="Wyczyść"
                onPress={_onClear}
                style={{marginRight: 2 * vw}}
              />
              <UIButton
                color={colors.primaryVariant}
                label="Zapisz"
                onPress={_onSave}
                style={{marginLeft: 2 * vw}}
              />
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NotesList;
