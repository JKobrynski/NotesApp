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
import UIInput from '../components/UIInput';
import UIButton from '../components/UIButton';
import {vh} from '../constants/sheet';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';
import SecureStorage, {
  ACCESSIBLE,
  ACCESS_CONTROL,
  AUTHENTICATION_TYPE,
} from 'react-native-secure-storage';
import {genRandomKey} from '../utils/encrypt';

export const config = {
  // accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  accessible: ACCESSIBLE.WHEN_UNLOCKED,
  // accessControl: ACCESS_CONTROL.APPLICATION_PASSWORD,
  // authenticationPrompt: 'auth with yourself',
  // service: 'example',
  // authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
};

bcrypt.setRandomFallback(len => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

const LoginScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  // Sprawdzenie czy uzytkownik juz ustawił hasło
  useEffect(() => {
    SecureStorage.getItem('@password', config).then(password => {
      if (password) {
        setRegistered(true);
      }
    });
    SecureStorage.getItem('@encryptionKey', config).then(key => {
      if (!key) {
        genRandomKey().then(key => {
          SecureStorage.setItem('@encryptionKey', key, config);
        });
      }
    });
    setChecking(false);
  }, []);

  // Wyczyszczenie błędu po rozpoczęciu wpisywania
  useEffect(() => {
    if (error && password.length > 0) {
      setError('');
    }
  }, [password]);

  // Metoda zapisująca hasło
  const _setPassword = () => {
    // Hashowanie hasła
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        setError(err);
      }
      try {
        // Zapisanie hasha
        await SecureStorage.setItem('@password', hash, config);
        navigation.navigate('List');
      } catch (e) {
        setError(e);
      }
    });
  };

  // Metoda sprawdzająca czy podane hasło jest prawidłowe
  const _compare = async () => {
    setChecking(true);
    try {
      // Pobranie hasha
      const hash = await SecureStorage.getItem('@password', config);

      // Porównanie haseł
      bcrypt.compare(password, hash, (err, matched) => {
        if (err) {
          setError(err);
        }
        if (matched) {
          // Przekierowanie gdy hasło prawidłowe
          navigation.navigate('List');
        } else {
          setError('Hasło nieprawidłowe');
          setPassword('');
        }
      });
      setChecking(false);
    } catch (e) {
      setError(e);
      setChecking(false);
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
                {checking ? (
                  <ActivityIndicator
                    size="large"
                    color={colors.primaryVariant}
                  />
                ) : (
                  <>
                    <UIInput
                      color={error ? colors.error : colors.primaryVariant}
                      value={password}
                      setValue={setPassword}
                      secure
                      autoFocus
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                  </>
                )}
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
