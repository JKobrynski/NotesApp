import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
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

  // Sprawdzenie czy uzytkownik juz ustawił hasło
  useEffect(() => {
    AsyncStorage.getItem('@password').then(password => {
      if (password) {
        setRegistered(true);
      }
    });
  }, []);

  // Wyczyszczenie błędu po rozpoczęciu wpisywania
  useEffect(() => {
    if (error && password.length > 0) {
      setError('');
    }
  }, [password]);

  // Metoda zapisująca hasło
  const _setPassword = async () => {
    try {
      // Zapisanie hasła w pamięci urządzenia pod nazwą @password
      await AsyncStorage.setItem('@password', password);

      // Przeniesienie na ekran notatek jeśli hasło zostanie zapisane
      navigation.navigate('List');
    } catch (err) {
      // Ustawienie błędu
      setError(err);
    }
  };

  // Metoda sprawdzająca czy podane hasło jest prawidłowe
  const _compare = async () => {
    try {
      // Pobranie hasła zapisanego w pamięci urządzenia
      const savedPassword = await AsyncStorage.getItem('@password');

      // Porównanie
      if (savedPassword === password) {
        // Przeniesienie na ekran notatek jeśli hasło
        // jest prawidłowe
        navigation.navigate('List');
      } else {
        // Ustawienie błędu jeśli podane i zapisane
        // hasło się róznią
        setError('Hasło nieprawidłowe');

        // Wyczyszczenie wpisanego hasła w inpucie
        setPassword('');
      }
    } catch (err) {
      // Ustawienie błędu
      setError(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.upperContainer}>
              <Text style={styles.text}>
                {registered ? 'Wprowadź hasło' : 'Ustaw hasło do notatnika'}
              </Text>
              <View style={styles.inputContainer}>
                <UIInput
                  color={error ? colors.error : colors.primaryVariant}
                  value={password}
                  setValue={setPassword}
                  secure
                  autoFocus
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
              </View>
            </View>
            <View style={styles.lowerWrapper}>
              <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: colors.background,
  },
  contentWrapper: {
    width: '80%',
    height: '70%',
    alignItems: 'center',
  },
  upperContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.onBackground,
    fontFamily: 'Montserrat-Bold',
  },
  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
  error: {
    color: colors.error,
    fontFamily: 'Montserrat-Regular',
    fontSize: 3 * vh,
    marginTop: 1 * vh,
    textAlign: 'center',
  },
  lowerWrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 7 * vh,
  },
});

export default LoginScreen;
