import {NativeModules, Platform} from 'react-native';
const Aes = NativeModules.Aes;
import SecureStorage from 'react-native-secure-storage';
import {config} from '../screens/LoginScreen';

export const genRandomKey = () => Aes.randomKey(32);

export const generateKey = (password, salt, cost, length) =>
  Aes.pbkdf2(password, salt, cost, length);

export const encrypt = (text, key) => {
  return Aes.randomKey(32).then(iv => {
    return Aes.encrypt(text, key, iv).then(cipher => ({
      cipher,
      iv,
    }));
  });
};

export const decrypt = (encryptedData, key) =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);

export const encryptData = async text => {
  try {
    const secret = await SecureStorage.getItem('@encryptionKey', config);
    const key = await generateKey(secret, 'salt', 5000, 512);
    const {cipher, iv} = await encrypt(text, key);

    return {cipher, iv};
  } catch (e) {
    return;
  }
};

export const decryptData = async (cipher, iv) => {
  try {
    const secret = await SecureStorage.getItem('@encryptionKey', config);
    const key = await generateKey(secret, 'salt', 5000, 512);
    const text = await decrypt({cipher, iv}, key);

    return text;
  } catch (e) {
    return e;
  }
};
