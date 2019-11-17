import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../constants/colors';
import {SafeAreaView} from 'react-navigation';
import {vh, vw} from '../constants/sheet';
import UIButton from '../components/UIButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {readFromStorage, saveToStorage} from '../utils/storage';

const NotesList = ({navigation}) => {
  const [title, setTitle] = useState('Moja notatka');
  const [note, setNote] = useState('');
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(true);

  // Refs
  const _titleInput = useRef(null);
  const _noteInput = useRef(null);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  useEffect(() => {
    console.log(navigation.state.params.password);
    // Pobranie tytułu zapisanego w pamięci urządzenia (jeśli istnieje)
    readFromStorage('@title', navigation.state.params.password).then(title => {
      if (title) {
        setTitle(title);
      } else {
        setTitle('');
      }
    });
    // Pobranie treści notatki zapisanek w pamięci urządzenia
    // (jeśli istnieje)
    readFromStorage('@note', navigation.state.params.password).then(note => {
      if (note) {
        setNote(note);
      } else {
        setNote('');
      }
    });
    // Koniec oczekiwania
    setPending(false);
  }, []);

  // Metoda "czyszcząca" aktualnie aktywny input
  const _onClear = () => {
    const {current} = _titleInput;

    if (current.isFocused()) {
      setTitle('');
    } else {
      setNote('');
    }
  };

  // Metoda zapisująca tytuł i treść notatki w pamięci urządzenia
  const _onSave = async () => {
    // Oczekiwanie
    setPending(true);
    try {
      // Szyfrowanie i zapisanie notatki i tytułu
      await saveToStorage('@title', title, navigation.state.params.password);
      await saveToStorage('@note', note, navigation.state.params.password);

      // Koniec oczekiwania
      setPending(false);
      setVisible(false);
    } catch (err) {
      console.log(err);

      // Koniec oczekiwania
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
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="ios-settings" size={6 * vh} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        {pending ? (
          <ActivityIndicator size="large" color={colors.primaryVariant} />
        ) : (
          <View style={styles.noteContainer}>
            <TextInput
              ref={_titleInput}
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              fontSize={5 * vh}
              onFocus={() => setVisible(true)}
              onBlur={() => setVisible(false)}
              placeholder="Tytuł"
            />
            <TextInput
              ref={_noteInput}
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              fontSize={3 * vh}
              multiline
              onFocus={() => setVisible(true)}
              onBlur={() => setVisible(false)}
              placeholder="Wprowadź notatkę..."
              placeholderTextColor="#bbb"
            />
            {visible ? (
              <View style={styles.buttonsContainer}>
                <UIButton
                  color={colors.error}
                  label="Wyczyść"
                  onPress={_onClear}
                  style={styles.leftButton}
                />
                <UIButton
                  color={colors.primaryVariant}
                  label="Zapisz"
                  onPress={_onSave}
                  style={styles.rightButton}
                />
              </View>
            ) : null}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 2 * vh,
    paddingHorizontal: 3 * vw,
  },
  noteContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 1 * vh,
    paddingHorizontal: 5 * vw,
  },
  titleInput: {
    width: '100%',
    textAlign: 'center',
  },
  noteInput: {
    width: '100%',
    flex: 1,
    color: '#fff',
    marginTop: 4 * vh,
    marginBottom: 2 * vh,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 8 * vh,
    borderWidth: 1,
    borderColor: 1,
  },
  leftButton: {
    marginRight: 2 * vw,
  },
  rightButton: {
    marginLeft: 2 * vw,
  },
});

export default NotesList;
