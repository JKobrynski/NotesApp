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
import SecureStorage, {
  ACCESSIBLE,
  ACCESS_CONTROL,
  AUTHENTICATION_TYPE,
} from 'react-native-secure-storage';

// Konfiguracja keychaina
export const config = {
  accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  authenticationType: AUTHENTICATION_TYPE.BIOMETRICS,
  authenticationPrompt: 'Czy to Ty?',
  service: 'NotesApp',
};

const LoginScreen = ({navigation}) => {
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  // Sprawdzenie czy uzytkownik juz ustawił hasło
  useEffect(() => {
    async function checkNote() {
      try {
        setChecking(true);
        const note = await SecureStorage.getItem('@note', config);

        navigation.navigate('List');
      } catch (e) {
        setError('Wystąpił błąd przy odczytywaniu notatki');
      } finally {
        setChecking(false);
      }
    }

    checkNote();
  }, []);

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
                <ActivityIndicator size="large" color={colors.primaryVariant} />
              ) : (
                <Text style={styles.textSmall}>
                  Przejdź dalej aby zapisać notatkę
                </Text>
              )}
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            <View style={styles.lowerWrapper}>
              <View style={styles.buttonContainer}>
                <UIButton
                  color={colors.primaryVariant}
                  label="Dalej"
                  onPress={() => console.log('Dalej')}
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
    height: 7 * vh,
  },
});

export default LoginScreen;
