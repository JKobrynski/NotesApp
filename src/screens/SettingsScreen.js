import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {colors} from '../constants/colors';
import {vh, vw} from '../constants/sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import UIInput from '../components/UIInput';
import {TextInput} from 'react-native-gesture-handler';
import UIButton from '../components/UIButton';
import AsyncStorage from '@react-native-community/async-storage';

const SettingsScreen = ({navigation}) => {
  const [previous, setPrevious] = useState('');
  const [correct, setCorrect] = useState(false);
  const [updated, setUpdated] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(true);

  const _saved = useRef(null);
  const _updated = useRef(null);

  useEffect(() => {
    if (error && previous.length > 0) {
      setError('');
    }
  }, [previous]);
  useEffect(() => {
    if (success) {
      const {current} = _updated;
      if (current) {
        current.blur();
      }
      setUpdated('');
      setVisible(false);
    }
  }, [success]);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const _checkPassword = async () => {
    try {
      const savedPassword = await AsyncStorage.getItem('@password');
      if (savedPassword === previous) {
        setCorrect(true);
      } else {
        setError('Hasło nieprawidłowe');
        setPrevious('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _updatePassword = async () => {
    try {
      AsyncStorage.setItem('@password', updated).then(() => {
        setSuccess(true);
      });
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
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 4 * vh,
          }}>
          <View style={{width: '100%'}}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 4 * vw,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('List')}>
                <Icon name="ios-arrow-back" color="#fff" size={5 * vh} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
                fontSize: 4 * vh,
                textAlign: 'center',
              }}>
              Zmień hasło
            </Text>
            {success ? (
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 2 * vh,
                  color: colors.secondary,
                  textAlign: 'center',
                  marginTop: 1 * vh,
                }}>
                Hasło zostało zaktualizowane
              </Text>
            ) : null}
          </View>
          {success ? (
            <Icon
              name="ios-checkmark"
              size={12 * vh}
              color={colors.secondary}
            />
          ) : (
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.onBackground,
                  fontSize: 3 * vh,
                  marginBottom: 3 * vh,
                }}>
                {correct ? 'Podaj nowe hasło' : 'Podaj obecne hasło'}
              </Text>
              {correct ? (
                <TextInput
                  ref={_updated}
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: success
                      ? colors.secondary
                      : colors.primaryVariant,
                    textAlign: 'center',
                  }}
                  value={updated}
                  onChangeText={setUpdated}
                  secureTextEntry
                  fontSize={3 * vh}
                  color="#fff"
                />
              ) : (
                <TextInput
                  ref={_saved}
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: error
                      ? colors.error
                      : colors.primaryVariant,
                    textAlign: 'center',
                  }}
                  value={previous}
                  onChangeText={setPrevious}
                  secureTextEntry
                  fontSize={3 * vh}
                  color="#fff"
                  autoFocus
                />
              )}
              {error ? (
                <Text
                  style={{
                    color: colors.error,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 3 * vh,
                    marginTop: 1 * vh,
                    textAlign: 'center',
                  }}>
                  {error}
                </Text>
              ) : null}
            </View>
          )}
          <View
            style={{
              width: '80%',
              height: 8 * vh,
            }}>
            {visible ? (
              <UIButton
                color={colors.primaryVariant}
                label={correct ? 'Zapisz' : 'Dalej'}
                onPress={correct ? _updatePassword : _checkPassword}
              />
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
