import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {colors} from '../constants/colors';
import {vh, vw} from '../constants/sheet';
import Icon from 'react-native-vector-icons/Ionicons';
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

  // Usuwanie błędu jeśli hasło jest ponownie wprowadzane
  useEffect(() => {
    if (error && previous.length > 0) {
      setError('');
    }
  }, [previous]);

  // Działanie po udanej zmianie hasła
  useEffect(() => {
    if (success) {
      const {current} = _updated;

      // Zamknięcie aktywnego inputu (unfocus)
      if (current) {
        current.blur();
      }

      // Wyczyszczenie inputu
      setUpdated('');

      // Schowanie przycisku
      setVisible(false);
    }
  }, [success]);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  // Metoda porównująca wpisane hasło z zapisanym
  const _checkPassword = async () => {
    try {
      // Pobranie hasła z pamięci urządzenia
      const savedPassword = await AsyncStorage.getItem('@password');

      // Porównanie haseł
      if (savedPassword === previous) {
        // Sukces
        setCorrect(true);
      } else {
        // Ustawienie błędu jeśli hasła róznią się
        setError('Hasło nieprawidłowe');
        setPrevious('');
      }
    } catch (err) {
      setError(err);
    }
  };

  // Metoda zapisująca nowe hasło w pamięci urządzenia
  const _updatePassword = async () => {
    try {
      AsyncStorage.setItem('@password', updated).then(() => {
        // Sukces
        setSuccess(true);
      });
    } catch (err) {
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
          <View style={styles.upperWrapper}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('List')}>
                <Icon name="ios-arrow-back" color="#fff" size={5 * vh} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bigText}>Zmień hasło</Text>
            {success ? (
              <Text style={styles.successMessage}>
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
              <Text style={styles.smallText}>
                {correct ? 'Podaj nowe hasło' : 'Podaj obecne hasło'}
              </Text>
              {correct ? (
                <TextInput
                  ref={_updated}
                  style={{
                    borderBottomColor: success
                      ? colors.secondary
                      : colors.primaryVariant,
                    ...styles.input,
                  }}
                  value={updated}
                  onChangeText={setUpdated}
                  secureTextEntry
                  fontSize={3 * vh}
                  color="#fff"
                  returnKeyType="next"
                  onSubmitEditing={_updatePassword}
                />
              ) : (
                <TextInput
                  ref={_saved}
                  style={{
                    borderBottomColor: error
                      ? colors.error
                      : colors.primaryVariant,
                    ...styles.input,
                  }}
                  value={previous}
                  onChangeText={setPrevious}
                  secureTextEntry
                  fontSize={3 * vh}
                  color="#fff"
                  autoFocus
                  returnKeyType="next"
                  onSubmitEditing={_checkPassword}
                  blurOnSubmit={false}
                />
              )}
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
          )}
          <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4 * vh,
  },
  upperWrapper: {
    width: '100%',
  },
  header: {
    paddingHorizontal: 4 * vw,
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
  successMessage: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 2 * vh,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 1 * vh,
  },
  smallText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.onBackground,
    fontSize: 3 * vh,
    marginBottom: 3 * vh,
  },
  input: {
    borderBottomWidth: 2,
    textAlign: 'center',
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
