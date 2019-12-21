import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {colors} from '../constants/colors';
import {SafeAreaView} from 'react-navigation';
import UIButton from '../components/UIButton';
import {vh, vw} from '../constants/sheet';
import SecureStorage, {
  ACCESSIBLE,
  ACCESS_CONTROL,
  AUTHENTICATION_TYPE,
} from 'react-native-secure-storage';
import UIInput from '../components/UIInput';

// Konfiguracja keychaina
export const config = {
  accessControl: ACCESS_CONTROL.BIOMETRY_ANY,
  accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  authenticationType: AUTHENTICATION_TYPE.BIOMETRICS,
  authenticationPrompt: 'Czy to Ty?',
  service: 'NotesApp',
};

const LoginScreen = ({navigation}) => {
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [passwordVariant, setPasswordVariant] = useState(false);
  const [password, setPassword] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const _checkNote = async () => {
    try {
      setChecking(true);
      const note = await SecureStorage.getItem('@note', config);

      if (note) {
        navigation.navigate('List', {note});
      } else {
        navigation.navigate('List');
      }
    } catch (e) {
      setError('Wystąpił błąd przy autoryzacji');
    }
  };

  const _onPasswordVariant = () => {
    setPasswordVariant(true);
  };

  const _checkPassword = () => {
    console.log('Password');
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
              <Text style={styles.text}>Witaj!</Text>
              {checking ? (
                <ActivityIndicator
                  style={{marginTop: 2 * vh}}
                  size="large"
                  color={colors.primaryVariant}
                />
              ) : passwordVariant ? (
                <>
                  <UIInput
                    color={error ? colors.error : colors.primaryVariant}
                    value={password}
                    setValue={setPassword}
                    secure
                    autoFocus
                    style={{marginTop: 6 * vw}}
                  />
                  {error ? <Text style={styles.error}>{error}</Text> : null}
                </>
              ) : (
                <Text style={styles.textSmall}>
                  Przejdź dalej aby edytować notatkę
                </Text>
              )}
            </View>
            <View style={styles.lowerWrapper}>
              <View style={{...styles.buttonContainer, marginBottom: 6 * vw}}>
                <UIButton
                  color={colors.secondary}
                  label={passwordVariant ? 'Dalej' : 'Hasło'}
                  onPress={
                    passwordVariant ? _checkPassword : _onPasswordVariant
                  }
                  icon={passwordVariant ? undefined : 'lock'}
                />
              </View>
              <View style={styles.buttonContainer}>
                <UIButton
                  color={colors.primaryVariant}
                  label="Odcisk palca"
                  onPress={_checkNote}
                  icon="finger-print"
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
    fontSize: 28,
    fontWeight: '600',
    color: colors.onBackground,
    fontFamily: 'Montserrat-Bold',
  },
  textSmall: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.onBackground,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
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
    height: 8 * vh,
  },
});

export default LoginScreen;
