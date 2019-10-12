import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {colors} from '../constants/colors';
import {SafeAreaView} from 'react-navigation';
import UIInput from '../components/UIInput';
import UIButton from '../components/UIButton';
import {vh} from '../constants/sheet';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  useEffect(() => {
    AsyncStorage.getItem('$password').then(password => {
      if (password) {
        setRegistered(true);
      }
    });
  }, []);
  useEffect(() => {
    if (error && password.length > 0) {
      setError('');
    }
  }, [password]);

  const _setPassword = async () => {
    try {
      await AsyncStorage.setItem('$password', password);
      navigation.navigate('List');
    } catch (err) {
      console.log(err);
    }
  };

  const _compare = async () => {
    try {
      const savedPassword = await AsyncStorage.getItem('$password');

      if (savedPassword === password) {
        navigation.navigate('List');
      } else {
        setError('Hasło nieprawidłowe');
        setPassword('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 1,
            backgroundColor: colors.background,
          }}>
          <View
            style={{
              width: '80%',
              height: '70%',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  color: colors.onBackground,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {registered ? 'Wprowadź hasło' : 'Ustaw hasło do notatnika'}
              </Text>
              <View style={{width: '100%', marginTop: 30}}>
                <UIInput
                  color={error ? colors.error : colors.primaryVariant}
                  value={password}
                  setValue={setPassword}
                  secure
                  autoFocus
                />
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
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 7 * vh,
                }}>
                <UIButton
                  color={colors.primaryVariant}
                  label="Dalej"
                  onPress={registered ? _compare : _setPassword}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
