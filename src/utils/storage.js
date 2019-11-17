import SecureStorage from 'react-native-secure-storage';
import {config} from '../screens/LoginScreen';
import {decryptData, encryptData} from './encrypt';

export const readFromStorage = async (key, myKey) => {
  try {
    const data = await SecureStorage.getItem(key, config);
    const decrypted = await decryptData(JSON.parse(data), myKey);

    return decrypted;
  } catch (e) {
    return '';
  }
};

export const saveToStorage = async (key, value, myKey) => {
  try {
    const encrypted = await encryptData(value, myKey);
    await SecureStorage.setItem(key, JSON.stringify(encrypted), config);
  } catch (e) {
    return e;
  }
};

export const resaveNote = async (key, newKey) => {
  try {
    const title = await readFromStorage('@title', key);
    const note = await readFromStorage('@note', key);

    if (title) {
      await saveToStorage('@title', title, newKey);
    }
    if (note) {
      await saveToStorage('@note', note, newKey);
    }
  } catch (e) {
    return e;
  }
};
