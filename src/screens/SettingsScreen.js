import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {colors} from '../constants/colors';
import {vh, vw} from '../constants/sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import UIButton from '../components/UIButton';
import {passwordConfig} from './LoginScreen';
import SecureStorage from 'react-native-secure-storage';

const SettingsScreen = ({navigation}) => {
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const _changePassword = async () => {
    try {
      setPending(true);

      const note = await SecureStorage.getItem('@note2', passwordConfig);

      if (note) {
        await SecureStorage.removeItem('@note2', passwordConfig);
        await SecureStorage.setItem('@note2', note, passwordConfig);
        setSuccess(true);
      } else {
        setError('Nie posiadasz jeszcze hasła');
      }
    } catch (err) {
      setError('Wystąpił błąd przy próbie zmiany hasła');
    } finally {
      setPending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Login')}>
            <Icon name="ios-arrow-back" color="#fff" size={5 * vh} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.midWrapper}>
            <View style={styles.upperWrapper}>
              {pending ? (
                <ActivityIndicator color={colors.primaryVariant} size="large" />
              ) : (
                <Text style={styles.bigText}>Zmień hasło</Text>
              )}
            </View>
            {success ? (
              <Text style={styles.successMessage}>Hasło zostało zmienione</Text>
            ) : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.buttonContainer}>
              <UIButton
                color={colors.primaryVariant}
                label={'Dalej'}
                onPress={_changePassword}
              />
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
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingTop: 4 * vh,
  },
  upperWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 4 * vw,
    marginTop: 6 * vw,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingRight: 5 * vw,
  },
  bigText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 4 * vh,
    textAlign: 'center',
  },
  midWrapper: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  successMessage: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 5 * vw,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 1 * vh,
  },
  error: {
    color: colors.error,
    fontFamily: 'Montserrat-Regular',
    fontSize: 3 * vh,
    marginTop: 1 * vh,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    height: 8 * vh,
  },
});

export default SettingsScreen;
